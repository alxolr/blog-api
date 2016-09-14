(() => {
    "use strict";

    process.env.NODE_ENV = 'test';

    let chai = require('chai');
    let chaiHttp = require('chai-http');
    let User = require('../models/user');
    let server = require('../server');
    let shared = require('./shared');
    let should = chai.should();
    let utils = require('../helpers/utils');

    chai.use(chaiHttp);

    describe('Users', () => {
        beforeEach((done) => {
            User.remove({}, (err) => {
                done();
            });
        });

        describe('[POST] /api/v1/users', () => {
            it('it should create a user if email and password provided', (done) => {
                chai.request(server)
                    .post('/api/v1/users')
                    .send(shared.user)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.have.property('user');
                        res.body.should.have.property('token');
                        res.body.user.name.should.be.eql(shared.user.name);
                        done();
                    });
            });
            it('it should retun password required if not set', (done) => {
                let user = Object.assign({}, shared.user);
                delete user.password;
                chai.request(server)
                    .post('/api/v1/users')
                    .send(user)
                    .end((err, res) => {
                        res.body.success.should.be.eql(false);
                        res.body.message.should.be.a('array');
                        res.body.message[0].property.should.be.eql('password');
                        res.body.message[0].message.should.be.eql(utils.messages.PASSWORD_REQUIRED);
                        res.should.have.status(200);

                        done();
                    });
            });
            it('it should return email required if not set', (done) => {
                let user = Object.assign({}, shared.user);
                delete user.email;
                chai.request(server)
                    .post('/api/v1/users')
                    .send(user)
                    .end((err, res) => {
                        res.body.success.should.be.eql(false);
                        res.body.message.should.be.a('array');
                        res.body.message[0].property.should.be.eql('email');
                        res.body.message[0].message.should.be.eql(utils.messages.EMAIL_REQUIRED);
                        res.should.have.status(200);

                        done();
                    });
            });
        });

        describe('[POST] /api/v1/users/login', () => {
            it('it should return a valid token when valid credentials', (done) => {
                let credentials = Object.assign({}, {
                    email: shared.user.email,
                    password: shared.user.password
                });
                let user = new User(shared.user);
                user.save((err, user) => {
                    chai.request(server)
                        .post('/api/v1/users/login')
                        .send(credentials)
                        .end((err, res) => {
                            res.status.should.be.eql(200);
                            res.body.should.have.property('token');
                            res.body.should.have.property('user');
                            done();
                        });
                });
            });

            it('should return invalid credentials error when email or password is not ok', (done) => {
                let credentials = {
                    email: "dummy1@test.com",
                    password: "qwerty"
                };
                let user = new User(shared.user);
                user.save((err, user) => {
                    chai.request(server)
                        .post('/api/v1/users/login')
                        .send(credentials)
                        .end((err, res) => {
                            res.status.should.be.eql(200);
                            res.body.success.should.be.eql(false);
                            res.body.message.should.be.eql(utils.messages.INVALID_CREDENTIALS);
                            done();
                        });
                });
            });
        });
    });
})();