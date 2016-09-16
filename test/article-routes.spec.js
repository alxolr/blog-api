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
        });

    });
})();