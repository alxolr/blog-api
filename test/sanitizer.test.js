var expect = require('chai').expect;
var sanitizer = require('../modules/sanitizer');

describe('sanitizer module', function() {
	it('should load the sanitizer module', function() {
		expect(sanitizer).to.be.ok;
	});

	it('should return the input string for the non tag string', function () {
		expect(sanitizer.clean('string')).to.be.equal('string');
	});

	it('should clean the input tags for a single tag string', function() {
		var input = "<script>alert('This is an alert');</script>";
		var output = "alert('This is an alert');";

		expect(sanitizer.clean(input)).to.be.equal(output);
	});

	it('should clean the tags for a multi tag string', function() {
		var input = "This string <script>alert('This is an alert');</script> is a nice"
		            + "ne <script>console.log('sure it is');</script>";
		var output = "This string alert('This is an alert'); is a nicene console.log('sure it is');";

		expect(sanitizer.clean(input)).to.be.equal(output);
	});
});