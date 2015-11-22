var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	res.render('index', {title: 'Homepage', authorised: false});
});

router.get('/articles', function (req, res) {
	res.render('articles', {title: 'Articles'});
});

module.exports = router;