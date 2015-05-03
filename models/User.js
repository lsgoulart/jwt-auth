var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt   = require('bcrypt-nodejs');
var jwt    	= require('jsonwebtoken');


var userSchema = new Schema({
	username: String,
	email: String,
	password: String,
	token: String
});

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};

userSchema.methods.generateToken = function(user, secret){
	return jwt.sign(user, process.env.JWT_SECRET, {expiresInMinutes: 1440});
};

module.exports = mongoose.model('User', userSchema);