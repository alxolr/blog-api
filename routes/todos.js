var Todo = require('../models/todos');
var sanitizer = require('../modules/sanitizer');

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();

	res.redirect('/login');
}

module.exports = function(app, passport) {
	app.get('/todo', isLoggedIn, function(req, res) {

		Todo.find({}, function(err, result) {
			if (err) return handleError(err);

			res.render('todo', {
				title: 'Todo List',
				user: req.user,
				todos: result
			});

		});
	});

	app.post('/todo/add', isLoggedIn, function(req, res) {
		var todo = sanitizer.clean(req.body.todo);
		console.log(todo);
		var TodoObject = new Todo({
			user_id: req.user._id,
			content: todo
		});

		TodoObject.save(function(err) {
			if (err) return handleError(err);
		});

		res.redirect('/todo');
	});

	app.get('/todo/delete/:id', isLoggedIn, function(req, res) {
		console.log(req.params.id);
		Todo.remove({
			user_id: req.user._id,
			_id: req.params.id
		}, function(err) {
			if (err) return handleError(err);
			res.redirect('/todo');
		});
	});
}