// basic setup
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var Config = require('./config.js');
var mongoose = require('mongoose');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var app = express();

// Route module
var Route = require('./app/routes/route');




// var Movie = mongoose.model('Movie');
// mongo connection
// console.log(Config.dataBase);
mongoose.connect(Config.dataBase);
// use body-parser to grab infor from POST
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
// session and cookie Parser
app.use(cookieParser());
app.use(session({
	secret:'Moive',
	store: new mongoStore({
		url:Config.dataBase,
		collection:'sessions'
	})
}));




// app.locals - global
app.locals.moment = require('moment');

// template engine
app.set('view engine','jade');
// set views -> views/pages
app.set('views','./app/views/pages'); 


// app use : static for project 
app.use(express.static(__dirname+'/public'));
// may write as this way too.
// app.use(express.static(path.join(__dirname,'public')));
// morgan logger for dev
app.use(morgan('dev'));

// config APP entry file
if('development'===app.get('env')){
	app.set('showStackError',true);
	app.locals.pretty = true;
	// mongoose.set('debug',true);
}




// pass APP to the route !
require('./app/routes/route')(app);


// listen to port 
app.listen(Config.port);

console.log('server is running on: '+Config.port);




























