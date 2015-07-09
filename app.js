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

console.log("server is running on: "+Config.port);
//#######
// routes 
//#######
//-- index
app.get('/',function(req,res){
	

});
//-- List 
app.get('/list',function(req,res){
	res.render

});

//-- admin
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'movies 后台录入',
		movie:{
			director:'hihi',
			title:'hoho',
			language:'EN',
			country:'CN',
			summary:'catcat',
			flash:'http://player.youku.com/player.php/sid/XMTI2NjA4MzU1Ng==/v.swf',
			poster:'http://img4.duitang.com/uploads/item/201207/08/20120708234648_dwQuG.thumb.600_0.jpeg',
			year:2010
			
		}
	});

});

//-- admin list
app.get('/admin/list',function(req,res){
	

});
//-- admin post
app.post('/admin/movie',function(req,res){
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
		res.render('detail',{
			title:'Moive' + movie.title,
			movie:movie

		});

	});

});




























