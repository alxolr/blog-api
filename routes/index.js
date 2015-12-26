var cheetsheets = require('../modules/cheetsheets');
var flashbag = require('../modules/flashbag');

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();

	res.redirect('/login');
}

module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		res.render('index', {
			title: 'Homepage',
			user: req.user,
			flashbag: flashbag.getMessages()
		});
	});

	app.get('/login', function(req, res) {
		res.render('login', {
			title: 'Login page',
			message: req.flash('loginMessage')
		});
	});

	app.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/register', function(req, res) {
		res.render('register', {
			title: 'Register a new account',
			message: req.flash('signupMessage'),
			flashbag: flashbag.getMessages()
		});
	});

	app.post('/register', passport.authenticate('register', {
		successRedirect: '/',
		failureRedirect: '/register',
		failureFlash: true
	}));

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	app.get('/forgot-password', function(req, res) {
		res.render('forgot-password', {
			title: 'Forgot password',
			message: req.flash('forgotPasswordMessage'),
			flashbag: flashbag.getMessages()
		});
	});

	app.get('/about', function(req, res) {
		res.render('about', {
			title: 'About'
		});
	});

	app.get('/cheetsheets/php', function(req, res) {
		res.render('cheetsheets/php', {
			title: "PHP - Cheetsheet",
			user: req.user,
			cheet: cheetsheets.php
		});
	});

	app.get('/cheetsheets/rest', function(req, res) {
		res.render('cheetsheets/rest', {
			title: "Web Services REST - Cheetsheet",
			user: req.user,
			cheet: cheetsheets.rest
		});
	});
};