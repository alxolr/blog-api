(() => {
    "use strict";
    const config = require('../config'),
        assert = require('assert'),
        mongodb = require('mongodb'),
        utils = require('../helpers/utils'),
        request = require('request'),
        shared = require('./shared');

    describe('Article Routes', () => {
        const resource = `http://localhost:${config.port}/api/v1/articles`;
        const cleanupCollection = (collection) => {
            mongodb.connect(config.database, (err, db) => {
                db.collection(collection).remove({}).then(handleSuccess, handleErrors);

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
            shared.cleanupCollection('articles');
            shared.cleanupCollection('users');
        });

        after(() => {
            shared.cleanupCollection('articles');
            shared.cleanupCollection('users');
        });


        describe('Create article', () => {
            it(`Should return "${utils.messages.TOKEN_NOT_PROVIDED}" when creating article without token`, done => {
                request.post(resource, {
                    form: article
                }, (err, res, body) => {
                    shared.assertOk(err, body, false, utils.messages.TOKEN_NOT_PROVIDED, done);
                });
            });
        });
    });

})();