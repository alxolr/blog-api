(() => {
    "use strict";
    const config = require('../config'),
        assert = require('assert'),
        mongodb = require('mongodb'),
        utils = require('../helpers/utils'),
        request = require('request'),
        shared = require('./shared'),
        MongoClient = mongodb.MongoClient;

    describe('Article Routes', () => {
        const resource = `http://localhost:${config.port}/api/v1/users`;

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
                shared.generateUser((err, res, body) => {
                    let json = JSON.parse(body);
                    request.post(`${resource}/${json.user._id}/articles`, {
                        form: shared.article
                    }, (err, res, body) => {
                        shared.assertOk(err, body, false, utils.messages.TOKEN_NOT_PROVIDED, done);
                    });
                });
            });

            it(`Should return "${utils.messages.ARTICLE_CREATE_SUCCESS}" when providing all needed article data`, done => {

                shared.generateArticle((err, res, body) => {
                    assert.equal(err, null);
                    MongoClient.connect(config.database, (err, db) => {
                        assert.equal(err, null);
                        db.collection('articles').findOne((err, article) => {
                            assert.equal(err, null);
                            assert.equal(article.title, shared.article.title);
                            assert.equal(article.body, shared.article.body);

                            shared.assertOk(err, body, true, utils.messages.ARTICLE_CREATE_SUCCESS, done);
                        });
                    });
                });

            });
        });
    });

})();