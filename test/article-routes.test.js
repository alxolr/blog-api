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
        const resource = `http://localhost:${config.port}/api/v1/articles`;

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
                request.post(`${resource}`, {
                    form: shared.article
                }, (err, res, body) => {
                    shared.assertOk(err, body, false, utils.messages.TOKEN_NOT_PROVIDED, done);
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

            it(`Should return the newly created article`, done => {
                shared.generateArticle((err, res, body) => {
                    let json = JSON.parse(body);
                    assert.equal(Object.prototype.hasOwnProperty.call(json, 'article'), true);
                    assert.equal(Object.prototype.hasOwnProperty.call(json.article, '_id'), true);
                    shared.assertOk(err, body, true, utils.messages.ARTICLE_CREATE_SUCCESS, done);
                });
            });
        });


        describe('Update article', () => {
            it(`Should be able to update the article and receive "${utils.messages.ARTICLE_UPDATE_SUCCESS}"`, done => {
                shared.generateArticle((err, res, body) => {
                    let token = res.request.body.split('&').filter((item) => {
                            return item.indexOf('token') !== -1;
                        })[0].replace('token=', ''),
                        json = JSON.parse(body),
                        url = `${resource}/${json.article._id}`,
                        title = 'the article is successfully updated';
                    request.put(url, {
                        form: {
                            token: token,
                            title: title
                        }
                    }, (err, res, body) => {
                        assert.equal(err, null);
                        let json = JSON.parse(body);
                        assert.equal(json.article.title, title);
                        shared.assertOk(err, body, true, utils.messages.ARTICLE_UPDATE_SUCCESS, done);
                    });
                });
            });
        });

        describe('Get article', () => {
            it(`Should return the required article by Id`, done => {
                shared.generateArticle((err, res, body) => {
                    let json = JSON.parse(body),
                        url = `${resource}/${json.article._id}`;

                    request.get(url, (err, res, body) => {
                        assert.equal(err, null);
                        let json = JSON.parse(body);
                        assert.equal(Object.prototype.hasOwnProperty.call(json, 'article'), true);
                        done();
                    });
                });
            });
        });

        describe('Delete Article', () => {
            it(`Should remove the article and return "${utils.messages.ARTICLE_DELETE_SUCCESS}"`, done => {
                shared.generateArticle((err, res, body) => {
                    assert.equal(err, null);
                    let json = JSON.parse(body);
                    let token = res.request.body.split('&').filter((item) => {
                        return item.indexOf('token') !== -1;
                    })[0].replace('token=', '');

                    request.delete(`${resource}/${json.article._id}`, {
                        form: {
                            token: token
                        }
                    }, (err, res, body) => {
                        shared.assertOk(err, body, true, utils.messages.ARTICLE_DELETE_SUCCESS, done);
                    });

                });
            });
        });
    });
})();