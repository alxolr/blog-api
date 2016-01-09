var superagent = require('superagent').agent();
var expect = require('chai').expect;

describe('TODO application api', function() {
	it('should return unathorized when not loggedin', function(done) {
		superagent.get('http://localhost:3000/apps/api/todo')
			.auth('test@test.com', 'test')
			.end(function(err, res) {
				expect(res.statusCode).to.be.equal(401); //unauthorized
				done();
			});
	});
	it('should login the user', function(done) {
		superagent
			.post('http://localhost:3000/login')
			.send({
				email: 'test@test.com',
				password: 'test'
			})
			.end(function(err, res) {
				expect(res).to.be.ok;
				done();
			});
	});

	it('should return the todos for the current user', function(done) {
		superagent
			.get('http://localhost:3000/apps/api/todo')
			.end(function(err, res) {
				expect(err).to.be.not.ok;
				done();
			});
	});
});