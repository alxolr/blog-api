var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'jade');
app.use(express.static(__dirname + '/bower_components'));
app.use(express.static(__dirname + '/public'));
app.use('/', require('./routes/index'));
app.use('/', require('./routes/users'));
app.use(function (req, res, next) {
	res.status(404).render('404', {title: 'Resource not found'});
});
app.listen(port, function () {
	console.log('App is working on http://localhost:' + port + '/');
});