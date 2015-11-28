var express       = require('express');
var User          = require('../models/users');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var router        = express.Router();

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use(new LocalStrategy({
	usernameField: 'email',
	passwordField: 'password',
	passReqToCallback: true
}, function(req, email, password, done) {
	process.nextTick(function() {
		User.findOne({'email': email}, function(err, user) {
			if (err) return done(err);

			if (!user) {
				return done(null, false, req.flash('loginMessage', 'No user found.'));
			}

			if (!user.validPassword(password)) {
				return done(null, false, req.flash('loginMessage', 'Invalid password.'));
			}

			return done(null, user);
		});
	});
}));

router.get('/', function (req, res) {
	res.render('index', {title: 'Homepage'});
});

router.get('/login', function (req, res) {
	res.render('login', {title: 'Login', message: req.flash('loginMessage')});
});

router.post('/login', passport.authenticate('local', {
	successRedirect: '/',
	failureRedirect: '/login',
	failureFlash: true
}));

module.exports = router;