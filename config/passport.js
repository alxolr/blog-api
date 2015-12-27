var LocalStrategy = require('passport-local').Strategy;
var User          = require('../models/users');
var flashbag	  = require('../modules/flashbag');
var sanitizer     = require('../modules/sanitizer');

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
					user.name      = sanitizer.clean(req.body.name);
					user.link      = user.generateValidationLink();

					flashbag.pushMessage('success', 'The users was added successfuly');
					flashbag.pushMessage('info', 'A confirmation email was sent to ' + email);

					var sendgrid  = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env.SENDGRID_PASSWORD);
					sendgrid.send({
					  to:       user.email,
					  from:     'admin@alxolr.com',
					  subject:  'Verify your account',
					  text:     'Hi ' + user.name + ' in order to validate your account please click on the following link ' + 'http://www.alxolr.com/user/verify/' + user.link
					}, function(err, json) {
					  if (err) { return console.error(err); }
					  console.log(json);
					});

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