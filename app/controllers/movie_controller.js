var Movie = require('../models/movie');
var Comment = require('../models/comment.js');
var _=require('underscore');


exports.list = function(req,res){
		Movie.fetch(function(err,movies){
			if(err){
				console.log(err);
			}
			res.render('list',{
				title:'Movie 列表',
				movies:movies
			})


		});

	};

exports.new = function(req,res){
		

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

	};
exports.adminList = function(req,res){
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

	};
exports.saveNew = function(req,res){
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

	};
exports.detail = function(req,res){
		var id = req.params.id;
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err);
			}
			console.log('1111     '+movie.title);
			// var movieTitle ='Movie '+ movie.title || '';
			// Comments
			Comment.find({movie:id})
				.populate('from','name')
				.exec(function(err,comments){
					console.log('2222   '+comments);
					res.render('detail',{
						title:'Movie Detail',
						movie:movie,
						comments:comments
					});

				});



		});

	};

exports.del = function(req,res){
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


};













