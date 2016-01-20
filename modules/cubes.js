module.exports = {
	/**
	 * Method that generates a random number from 1 to 6
	 * @return {Number} Random number {1-6}
	 */
	generate: function(influence, cb) {
		var result = parseInt(Math.random() * 6) + 1;

		if (Math.random() < influence && result < 6) {
			result++;
		}

		cb(null, result);
	},
	/**
	 * [throw description]
	 * @param  {Function} cb [description]
	 * @return {[type]}      [description]
	 */
	throw: function(cb) {
		var result = 0;
		var parent = this;
		parent.generate(null, function(err, sum) {
			result += sum;
			parent.generate(null, function(err, sum) {
				result += sum;
				parent.generate(null, function(err, sum) {
					result += sum;
					cb(null, result);
				});
			})
		});
	}
};