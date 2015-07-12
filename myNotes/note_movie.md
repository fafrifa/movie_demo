### Movie _ node 
1. body-parser urlencoded  extended : true , 很重要 ， 否则有可能解析不了 req.body中的东西
2. 使用Middleware时一定要注意有next（）
3. 在post 时要在name中传入 name = “user[name]” 然后用bodyParser解析
4. 把所有页面都要处理的事情放在app.use()中， 注意中间件中的每一种可能最终都要**return next()**
5. app.locals.user = _user   , _xxx 是内部的，没有暴露出去的变量

6. API 返回的是JSON ,res.json()  ,而template （jade）是直接render ，最好还是api ， 弱耦合
7. 闭包的应用是JS的核心！通过闭包实现内部的资源绑定，向上传递数据，通过callback的args来暴露内部的返回结果
~~~
xxx.xxx.comparePassword = function(password,callback){
     bcrypt.compare(password,this.password,function(err,isMatch){
          if(err){
               return callback(err);     
          } 
          callback(null,isMatch);

     });
}
~~~