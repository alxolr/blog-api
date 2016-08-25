(() => {
    "use strict";
    const config = require('../config'),
        assert = require('assert'),
        mongodb = require('mongodb'),
        utils = require('../helpers/utils'),
        request = require('request');

    describe('Article Routes', () => {
        const resource = `http://localhost:${config.port}/api/v1/articles`;
        const cleanupDb = () => {
            mongodb.connect(config.database, (err, db) => {
                db.collection('articles').remove({}).then(handleSuccess, handleErrors);

                function handleSuccess(res) {
                    assert.notEqual(err, null);
                }

                function handleErrors(err) {
                    assert.equal(err, null);
                }
            });
        };

        const article = {
            title: "This article",
        };

        beforeEach(() => {
            cleanupDb();
        });

        after(() => {
            cleanupDb();
        });


        describe('Create article', () => {
            it(`Should return "${utils.messages.TOKEN_NOT_PROVIDED}" when creating article without token`, done => {
                request.post(resource, {
                    form: article
                }, (err, res, body) => {
                    assert.equal(err, null);
                    let json = JSON.parse(body);
                    assert.equal(json.message, utils.messages.TOKEN_NOT_PROVIDED);
                    done();
                });
            });
        });
    });

})();