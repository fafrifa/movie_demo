exports.sanitize = function(word){
	// console.log('333');
	// return word.toLowerCase().split('-').join(' ');
	return word.toLowerCase().replace(/-/g,' ');
};