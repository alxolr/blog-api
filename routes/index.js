function isLoggedIn(req, res, next) {
	if (req.isAuthenticated()) return next();

	res.redirect('/login');
}

module.exports = function(app, passport) {

	app.get('/', function(req, res) {
		res.render('index', {title: 'Homepage', user: req.user});
	});

	app.get('/login', function(req, res) {
		res.render('login', {title: 'Login page', message: req.flash('loginMessage')});
	});

	app.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash: true
	}));

	app.get('/register', function(req, res) {
		res.render('register', {title: 'Register a new account', message: req.flash('signupMessage')});
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
		res.render('forgot-password', {title: 'Forgot password', message: req.flash('forgotPasswordMessage')});
	});
};