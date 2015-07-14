// var Movie = require('../models/movie');
var Comment_cl = require('../models/comment.js');
var _=require('underscore');


exports.save = function (req,res) {
	var _comment = req.body.comment;
	console.log('comment  ' + _comment);
	var movieId = _comment.movie;
	console.log('333  '+movieId);
	var comment = new Comment_cl(_comment);

	comment.save(function(err,comment){
		if(err){
			console.log(err);
		}
		res.redirect('/movie/'+ movieId);

	});
}













