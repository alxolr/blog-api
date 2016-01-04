'use strict';

require('../app');

var chai = require("chai");
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
chai.should();

var wd = require('wd');

chaiAsPromised.transferPromiseness = wd.transferPromiseness;

var browser = wd.promiseChainRemote();

describe('Blog Index', function() {
	this.timeout(6000);

	before(function(done) {
		browser.init({
			browserName: 'firefox'
		}).then(function() {
			done();
		});
	});

	beforeEach(function(done) {
		browser.get('http://localhost:3000/blog/').then(function() {
			done();
		});
	});

	after(function(done) {
		browser.quit().then(function() {
			done();
		});
	});

	it('displays a number of article summaries on the blog index', function(done) {
		browser.elementsByCssSelector('.article-summary')
		.should.eventually.have.length.above(0).notify(done);
	});
});