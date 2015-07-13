var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt-nodejs');
var UserSchema = new Schema({
	name:{type:String,required:true,unique:true},
	password:{type:String,required:true,select:false},
	role:{
		type:Number,
		default:0
	},
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
UserSchema.pre('save',function(next){
	var user = this;
	if(this.isNew){
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else{
		this.meta.updateAt = Date.now();
	}
	// if(!user.isModified('password')){
	// 	return next();
	// }
	bcrypt.hash(user.password,null,null,function(err,hash){
		if(err){
			return next(err);
		}
		user.password = hash;
		next();
	});


	// MUST !!! USE !!! next()!
	next();

});
// instance functions -- methods :comparePassword
// 
UserSchema.methods = {
	comparePassword: function(_password,cb){
		bcrypt.compare(_password, this.password, function(err,isMatch){
			if(err){
				return cb(err);
			}
			cb(null,isMatch);

		});

	}
}
// --- sync
// UserSchema.methods.comparePassword = function(password){
// 	user = this;
// 	return bcrypt.compareSync(password,user.password);

// };


// statics 
UserSchema.statics = {
	fetch: function(cb){
		return this.find({}).sort('meta.updateAt').exec(cb);
	},
	findById: function(id, cb){
		return this.findOne({_id: id}).exec(cb);

	}

};

module.exports = mongoose.model('User',UserSchema);


