var Todo = require('../models/todo');
var sanitizer = require('../modules/sanitizer');
var auth = require('../modules/auth');

module.exports = function(app, passport) {
	app.get('/apps/todo', auth.isLoggedIn, function(req, res) {
		res.render('todo', {
			user: req.user,
			title: 'Todo List'
		});
	});

	//API for Angular Js
	app.get('/apps/api/todo', auth.isAuthenticated, function(req, res) {
		Todo.findTodaysTodosFor(req.user.id, function(err, todos) {
			if (err) res.send(err);
			res.json(todos);
		});
	});

	app.post('/apps/api/todo', auth.isAuthenticated, function(req, res) {
		Todo.create({
			content: req.body.content,
			user_id: req.user.id,
			created_at: new Date(),
			deadline_at: req.body.deadline_at,
			category: req.body.category
		}, function(err, todo) {
			if (err) res.send(err);

			Todo.findTodaysTodosFor(req.user.id, function(err, todos) {
				if (err) res.send(err);
				res.json(todos);
			});
		});
	});

	app.post('/apps/api/todo/priority/down/:id', auth.isAuthenticated, function(req, res) {
		Todo.update({
			_id: req.params.id,
			user_id: req.user.id
		}, {
			$inc: {
				priority: -1
			}
		}, function(err, done) {
			if (err) res.send(err);

			Todo.findTodaysTodosFor(req.user.id, function(err, todos) {
				if (err) res.send(err);
				res.json(todos);
			});
		});
	});
	app.post('/apps/api/todo/priority/up/:id', auth.isAuthenticated, function(req, res) {
		Todo.update({
			_id: req.params.id,
			user_id: req.user.id
		}, {
			$inc: {
				priority: 1
			}
		}, function(err, done) {
			if (err) res.send(err);

			Todo.findTodaysTodosFor(req.user.id, function(err, todos) {
				if (err) res.send(err);
				res.json(todos);
			});
		});
	});

	app.delete('/apps/api/todo/:id/done', auth.isAuthenticated, function(req, res) {
		Todo.update({
			_id: req.params.id,
			user_id: req.user.id
		}, {
			$set: {
				done_at: new Date()
			}
		}, function(err, done) {
			if (err) res.send(err);

			Todo.findTodaysTodosFor(req.user.id, function(err, todos) {
				if (err) res.send(err);
				res.json(todos);
			});
		});
	});

	app.delete('/apps/api/todo/:id', auth.isAuthenticated, function(req, res) {
		Todo.remove({
			_id: req.params.id,
			user_id: req.user.id
		}, function(err, done) {
			if (err) res.send(err);

			Todo.findTodaysTodosFor(req.user.id, function(err, todos) {
				if (err) res.send(err);
				res.json(todos);
			});
		});
	});
};
