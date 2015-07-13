var User = require('../models/user');
	// --- signup
exports.signup = function(req,res){
		var _user = req.body.user;
		

		// see if user exist
		User.findOne({name:_user.name},function(err,user){
			if(err){
				console.log(err);
			}
			if(user){
				return res.redirect('/signin');
			} else{
				var newUser = new User(_user);
				newUser.save(function(err,user){
					if(err){
						console.log(err);
					}
					// console.log(user);
					res.redirect('/');
				});
			}
		});


	};
	//--- signin  /user/signin
exports.signin = function(req,res){
		var _user = req.body.user;
		var name = _user.name;
		var password = _user.password;

		User.findOne({name:name})
			.select('name password')
			.exec(function(err,user){
			if(err){
				console.log(err);
				console.log('001');
			}
			if(!user){
				return res.redirect('/signup');
			} 
			user.comparePassword(password,function(err,isMatch){
				if(err){
					console.log(err);
					console.log('002');
				}
				if(isMatch){
					req.session.user = user;
					return res.redirect('/');
				} else{
					res.redirect('/signin');
					console.log('Wrong Password!');
				}


			});
			// console.log(user);
		 //    var isVaild = user.comparePassword(password);
	  //   	if(isVaild){
	  //   		console.log('Right Password!');
	  //   		return res.redirect('/');
	  //   	} else{
	  //   		console.log('Wrong Password!');
	  //   	}
		});

	};
	//-- User List 
exports.userList = function(req,res){
		User.fetch(function(err,users){
			if(err){
				console.log(err);
			}
			res.render('userList',{
				title:'User 列表',
				users:users
			})


		});
	};
	// -- logout /logout
exports.logout = function(req,res){

		delete req.session.user;
		// delete app.locals.user;
		res.redirect('/');

	};
exports.showSignin = function(req,res){
	res.render('signin',{
		title:'登录页面'
	});
 }

exports.showSignup = function(req,res){
	res.render('signup',{
		title:'注册页面'
	});

}









