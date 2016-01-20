var auth = require('../modules/auth');
var Article = require('../models/article');

module.exports = function(app, passport) {
	app.get('/admin/article', auth.isAdmin, function(req, res) {
		var articles = [];
		Article.find({}, function(err, result) {
			if (err) {
				console.log(err);
			}
			res.render('admin/article', {
				articles: result,
				user: req.user,
				title: 'Articles Dashboard'
			});
		});
	});

	app.get('/admin/article/add', auth.isAdmin, function(req, res) {
		res.render('admin/article-add', {
			user: req.user,
			title: "Add new Article"
		})
	});

	app.post('/admin/article/add', auth.isAdmin, function(req, res) {
		var article = new Article();
		article.title = req.body.title;
		article.body = req.body.body;
		article.author = req.user.id;

		article.save(function(err) {
			if (err) {
				console.log('The article was not saved');
			} else {
				res.redirect('/admin/article');
			}

		});
	});
}