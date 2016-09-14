(() => {
    "use strict";

    process.env.NODE_ENV = 'test';

    let chai = require('chai');
    let chaiHttp = require('chai-http');
    let User = require('../models/user');
    let server = require('../server');
    let shared = require('./shared');
    let should = chai.should();

    chai.use(chaiHttp);

    describe('Users', () => {
        beforeEach((done) => {
            User.remove({}, (err) => {
                done();
            });
        });

        describe('/POST', () => {
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

            it('it should retun password required if password was not', (done) => {});
        });
    });
})();