var Movie = require('../models/movie');
var Comment_cl = require('../models/comment.js');
var _=require('underscore');
var Category = require('../models/category.js');
var fs = require('fs');
var path = require('path');

// savePoster Midware
exports.savePoster = function(req,res,next){
	var posterData = req.files.uploadPoster;
	console.log('777777'+JSON.stringify(posterData));
	var filePath = posterData.path;
	var originalFilename = posterData.originalFilename;
	if(originalFilename){
		fs.readFile(filePath,function(err,data){
			var timestamp = Date.now();
			var type = posterData.type.split('/')[1];
			var poster = timestamp+'.'+type;
			var newPath = path.join(__dirname,'../../','/public/upload/'+poster);

			fs.writeFile(newPath,data,function(err){
				req.poster = poster;
				next();
			});

		});
	}
	else{
		next();
	}


};



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
		Category.find({})
		.exec(function(err,categories){

			res.render('admin',{
				title:'movies 后台录入',
				movie:{},
				categories:categories
			});

		});


	};
exports.update = function(req,res){
		var id = req.params.id;
		// console.log(id);
		if(id){
			Movie.findById(id,function(err,movie){
				Category.find({},function(err,categories){

					if(err){
						console.log(err);
					}
					res.render('admin',{
						title:'Moive 后台',
						movie:movie,
						categories:categories
					});
				});
			});
		}

	};
exports.saveNew = function(req,res){
		//console.log(req.body.movie);
		//bodyParser extended = true  -> is the key !!!
		var id = req.body.movie._id;
		var movieObj = req.body.movie;
		var catId_updated = movieObj.category;
		var _movie;
		if(req.poster){
			movieObj.poster = req.poster;
		}

		if(id){
			Movie.findById(id,function(err,movie){
				if(err){
					console.log(err);
				}
				//******
				// remove old cat 
				var catId_old = movie.category;
				Category.findById(catId_old,function(err,category){
					var index = category.movies.indexOf(id);
					if(index>-1){

						category.movies.splice(index,1);
						category.save(function(err,category){
							console.log(err);
						});
					}
				});
				//******


				_movie = _.extend(movie,movieObj);
				_movie.save(function(err,movie){
					if(err){
						console.log(err);
					}
					//var catId = movie.category;
					Category.findById(catId_updated,function(err,category){
						// then add to the new
						category.movies.push(movie._id);
						category.save(function(err,category){
							if(err){
								console.log(err);
							}
							res.redirect('/movie/'+movie._id);
							
						});

					});
				});
			});

		} else {
			_movie = new Movie(movieObj);
			var catName = movieObj.categoryName;
			var catId = movieObj.category;
			_movie.save(function(err,movie){
				if(err){
					console.log('2222'+err);
				}
				if(catId){

					Category.findById(catId,function(err,category){
						category.movies.push(movie._id);
						category.save(function(err,category){
							if(err){
								console.log(err);
							}
							res.redirect('/movie/'+movie._id);

						});

					});
				} else if(catName){
					var cat_new = new Category({
						name:catName,
						movies:[movie._id]
					});
					cat_new.save(function(err,category){
						movie.category = category._id;
						movie.save(function(err,movie){
							if(err){
								console.log(err);
							}
							res.redirect('/movie/'+movie._id);
						});
					});

				}




			});


		}

	};
exports.detail = function(req,res){
		var id = req.params.id;
		Movie.findById(id,function(err,movie){
			if(err){
				console.log(err);
			}
			// console.log('1111     '+movie.title);
			// var movieTitle ='Movie '+ movie.title || '';
			// Comments
			
			Comment_cl.find({movie:id})
				.populate('from','name')
				.populate('reply.from reply.to','name')
				.exec(function(err,comments){
					
					console.log(66666+JSON.stringify(comments));
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













