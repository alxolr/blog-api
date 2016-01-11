var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TodoSchema = new Schema({
	user_id: String,
	content: String,
	priority: {
		type: Number,
		default: 0
	},
	created_at: Date,
	done_at: Date,
	deadline_at: Date,
});

TodoSchema.statics.findTodaysTodosFor = function(userId, cb) {
	var start = new Date();
	start.setHours(0, 0, 0, 0);

	var end = new Date();
	end.setHours(23, 59, 59, 999);

	return this.model('Todo').find({
		user_id: userId,
		$or: [{
			done_at: {
				$exists: false
			}
		}, {
			done_at: {
				$gte: start,
				$lt: end
			}
		}]
	}, cb);
}

module.exports = mongoose.model('Todo', TodoSchema);