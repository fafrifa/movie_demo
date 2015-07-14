### Note1 
* body-parser urlencoded  extended : true , 很重要 ， 否则有可能解析不了 req.body中的东西
* 使用Middleware时一定要注意有next（）
* 在post 时要在name中传入 name = “user[name]” 然后用bodyParser解析
* 把所有页面都要处理的事情放在app.use()中， 注意中间件中的每一种可能最终都要**return next()**
* app.locals.user = _user   , _xxx 是内部的，没有暴露出去的变量

* API 返回的是JSON ,res.json()  ,而template （jade）是直接render ，最好还是api ， 弱耦合
* **闭包**的应用是JS的核心！通过闭包实现内部的资源绑定，向上传递数据，通过callback的args来暴露内部的返回结果

```
app.post('/user/signin',function(req,res){
  var _user = req.body.user;
  var name = _user.name;
  var password = _user.password;

  User.findOne({name:name},function(err,user){
    if(err){
      console.log(err);
    }
    if(!user){
      return res.redirect('/');
    } 
    user.comparePassword(password,function(err,isMatch){
      if(err){
        console.log(err);
      }
      if(isMatch){
        console.log('Right Password!');
        return res.redirect('/');
      } else{
        console.log('Wrong Password!');
      }


    });
  });

});
UserSchema.methods.comparePassword = function(_password,cb){
  bcrypt.compare(_password,this.password,function(err,isMatch){
    if(err){
      return cb(err);
    }
    cb(null,isMatch);

  });

}
```
### Note2
* `app.use(express.session(){sceret:’’,store:new mongoStore})`
要用到npm cookieparser，connect-mongo ，express-session
cookieparser 要放在 session 前面 sid

* 把routes 单独提出并且module.exports = function(app){...};
> *一定注意*： 先app.set ,app.use 然后再传入Route(app)

### Dev 配置
```
if('development'===app.get('env')){
	app.set('showStackError',true);
	app.locals.pretty = true;
	mongoose.set('debug',true);
}
```
### User 权限控制
* 用户的权限控制可以用number来做
	* 0 normal | 1 verified | 2 senior | >10 admin | >50 super root
* 如果没有登录，if(!user){return res.redirect('/signin')} , 还需要判断权限
* 不要把用户权限的管理混在具体页面的功能实现上，用express的中间件去做。校验和判断
> app.get('/xxx',Middleware1 , Middleware2 , pageFunction)
* 中间件是写在Controller中的

### MongoDB
* show dbs | show tables | use movie
* db.collectionName.update({找},{改|$set:{新值}})
* db.CN.findOne({"key":"value"})
* Mongoose的 **populate** 实现不同Schema的引用 ，因为没有joint
> populate : path select match model options
> 引用类型 objectId Number String Buffer 
* ObjectId = Schema.Types.ObjectId
* **populate** 它的作用是在from 中动态的注入关联模型的name 字段
> Comment
      .find({movie: id})
      .populate('from', 'name')
      .populate('reply.from reply.to', 'name')

### Bootstrap
* .panel.panel-default | .panel-heading > .panel-title | .panel-body

* Media list
With a bit of extra markup, you can use media inside list (useful for comment threads or articles lists).

```
<ul class="media-list">
  <li class="media">
    <div class="media-left">
      <a href="#">
        <img class="media-object" src="..." alt="...">
      </a>
    </div>
    <div class="media-body">
      <h4 class="media-heading">Media heading</h4>
      ...
    </div>
  </li>
</ul>
```
### POST Tech
* `input(type="hidden", name="comment[movie]", value="#{movie._id}")` 隐藏域实际上是为了用value给name中的comment对象.xx赋值， 当然也可以在赋值前在jade中做if else






