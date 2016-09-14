(() => {
    "use strict";

    // process.env.NODE_ENV = 'test';

    const config = require('config'),
        assert = require('assert'),
        mongodb = require('mongodb'),
        utils = require('../helpers/utils'),
        request = require('request'),
        shared = require('./shared'),
        MongoClient = mongodb.MongoClient,
        fs = require('fs');

    describe(`Article Resource ${shared.articleResource}/:articleId`, () => {
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
                request.post(`${shared.articleResource}`, {
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

            it(`Should be possible to upload the article main photo and add it in the upload folder`, done => {
                shared.generateUser((err, res, body) => {
                    assert.equal(err, null);
                    let json = JSON.parse(body);
                    let req = request.post(shared.articleResource, (err, res, body) => {
                        MongoClient.connect(config.database, (err, db) => {
                            db.collection('articles').findOne((err, article) => {
                                assert.equal(article.img, `/images/big-boobs-photo-450x299.png`);
                                request(`http://localhost:${config.port}/images/big-boobs-photo-450x299.png`, (err, res, body) => {
                                    assert.equal(res.statusCode, 200, "The uploaded photo was not found!");
                                    done();
                                });
                            });
                        });
                    });
                    let form = req.form();
                    form.append('title', "this is a title");
                    form.append('body', "this is a body");
                    form.append('token', json.token);
                    form.append('img', fs.createReadStream(__dirname + '/big-boobs-photo-450x299.png'));
                });
            });
        });


        describe('Update article', () => {
            it(`Should be able to update the article and receive "${utils.messages.ARTICLE_UPDATE_SUCCESS}"`, done => {
                shared.generateArticle((err, res, body) => {
                    let token = shared.extractTokenFrom(res),
                        json = JSON.parse(body),
                        url = `${shared.articleResource}/${json.article._id}`,
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
                        url = `${shared.articleResource}/${json.article._id}`;
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
                    let token = shared.extractTokenFrom(res);
                    request.delete(`${shared.articleResource}/${json.article._id}`, {
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