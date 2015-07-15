// var Movie = require('../models/movie');
var Comment_cl = require('../models/comment.js');
var _=require('underscore');


exports.save = function (req,res) {
	var _comment = req.body.comment;
	console.log('11111 comment  ' + JSON.stringify(_comment));
	var movieId = _comment.movie;
	if(_comment.cid){

		Comment_cl.findById(_comment.cid,function(err,comment){
			var reply={
				from:_comment.from,
				to:_comment.tid,
				content:_comment.content
			};

			//console.log('333 '+reply.toString);
			comment.reply.push(reply);
			
			comment.save(function(err,comment){
				if(err){
					console.log(err);
				}
				console.log('33333 comment  ' + JSON.stringify(comment));
				res.redirect('/movie/'+movieId);

			});
			console.log('22222 comment  ' + JSON.stringify(comment));
			// OK reply is right : save with relay{from , to ,content , _id}
		});
	} else{
		var comment = new Comment_cl(_comment);
		comment.save(function(err,comment){
			if(err){
				console.log(err);
			}
			res.redirect('/movie/'+ movieId);

		});
		
	}

}













