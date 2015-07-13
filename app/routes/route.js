// Models
var Movie = require('../models/movie');
var User = require('../models/user');
var _=require('underscore');

// Controllers
var IndexController = require('../controllers/index_controller.js');
var MovieController = require('../controllers/movie_controller.js');
var UserController = require('../controllers/user_controller.js');


module.exports = function(app){
	//#######
	// Middleware for Routes 
	//#######
	app.use(function(req,res,next){
		var _user = req.session.user;
		app.locals.user = _user;
		next();
	});

	//#######
	// routes 
	//#######
	//-- INDEX
	app.get('/',IndexController.index);

	//-- MOVIE 
	app.get('/list',MovieController.list);
	app.get('/admin/movie/list',MovieController.list);
	app.get('/admin/movie',MovieController.new);
	app.get('/admin/movie/update/:id',MovieController.detail);
	app.post('/admin/movie/new',MovieController.saveNew)
	app.get('/movie/:id',MovieController.detail);
	app.delete('/admin/movie/list',MovieController.del);

	//-- USER
	app.post('/user/signup',UserController.signup);
	app.post('/user/signin',UserController.signin);
	app.get('/admin/userList',UserController.userList);
	app.get('/logout',UserController.logout);
	app.get('/signin',UserController.showSignin);
	app.get('/signup',UserController.showSignup);

};











