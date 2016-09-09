(() => {
    "use strict";
    const assert = require('assert'),
        shared = require('./shared'),
        utils = require('../helpers/utils'),
        MongoClient = require('mongodb').MongoClient,
        config = require('../config'),
        request = require('request');

    describe('Comment Routes', () => {
        before(() => {
            shared.cleanupCollection('articles');
        });

        afterEach(() => {
            shared.cleanupCollection('articles');
        });

        describe('Create a comment', () => {
            it(`Should return '${utils.messages.TOKEN_NOT_PROVIDED}' when creating an article without token`, done => {
                shared.generateArticle((err, res, body) => {
                    assert.equal(err, null);
                    let json = JSON.parse(body),
                        url = `${shared.articleResource}/${json.article._id}/comments`,
                        token = shared.extractTokenFrom(res);

                    request.post(url, {
                        form: {
                            comment: shared.comment
                        }
                    }, (err, res, body) => {
                        shared.assertOk(err, body, false, utils.messages.TOKEN_NOT_PROVIDED, done);
                    });
                });
            });
        });
    });

})();