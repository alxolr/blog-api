var express       = require('express');
var app           = express();
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var session       = require('express-session');
var passport      = require('passport');
var mongoose      = require('mongoose');
var flash         = require('connect-flash');
var favicon       = require('serve-favicon');
var port          = process.env.PORT || 3000;

var uristring = process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost:27017/blog';

mongoose.connect(uristring, function (err, res) {
	if (err) {
		console.log('Error connecting to ' + uristring + ' with error ' + err);
	} else {
		console.log('Success connecting on ' + uristring);
	}
});

app.set('view engine', 'jade');

require('./config/passport')(passport);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(session({
	secret: process.env.SESSION_SECRET || 'awesome-secret-key',
	resave: true,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

require('./routes/index')(app, passport);
require('./routes/todos')(app, passport);
require('./routes/article')(app, passport);

app.use(function (req, res, next) {
	res.status(404).render('404', {title: 'Resource not found', user: req.user});
});

app.listen(port, function () {
	console.log('App is working on http://localhost:' + port + '/');
});
