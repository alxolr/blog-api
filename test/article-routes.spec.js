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
    let utils = require('../helpers/utils');
    let fs = require('fs');

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
                shared.loginUser((err, user, token) => {
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
                let photo = 'big-boobs-photo-450x299.png';
                shared.loginUser((err, user, token) => {
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

    });
})();