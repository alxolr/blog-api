var express = require('express');
var app = express();
var port = process.env.PORT || 3000;

app.set('view engine', 'jade');
app.use(express.static('bower_components'));
app.use(express.static('public'));
app.use('/', require('./routes/index'));
app.use('/', require('./routes/admin'));

app.listen(port, function () {
	console.log('App is working on http://localhost:' + port + '/');
});