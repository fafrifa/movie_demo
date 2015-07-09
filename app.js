// basic setup
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var Config = require('./config.js');
var mongoose = require('mongoose');
var morgan = require('morgan');
var Movie = require('./app/models/movie.js');

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
//#######
// routes 
//#######
//-- index
app.get('/',function(req,res){
	

});
//-- List
app.get('/list',function(req,res){
	

});

//-- admin
app.get('/admin/movie',function(req,res){
	res.render('admin',{
		title:'movies 后台录入',
	});

});

//-- admin list
app.get('/admin/list',function(req,res){
	

});
//-- admin update

//-- detail
app.get('/movie/:id',function(req,res){
	

});
