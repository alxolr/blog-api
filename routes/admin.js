var express = require('express');
var router = express.Router({mergeParams: true});

router.get('/admin', function (req, res) {
	res.redirect('/admin/dashboard');
});

router.get('/admin/dashboard', function (req, res) {
	res.render('dashboard', {title: "Dashboard h1"});
});

router.get('/admin/login', function (req, res) {
	res.render('login');
});

router.post('/admin/login', function (req, res) {
	res.redirect('/admin/dashboard');
});

router.get('/admin/logout', function (req, res) {
	res.redirect('homepage');
});

module.exports = router;