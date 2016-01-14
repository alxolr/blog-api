module.exports = {
    isLoggedIn: function(req, res, next) {
        req.session.returnTo = req.path;
        if (req.isAuthenticated()) return next();
        res.redirect('/login');
    }
}