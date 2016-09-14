(() => {
    "use strict";
    // process.env.NODE_ENV = 'test';

    const assert = require('assert'),
        shared = require('./shared'),
        utils = require('../helpers/utils'),
        MongoClient = require('mongodb').MongoClient,
        config = require('config'),
        request = require('request');

    describe(`Comment Routes ${shared.articleResource}/:articleId/comments/:commentId`, () => {
        before(() => {
            shared.cleanupCollection('articles');
            shared.cleanupCollection('users');
        });

        afterEach(() => {
            shared.cleanupCollection('users');
            shared.cleanupCollection('articles');
        });

        describe('Create a comment', () => {

            it(`Should return '${utils.messages.TOKEN_NOT_PROVIDED}' when creating an article without token`, done => {
                shared.generateArticle((err, res, body) => {
                    assert.equal(err, null);
                    let json = JSON.parse(body),
                        url = `${shared.articleResource}/${json.article._id}/comments`;
                    request.post(url, {
                        form: {
                            comment: shared.comment
                        }
                    }, (err, res, body) => {
                        shared.assertOk(err, body, false, utils.messages.TOKEN_NOT_PROVIDED, done);
                    });
                });
            });

            it(`Should return '${utils.messages.COMMENT_CREATE_SUCCESS}' when adding a comment to an article`, done => {
                shared.generateArticle((err, res, body) => {
                    assert.equal(err, null);
                    let json = JSON.parse(body),
                        articleId = json.article._id,
                        url = `${shared.articleResource}/${articleId}/comments`,
                        token = shared.extractTokenFrom(res);
                    request.post(url, {
                        form: {
                            token: token,
                            message: shared.comment.message
                        }
                    }, (err, res, body) => {
                        assert.equal(err, null);
                        MongoClient.connect(config.database, (err, db) => {
                            db.collection('articles').findOne((err, article) => {
                                assert.equal(err, null);
                                assert.equal(article.comments.length, 1);
                                assert.equal(article.comments[0].message, shared.comment.message);
                                assert.equal(article.comments[0].author.name, shared.user.name);
                                assert.equal(article.comments[0].author.surname, shared.user.surname);
                                done();
                            });
                        });
                    });
                });
            });
        });
    });

})();