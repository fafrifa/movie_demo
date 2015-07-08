// basic setup
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var Config = require('./config.js');
var mongoose = require('mongoose');
var morgan = require('morgan');

// app.locals - global
app.locals.moment = require('moment');

// template engine
app.set('view engine','jade');
// set views -> views/pages
app.set('views','./views/pages');

// mongo connection
mongoose.connect(Config.dataBase);

// app use : static for project 
app.use(express.static(__dirname+'/public'));
// may write as this way too.
// app.use(express.static(path.join(__dirname,'public')));
// use body-parser to grab infor from POST
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// morgan logger for dev
app.use(morgan('dev'));


// listen to port 
app.listen(Config.port);

console.log("server is running on: "+Config.port);

// routes 
//-- index
app.get('/',function(req,res){
	res.render('index',{
		title:'movies 首页',
		movies:[{
			title:'jerry',
			poster:'./assets/images/001.png',
			_id:1

		},{
			title:'jerry',
			poster:'./assets/images/001.png',
			_id:1

		},{
			title:'jerry',
			poster:'./assets/images/002.png',
			_id:1

		},{
			title:'jerry',
			poster:'./assets/images/003.png',
			_id:1

		},{
			title:'jerry',
			poster:'./assets/images/001.png',
			_id:1

		},{
			title:'jerry',
			poster:'./assets/images/003.png',
			_id:1

		}
		]
	});

});
//-- List
app.get('/list',function(req,res){
	res.render('list',{
		title:'list 页',
		movies:[{
		    _id:1,
		    title: '机械战警',
		    director:'何塞.帕迪利亚',
		    year:2014,
		    country:'美国',
		    language:'英语',
		    poster: './assets/images/002.png',
		    flash: 'http://player.youku.com/player.php/sid/XNJA1Njc0NTUy/v.swf',
		    summary:'Summary here'
		},{
		    _id:2,
		    title: '机械战警',
		    director:'何塞.帕迪利亚',
		    year:2012,
		    country:'美国',
		    language:'英语',
		    poster: './assets/images/001.png',
		    flash: 'http://player.youku.com/player.php/sid/XNJA1Njc0NTUy/v.swf',
		    summary:'Summary Here!'
		},
		{
				    _id:2,
				    title: '机械战警',
				    director:'何塞.帕迪利亚',
				    year:2012,
				    country:'美国',
				    language:'英语',
				    poster: './assets/images/001.png',
				    flash: 'http://player.youku.com/player.php/sid/XNJA1Njc0NTUy/v.swf',
				    summary:'Summary Here!'
				}
		]
	});

});


//-- admin list
app.get('/admin/list',function(req,res){
	res.render('admin',{
		title:'movies 列表页'
		
	});

});
//-- admin
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'movies 后台录入',
	});

});
//-- detail
app.get('/movie/:id',function(req,res){
	res.render('detail',{
		title:'movies 详情页',
		movie:{
			_id:1,
			title: '机械战警',
			director:'何塞.帕迪利亚',
			year:2014,
			country:'美国',
			language:'英语',
			poster: './assets/images/001.png',
			flash: 'http://player.youku.com/player.php/sid/XMTI4MDkyODA=/v.swf',
			summary:'Yes , you know what , i am the Summary for this!!'
		}
	});

});
