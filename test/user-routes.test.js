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

        function assertOk(err, body, isSuccess, message, next) {
            assert.equal(err, null);

            let json = JSON.parse(body);
            assert.equal(json.success, isSuccess);
            assert.equal(json.message, message);
            next();
        }

        // Create user tests
        describe('Create user', () => {
            it('Should create a user if email and password provided', (done) => {
                request.post(resource, {
                    form: {
                        email: 'alxolr@gmail.com',
                        password: 'test'
                    }
                }, (err, res, body) => {
                    assertOk(err, body, true, utils.messages.USER_CREATED_SUCCESS, done);
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
                    assertOk(err, body, false, utils.messages.EMAIL_NO_MATCH, done);
                });
            });

            it(`Should return "${utils.messages.PASSWORD_NO_MATCH}" given an invalid password for login`, (done) => {
                request.post(resource, {
                    form: {
                        email: 'johny@bravo.com',
                        password: '1'
                    }
                }, (err, res, body) => {
                    assert.equal(err, null);
                    request.post(`${resource}/login`, {
                        form: {
                            email: 'johny@bravo.com',
                            password: 'test'
                        }
                    }, (err, res, body) => {
                        assertOk(err, body, false, utils.messages.PASSWORD_NO_MATCH, done);
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

        describe('Update User', () => {
            it(`Should return "${utils.messages.INVALID_TOKEN}" when updating user without token`, (done) => {
                //create a user
                request.post(resource, {
                    form: {
                        email: 'johny@bravo.com',
                        password: '1'
                    }
                }, (err, res, body) => {
                    assert.equal(err, null);
                    let result = JSON.parse(body),
                        token = result.token,
                        userId = '' + result.user._id;
                    request.put(`${resource}/${userId}`, {
                        form: {
                            email: 'jack@bravo.com'
                        }
                    }, (err, res, body) => {
                        assertOk(err, body, false, utils.messages.INVALID_TOKEN, done);
                    });
                });
            });

            it(`Should return "${utils.messages.USER_UPDATED_SUCCESS}" for valid data and token provided`, (done) => {
                request.post(resource, {
                    form: {
                        email: 'johny@bravo.com',
                        password: '1'
                    }
                }, (err, res, body) => {
                    assert.equal(err, null);
                    let result = JSON.parse(body),
                        token = result.token,
                        userId = '' + result.user._id;
                    request.put(`${resource}/${userId}`, {
                        form: {
                            email: 'jack@bravo.com',
                            token: token
                        }
                    }, (err, res, body) => {
                        assertOk(err, body, true, utils.messages.USER_UPDATED_SUCCESS, done);
                    });
                });
            });
        });

        describe('Get User', () => {
            it(`Should return ${utils.messages.INVALID_TOKEN} when token not provided`, done => {
                //create a user
                request.post(resource, {
                    form: {
                        email: "domy@jigly.com",
                        password: 'domy1'
                    }
                }, (err, res, body) => {
                    assert.equal(err, null);
                    let json = JSON.parse(body),
                        userId = json.user._id;

                    //get the created user without token
                    request.get(`${resource}/${userId}`, (err, res, body) => {
                        assertOk(err, body, false, utils.messages.INVALID_TOKEN, done);
                    });
                });
            });
        });
    });
})();