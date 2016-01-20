var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
	author: String,
	title: String,
	body: String,
	headImg: String,
	created_at: Date,
	updated_at: Date
});

ArticleSchema.pre('save', function(next) {
	var now = new Date();
	this.updated_at = now;
	if (!this.created_at) {
		this.created_at = now;
	}
	next();
});


module.exports = mongoose.model('Article', ArticleSchema);