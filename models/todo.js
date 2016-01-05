var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Todo = new Schema({
	user_id: String,
	content: String,
	created_at: Date,
	done_at: Date
});

module.exports = mongoose.model('Todo', Todo);