var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var passport      = require('passport');
var LocalStrategy = require('passport-local');
var mongoose      = require('mongoose');
var flash         = require('connect-flash');
var port          = process.env.PORT || 3000;

app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
	secret: process.env.SESSION_SECRET || 'awesome-secret-key',
	resave: true,
	saveUninitialized: false
}));

//passport configuration
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));

//routing
app.use('/', require('./routes/index'));
app.use('/', require('./routes/users'));
app.use(function (req, res, next) {
	res.status(404).render('404', {title: 'Resource not found'});
});

app.listen(port, function () {
	console.log('App is working on http://localhost:' + port + '/');
});