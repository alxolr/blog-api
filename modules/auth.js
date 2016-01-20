/**
 * Authentication middleware
 * @type {Object}
 */
module.exports = {
	/**
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {Boolean}       [description]
	 */
	isLoggedIn: function(req, res, next) {
		req.session.returnTo = req.path;
		if (req.isAuthenticated()) return next();
		res.redirect('/login');
	},
	isAdmin: function(req, res, next) {
		req.session.returnTo = req.path;
		if (req.isAuthenticated()) {
			if (req.user.role == 'ROLE_ADMIN') {
				return next();
			}
		}

		res.redirect('/login');
	},
	/**
	 * @param  {[type]}   req  [description]
	 * @param  {[type]}   res  [description]
	 * @param  {Function} next [description]
	 * @return {Boolean}       [description]
	 */
	isAuthenticated: function(req, res, next) {
		if (req.isAuthenticated()) return next();

		res.sendStatus(401);
	}
}