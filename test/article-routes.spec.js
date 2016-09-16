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
                done();
            });
        });

        describe('[POST] /api/v1/articles', () => {
            it('', (done) => {
                done();
            });
        });
    });
})();