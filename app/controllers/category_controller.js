var Movie = require('../models/movie');
var Comment_cl = require('../models/comment.js');
var Category = require('../models/category.js');
var _=require('underscore');


exports.list = function(req,res){
		Category.fetch(function(err,categories){
			if(err){
				console.log(err);
			}
			res.render('category_list',{
				title:'Cat 列表',
				categories:categories
			})


		});

	};

exports.new = function(req,res){
		

		res.render('category_admin',{
			title:'movies Cat',
			category:{
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
// exports.adminList = function(req,res){
// 		var id = req.params.id;
// 		console.log(id);
// 		if(id){
// 			Movie.findById(id,function(err,movie){
// 				if(err){
// 					console.log(err);
// 				}
// 				res.render('admin',{
// 					title:'Moive 后台',
// 					movie:movie
// 				});
// 			});
// 		}

// 	};
exports.saveNew = function(req,res){
		//console.log(req.body.movie);
		//bodyParser extended = true  -> is the key !!!
		var _category = req.body.category;
		var category = new Category(_category);
		

			category.save(function(err,category){
				if(err){
					console.log(err);
				}
				res.redirect('/admin/category/list');
			});


};

// exports.detail = function(req,res){
// 		var id = req.params.id;
// 		Movie.findById(id,function(err,movie){
// 			if(err){
// 				console.log(err);
// 			}
// 			// console.log('1111     '+movie.title);
// 			// var movieTitle ='Movie '+ movie.title || '';
// 			// Comments
			
// 			Comment_cl.find({movie:id})
// 				.populate('from','name')
// 				.populate('reply.from reply.to','name')
// 				.exec(function(err,comments){
					
// 					console.log(66666+JSON.stringify(comments));
// 					res.render('detail',{
// 						title:'Movie Detail',
// 						movie:movie,
// 						comments:comments
// 					});

// 				});



// 		});

// 	};

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













