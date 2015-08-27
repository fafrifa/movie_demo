var gulp = require('gulp'),
	nodemon = require('gulp-nodemon');

gulp.task('nodemon',function(){
	nodemon({
		scripts:'app.js',
		ext:'js css html'
	})
	.on('restart',function(){
		console.log('Restarted!!');
	});

})
gulp.task('default',['nodemon']);