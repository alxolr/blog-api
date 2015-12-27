/**
 * Module for cleaning the client input
 * @type {String}
 */
module.exports = {
	/**
	 * Remove the html tags
	 * @param  {String} input
	 * @return {String}
	 */
	clean: function(input) {
		var regex = /(<([^>]+)>)/ig,
			result = input.replace(regex, "");

		return result;
	}
};