var mongoose = require('mongoose');
var MovieSchema = new mongoose.Schema({
	director:String,
	title:String,
	language,String,
	country:String,
	summary:String,
	flash:String,
	poster:String,
	year:Number,
	meta:{
		createAt:{
			type:Date,
			default:Date.now()
		},
		updateAt:{
			type:Date,
			default:Date.now()
		}

	}

});

// Middleware!
MovieSchema.pre('save',function(next){
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else{
		this.meta.updateAt = Date.now();
	}
	


});
// statics 
MovieSchema.statics = {
	fetch: function(cb){
		return this
			.find({})
			.sort('meta.updateAt')
			.exec(cb);
	},
	findById: function(id,cb){
		return this
			.findOne({_id:id})
			.exec(cb);

	}

};

module.exports = mongoose.model('Movie',MovieSchema);


