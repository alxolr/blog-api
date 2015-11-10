var request = require('request');

describe('homepage', function () {
    var url = 'http://localhost:3000';

    it('returns status 200', function () {
        request(url, function (error, response, body) {
            expect(response.statusCode).to.equal(200);
        });
    });

    it('returns status 404', function () {
        request(url + '/foo/bar', function (err, res, body) {
            expect(res.statusCode).to.equal(404);
        })
    });
});