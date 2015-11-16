var express = require('express');
var router = express.Router({mergeParams: true});

router.get('/', function (req, res) {
	res.redirect('/admin/dashboard');
});

router.get('/dashboard', function (req, res) {
	res.render('dashboard', {title: "Dashboard h1"});
});

router.get('/login', function (req, res) {
	res.render('login');
});

router.post('/login', function (req, res) {
	res.redirect('/admin/dashboard');
});

router.get('/logout', function (req, res) {
	res.redirect('homepage');
});

module.exports = router;