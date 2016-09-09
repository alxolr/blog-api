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
                            token: token,
                            comment: shared.comment
                        }
                    }, (err, res, body) => {
                        assert.equal(err, null);
                        MongoClient.connect(config.database, (err, db) => {
                            assert.equal(err, null);
                            db.collection('articles').findOne((err, article) => {
                                assert.equal(err, null);
                                assert.equal(article.comments.length, 1);
                                shared.assertOk(err, body, true, utils.messages.COMMENT_CREATE_SUCCESS, done);
                            });
                        });
                    });

                });
            });
        });
    });

})();