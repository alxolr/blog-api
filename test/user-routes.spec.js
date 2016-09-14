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

        describe('Create User', () => {
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
    });
})();