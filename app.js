// basic setup
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var Config = require('./config.js');
var mongoose = require('mongoose');
var morgan = require('morgan');
var _=require('underscore');
// movie
var Movie = require('./app/models/movie');
var User = require('./app/models/user');


// var Movie = mongoose.model('Movie');
// mongo connection
console.log(Config.dataBase);
mongoose.connect(Config.dataBase);

// use body-parser to grab infor from POST
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// app.locals - global
app.locals.moment = require('moment');

// template engine
app.set('view engine','jade');
// set views -> views/pages
app.set('views','./views/pages'); 


// app use : static for project 
app.use(express.static(__dirname+'/public'));
// may write as this way too.
// app.use(express.static(path.join(__dirname,'public')));
// morgan logger for dev
app.use(morgan('dev'));


// listen to port 
app.listen(Config.port);

console.log('server is running on: '+Config.port);
//#######
// routes 
//#######
//-- index
app.get('/',function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		res.render('index',{
			title:'Movie Index',
			movies: movies
		});
	});

});
//-- List 
app.get('/list',function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		res.render('list',{
			title:'Movie 列表',
			movies:movies
		})


	});

});
// admin list 
app.get('/admin/list',function(req,res){
	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		res.render('list',{
			title:'Movie 列表',
			movies:movies
		})


	});

});

//-- admin
app.get('/admin/movie',function(req,res){
	

	res.render('admin',{
		title:'movies 后台录入',
		movie:{
		// 	// director:'hihi',
		// 	// title:'hoho',
		// 	// language:'EN',
		// 	// country:'CN',
		// 	// summary:'catcat',
		// 	// flash:'http://player.youku.com/player.php/sid/XMTI2NjA4MzU1Ng==/v.swf',
		// 	// poster:'http://img4.duitang.com/uploads/item/201207/08/20120708234648_dwQuG.thumb.600_0.jpeg',
		// 	// year:2010
			
		}
	});

});

// -- admin list
app.get('/admin/update/:id',function(req,res){
	var id = req.params.id;
	console.log(id);
	if(id){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err);
			}
			res.render('admin',{
				title:'Moive 后台',
				movie:movie
			});
		});
	}

});
//-- admin post
app.post('/admin/movie/new',function(req,res){
	//console.log(req.body.movie);
	//bodyParser extended = true  -> is the key !!!
	var id = req.body.movie._id;
	var movieObj = req.body.movie;
	
	var _movie;
	if(id){
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err);
			}
			_movie = _.extend(movie,movieObj);
			_movie.save(function(err,movie){
				if(err){
					console.log(err);
				}
				res.redirect('/movie/'+movie._id);
			});
		});

	} else {
		_movie = new Movie({
			director:movieObj.director,
			title:movieObj.title,
			language:movieObj.language,
			country:movieObj.country,
			summary:movieObj.summary,
			flash:movieObj.flash,
			poster:movieObj.poster,
			year:movieObj.year
			

		});
		_movie.save(function(err,movie){
			if(err){
				console.log(err);
			}
			res.redirect('/movie/'+movie._id);
		});


	}

})

//-- detail
app.get('/movie/:id',function(req,res){
	var id = req.params.id;
	Movie.findById(id,function(err,movie){
		if(err){
			console.log(err);
		}
		var movieTitle ='Movie '+ movie.title || '';
		res.render('detail',{
			title:movieTitle,
			movie:movie

		});

	});

});

// delete movie in the list
app.delete('/admin/list',function(req,res){
	var id = req.query.id;
	console.log('hahha '+id);
	if(id){
		Movie.remove({_id:id},function(err,movie){
			if(err){
				console.log(err);
			} else {
				res.json({success:1});
			}

		});

	}


})

// user controller route
// --- signup
app.post('/user/signup',function(req,res){
	var _user = req.body.user;
	

	// see if user exist
	User.findOne({name:_user.name},function(err,user){
		if(err){
			console.log(err);
		}
		if(user){
			return res.redirect('/');
		} else{
			var user = new User(_user);
			user.save(function(err,user){
				if(err){
					console.log(err);
				}
				// console.log(user);
				res.redirect('/admin/userList');
			});
		}
	});


});

//--- signin  /user/signin
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

//-- User List 
app.get('/admin/userList',function(req,res){
	User.fetch(function(err,users){
		if(err){
			console.log(err);
		}
		res.render('userList',{
			title:'User 列表',
			users:users
		})


	});
});





























