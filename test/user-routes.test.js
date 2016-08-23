(() => {
    "use strict";
    const config = require('../config'),
        mongodb = require('mongodb').MongoClient,
        assert = require('assert'),
        request = require('request');

    describe('User Routes', () => {
        beforeEach(() => {
            mongodb.connect(config.database, (err, db) => {
                db.collection('users').remove({}).then(handleSuccess, handleErrors);

                function handleSuccess(res) {
                    assert.notEqual(err, null);
                }

                function handleErrors(err) {
                    assert.equal(err, null);
                }
            });     
        });

        it('Should create a user', (done) => {
            done();
        });
    });
})();