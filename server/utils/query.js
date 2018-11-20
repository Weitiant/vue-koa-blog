// 首先连接mysql数据库

//封装一个query方法，方便我们进行sql语句的执行
import mysql from 'mysql';
import { db, dbName } from '../config'
import fs from 'fs'
import path from 'path'
let pool
//需要创建一个数据库，并且能够将sql文件夹下的sql文件执行
const sqlContent = fs.readFileSync(path.resolve(__dirname, '..', './sql/w_blog.sql'), 'utf-8')
//第一次连接数据库的时候，没有指定数据库名称，这次连接的目的是为了能够创建一个w_blog数据库，并且将数据库文件执行，执行完毕之后w_blog数据库就有对应的数据和表了
const init = mysql.createConnection(db);
init.connect();
// 判断如果数据库存在了，则不需要再执行下面的代码 
  init.query('CREATE DATABASE w_blog',err=>{
      Object.assign(db,dbName)
      pool = mysql.createPool(db)
      if(err){
          console.log("数据库已存在")
      }else{
          query(sqlContent).then(res=>{
              console.log('数据库创建成功')
          }).catch(err=>{
              console.log(err)
          })
      }
  })
  init.end()
  
  
  //   // 存在的情况下
  //   Object.assign(db, dbName)
  //   //第二次连接数据库，这时候，数据库w_blog已经创建成功了，这个时候，直接连接w_blog数据库，然后执行sql文件夹下的w_blog文件，对应的表和测试数据就已经存在数据库里面了
  //   pool = mysql.createPool(db)

// init.end()


export default function query(sql, values) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err);
      } else {
        connection.query(sql, values, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
          connection.release();
        })
      }
    })
  })
}
