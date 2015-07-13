var Movie = require('../models/movie');

//-- index
exports.index = function(req,res){
	console.log('Session !!!');
	console.log(req.session.user);



	Movie.fetch(function(err,movies){
		if(err){
			console.log(err);
		}
		res.render('index',{
			title:'Movie Index',
			movies: movies
		});
	});

};