(() => {
    "use strict";

    process.env.NODE_ENV = 'test';

    let chai = require('chai');
    let chaiHttp = require('chai-http');
    let Article = require('../models/article');
    let User = require('../models/user');
    let server = require('../server');
    let shared = require('./shared');
    let should = chai.should();
    let utils = require('../services/utils');
    let fs = require('fs');
    let photo = 'big-boobs-photo-450x299.png';


    chai.use(chaiHttp);

    describe('Articles', () => {
        beforeEach((done) => {
            Article.remove({}, (err) => {
                User.remove({}, (err) => {
                    done();
                });
            });
        });

        describe('[POST] /api/v1/articles', () => {
            it('should not be able to create article without token', (done) => {
                chai.request(server)
                    .post('/api/v1/articles')
                    .send({
                        title: shared.article.title,
                        body: shared.article.body,
                    }).end((err, res) => {
                        res.status.should.be.eql(403);
                        res.body.should.have.property('message').eql(utils.messages.TOKEN_NOT_PROVIDED);
                        done();
                    });
            });

            it('should create the article if token provided', (done) => {
                shared.createUser(shared.user, (err, user, token) => {
                    chai.request(server)
                        .post('/api/v1/articles')
                        .send({
                            title: shared.article.title,
                            body: shared.article.body,
                            token: token
                        }).end((err, res) => {
                            res.status.should.be.eql(200);
                            res.body.should.have.property('article');
                            res.body.article.should.have.property('author');
                            res.body.should.have.property('message').eql(utils.messages.ARTICLE_CREATE_SUCCESS);
                            done();
                        });
                });
            });

            it('should be able to upload the article main photo and the photo should be accessible', (done) => {
                shared.createUser(shared.user, (err, user, token) => {
                    chai.request(server)
                        .post('/api/v1/articles')
                        .set('Content-Type', 'multipart/form-data')
                        .field('title', shared.article.title)
                        .field('body', shared.article.body)
                        .field('token', token)
                        .attach('img', fs.createReadStream(__dirname + `/${photo}`), photo)
                        .end((err, res) => {
                            res.status.should.be.eql(200);
                            res.body.should.have.property('article');
                            res.body.article.should.have.property('img').eql(`/images/${photo}`);
                            chai.request(server)
                                .get(`/images/${photo}`)
                                .end((err, res) => {
                                    res.status.should.be.eql(200);
                                    done();
                                });
                        });
                });
            });

        });

        describe('[PUT] /api/v1/articles/:articleId', () => {
            it('should not allow article modification without token', (done) => {
                let article = new Article(shared.article);
                article.save((err, article) => {
                    chai.request(server)
                        .put('/api/v1/articles/1')
                        .send({})
                        .end((err, res) => {
                            res.status.should.be.eql(403);
                            res.body.message.should.be.eql(utils.messages.TOKEN_NOT_PROVIDED);
                            done();
                        });
                });
            });

            it('should allow article modifications for the article author', (done) => {
                shared.createArticle(shared.user, shared.article, (err, article, token) => {
                    chai.request(server)
                        .put('/api/v1/articles/' + article._id)
                        .send({
                            token: token,
                            title: "New title for the article"
                        }).end((err, res) => {
                            res.status.should.be.eql(200);
                            res.body.should.have.property('article');
                            res.body.article.should.have.property('title').eql("New title for the article");
                            done();
                        });
                });
            });

            it('should not allow article edit for users others than author', (done) => {
                shared.createArticle(shared.user, shared.article, (err, article, token) => {
                    shared.createUser({
                        email: "other@user.com",
                        password: "interesting"
                    }, (err, user, token) => {
                        chai.request(server)
                            .put('/api/v1/articles/' + article._id)
                            .send({
                                token: token,
                                title: "Should not be possible"
                            }).end((err, res) => {
                                res.status.should.be.eql(403);
                                res.body.message.should.be.eql(utils.messages.TOKEN_HIGHJACKED);
                                res.body.should.not.have.property('article');
                                done();
                            });
                    });
                });
            });

            it('should allow article modification for the ADMIN user rights', (done) => {
                shared.createArticle(shared.user, shared.article, (err, article, token) => {
                    shared.createUser(shared.admin, (err, admin, token) => {
                        chai.request(server)
                            .put('/api/v1/articles/' + article._id)
                            .send({
                                token: token,
                                title: "Modified by admin",
                            }).end((err, res) => {
                                res.status.should.be.eql(200);
                                res.body.article.title.should.be.eql('Modified by admin');
                                done();
                            });
                    });
                });
            });

            it('should allow the image modification and upload of a new photo', (done) => {
                shared.createArticle(shared.user, shared.article, (err, article, token) => {
                    chai.request(server)
                        .put('/api/v1/articles/' + article._id)
                        .set('Content-Type', 'multipart/form-data')
                        .field('token', token)
                        .attach('img', fs.createReadStream(__dirname + `/${photo}`), photo)
                        .end((err, res) => {
                            res.status.should.be.eql(200);
                            res.body.should.have.property('article');
                            res.body.article.img.should.be.eql('/images/' + photo);
                            done();
                        });
                });
            });
        });

    });
})();