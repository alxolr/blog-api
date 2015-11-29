var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/users');

module.exports = function(passport) {

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});

	passport.use('register', new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	}, function(req, email, password, done) {
		process.nextTick(function() {
			User.findOne({'email': email}, function(err, user) {
				if (err) return done(err);

				if (user) {
					return done(null, false, req.flash('signupMessage', 'The email already exists!'));
				} else {
					var user       = new User();
					user.email     = email;
					user.password  = user.generateHash(password);
					user.firstname = req.body.firstname;
					user.surname   = req.body.surname;

					user.save(function(err) {
						if (err) return done(err);

						return done(null, user);
					});
				}
			});
		});
	}));

	passport.use('login', new LocalStrategy({
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
}