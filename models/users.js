var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var userSchema = mongoose.Schema({
	name: String,
	email: String,
	password: String,
	isVerified: {
		type: Boolean,
		default: false
	},
	link: String,
	role: {
		type: String,
		default: 'ROLE_USER'
	}
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}

userSchema.methods.generateValidationLink = function() {
	var hash = this.name + this.email + this.password;

	return bcrypt.hashSync(hash, bcrypt.genSaltSync(2), null);
}

module.exports = mongoose.model('User', userSchema);