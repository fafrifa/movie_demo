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