(() => {
    "use strict";
    const config = require('../config'),
        mongodb = require('mongodb').MongoClient,
        assert = require('assert'),
        request = require('request'),
        utils = require('../helpers/utils'),
        resource = `http://localhost:${config.port}/api/v1/users`;

    describe('User Routes', () => {
        afterEach(() => {
            mongodb.connect(config.database, (err, db) => {
                db.collection('users').remove({}).then(handleSuccess, handleErrors);

                function handleSuccess(res) {
                    assert.notEqual(err, null);
                }

                function handleErrors(err) {
                    assert.equal(err, null);
                }
            });
        });

        // Create user tests
        describe('Create user', () => {
            it('Should create a user if email and password provided', (done) => {
                request.post(resource, {
                    form: {
                        email: 'alxolr@gmail.com',
                        password: 'test'
                    }
                }, (err, res, body) => {
                    assert.equal(err, null);
                    let objectBody = JSON.parse(body);
                    assert.equal(objectBody.success, true);
                    assert.equal(objectBody.message, utils.messages.USER_CREATED_SUCCESS);
                    done();
                });
            });
        });

        // Login User Tests
        describe('Login user', () => {
            it(`Should return "${utils.messages.EMAIL_NO_MATCH}" for invalid email login.`, (done) => {
                request.post(resource + '/login', {
                    form: {
                        email: 'johny@bravo.com',
                        password: '1'
                    }
                }, (err, res, body) => {
                    assert.equal(err, null);
                    let result = JSON.parse(body);
                    assert.equal(result.success, false);
                    assert.equal(result.message, utils.messages.EMAIL_NO_MATCH);
                    done();
                });
            });

            it(`Should return "${utils.messages.PASSWORD_NO_MATCH}" given an invalid password for login`, (done) => {
                request.post(resource, {
                    form: {
                        email: 'johny@bravo.com',
                        password: '1'
                    }
                }, (err, res, body) => {
                    request.post(`${resource}/login`, {
                        form: {
                            email: 'johny@bravo.com',
                            password: 'test'
                        }
                    }, (err, res, body) => {
                        let result = JSON.parse(body);

                        assert.equal(err, null);
                        assert.equal(result.message, utils.messages.PASSWORD_NO_MATCH);
                        done();
                    });
                });
            });


            it('Should return a "token" when the login is succesful', (done) => {
                request.post(resource, {
                    form: {
                        email: 'dony@trouble.com',
                        password: '123'
                    }
                }, (err, result, body) => {
                    assert.equal(err, null);
                    request.post(resource + '/login', {
                        form: {
                            email: 'dony@trouble.com',
                            password: '123'
                        }
                    }, (err, res, body) => {
                        let result = JSON.parse(body);
                        assert.equal(typeof result.token, 'string');
                        done();
                    });
                });

            });
        });
    });
})();