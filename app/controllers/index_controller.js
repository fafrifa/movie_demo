var Movie = require('../models/movie');
var Category = require('../models/category.js')
//-- index
exports.index = function(req,res){
	// console.log('Session !!!');
	// console.log(req.session.user);
	Category.find({})
		.populate({path:'movies',options:{limit:5}})
		.exec(function(err,categories){

			if(err){
				console.log(err);
			}
			res.render('index',{
				title:'Movie Index',
				categories: categories
			});
		});



};
exports.search = function(req,res){
	// console.log('Session !!!');
	// console.log(req.session.user);
	var catId = req.query.cat;
	var q = req.query.q;
	// console.log('66666');
	// console.log(q);

	var page = parseInt(req.query.p) || 0;
	var count = 3;
	var index = page * count;

	if(catId){
		console.log('hihi');
		Category.find({_id:catId})
			.populate({path:'movies'
				// ,options:{limit:count,skip:index}
			})
			.exec(function(err,categories){

				if(err){
					console.log(err);
				}
				// console.log(categories);
				var category = categories[0];
				var movies = category.movies || [];
				var results = movies.slice(index,index+count);
				var totalPage = movies.length / count;


				res.render('results',{
					title:'Results',
					movies: results,
					keyword:category.name,
					currentPage : page+1,
					totalPage: Math.ceil(totalPage),
					query: 'cat='+catId

				});
			});
	} else{
		console.log('hohohoo');
		var q_reg = new RegExp(q+'.*','i');	
		console.log(q_reg);
		Movie.find({title:q_reg})
			.exec(function(err,movies){
				if(err){
					console.log(err);
				}
				var results = movies.slice(index,index+count);
				var totalPage = movies.length / count;
				// console.log(movies.length);
				// console.log(totalPage);

				res.render('results',{
					title:'Search Results',
					movies: results,
					keyword:q,
					currentPage : page+1,
					totalPage: Math.ceil(totalPage),
					query: 'q='+q

				});				

			});
	}



};