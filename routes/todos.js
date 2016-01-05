var Todo = require('../models/todo');
var sanitizer = require('../modules/sanitizer');

function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) return next();

	res.sendStatus(401);
}

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();
	res.redirect('/login');
}

module.exports = function(app, passport) {

	app.get('/apps/todo', isLoggedIn, function(req, res) {
		res.render('todo', {
			user: req.user,
			title: 'Todo List'
		});
	});

	//API for Angular Js
	app.get('/apps/api/todo', isAuthenticated, function(req, res) {
		var start = new Date();
		start.setHours(0, 0, 0, 0);

		var end = new Date();
		end.setHours(23, 59, 59, 999);

		Todo.find({
			user_id: req.user.id,
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

		}, function(err, todos) {
			if (err) res.send(err);
			res.json(todos);
		});
	});

	app.post('/apps/api/todo', isAuthenticated, function(req, res) {
		Todo.create({
			content: req.body.content,
			user_id: req.user.id,
			created_at: new Date()
		}, function(err, todo) {
			if (err) res.send(err);

			var start = new Date();
			start.setHours(0, 0, 0, 0);

			var end = new Date();
			end.setHours(23, 59, 59, 999);

			Todo.find({
				user_id: req.user.id,
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

			}, function(err, todos) {
				if (err) res.send(err);
				res.json(todos);
			});
		});
	});

	app.delete('/apps/api/todo/:id', isAuthenticated, function(req, res) {
		Todo.update({
			_id: req.params.id,
			user_id: req.user.id
		}, {
			$set: {
				done_at: new Date()
			}
		}, function(err, done) {
			if (err) res.send(err);

			var start = new Date();
			start.setHours(0, 0, 0, 0);

			var end = new Date();
			end.setHours(23, 59, 59, 999);

			Todo.find({
				user_id: req.user.id,
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

			}, function(err, todos) {
				if (err) res.send(err);
				res.json(todos);
			});
		});
	});
}