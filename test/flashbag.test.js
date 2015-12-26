var expect = require('chai').expect;
var flashbag = require('../modules/flashbag');

var validTypes = [{
	type: 'success',
	msg: 'Success message'
}, {
	type: 'warning',
	msg: 'Warning message'
}, {
	type: 'info',
	msg: 'Info message'
}, {
	type: 'error',
	msg: 'Error Message'
}];

describe('flashbag module', function() {

	it('should be able to add a message with [error, warning, info, success] type', function() {
		validTypes.forEach(function(type) {
			flashbag.pushMessage(type.type, type.msg);
			expect(flashbag.bag[type.type]).to.be.deep.equal([type.msg]);
		});
	});

	it('should remove the messages from bag after poping them out', function() {
		var messages = ['Message 1', 'Message 2'];

		messages.forEach(function(message) {
			flashbag.pushMessage('success', message);
		});
		flashbag.popMessagesFor('success');
		expect(flashbag.bag.success).to.be.deep.equal([]);
	});

	it('will return all the flashbag messages and cleaning the bag', function() {
		validTypes.forEach(function(type) {
			flashbag.pushMessage(type.type, type.msg);
		});

		var bag = flashbag.getMessages();

		expect(bag).to.have.property('success');
		expect(bag).to.have.property('warning');
		expect(bag).to.have.property('info');
		expect(bag).to.have.property('error');
	});
});