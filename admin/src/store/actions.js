//封装的请求request
import request from '@/utils/request'
// actions里面的方法和mutations里面的方法主要区别在于，actions里面可以写一部代码，而mutations里面只能写同步代码，所以通常情况下我们会把业务代码放在actions里面
const actions = {
  async saveArticle({commit,state},{id,title,tags,content,isPublished}){
    request({
      method:'post',
      url:`/articles/update/${id}`,
      data:{
        title,
        tags,
        content,
        isPublished
      }
    }).then(res=>{
      console.log(res);
      
    }).catch(err=>{
      console.log(err);
      
    })
  commit('SET_CURRENT_ARTICLE',{id,title,tags,content,isPublished})
  }
}

export default actions
// const actions = {
//   //登录方法
//   //登录方法传递两个参数username,password
//   //commit只是为了触发mutations方法
//   LOGIN({commit},username,password){
//     //这里面写登录的方法

//   }
//   //这里写登出

// }

