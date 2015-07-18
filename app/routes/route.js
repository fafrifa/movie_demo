// Models
var Movie = require('../models/movie');
var User = require('../models/user');
var _=require('underscore');

// Controllers
var IndexController = require('../controllers/index_controller.js');
var MovieController = require('../controllers/movie_controller.js');
var UserController = require('../controllers/user_controller.js');
var CommentController = require('../controllers/comment_controller.js');
var CategoryController = require('../controllers/category_controller.js');



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
	// app.get('/list',MovieController.list);
	app.get('/admin/movie/list',UserController.signinRequired, UserController.adminRequired,MovieController.list);
	app.get('/admin/movie',UserController.signinRequired, UserController.adminRequired,MovieController.new);
	app.get('/admin/movie/update/:id',UserController.signinRequired, UserController.adminRequired,MovieController.detail);
	app.post('/admin/movie/new',UserController.signinRequired, UserController.adminRequired,MovieController.saveNew)
	app.get('/movie/:id',MovieController.detail);
	app.delete('/admin/movie/list',UserController.signinRequired, UserController.adminRequired,MovieController.del);

	//-- USER
	app.post('/user/signup',UserController.signup);
	app.post('/user/signin',UserController.signin);
	app.get('/admin/userList', UserController.signinRequired, UserController.adminRequired, UserController.userList);
	app.get('/logout',UserController.logout);
	app.get('/signin',UserController.showSignin);
	app.get('/signup',UserController.showSignup);
	// Comments
	app.post('/admin/comment',UserController.signinRequired,CommentController.save);

	// Category
	app.get('/admin/category/new',UserController.signinRequired, UserController.adminRequired,CategoryController.new);
    app.post('/admin/category',UserController.signinRequired, UserController.adminRequired,CategoryController.saveNew)
	app.get('/admin/category/list',UserController.signinRequired, UserController.adminRequired,CategoryController.list);


};











