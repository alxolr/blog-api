(() => {
    "use strict";
    const config = require('../config'),
        mongodb = require('mongodb').MongoClient,
        assert = require('assert'),
        request = require('request'),
        utils = require('../helpers/utils'),
        resource = `http://localhost:${config.port}/api/v1/users`;

    describe('User Routes', () => {
        const cleanupDb = () => {
            mongodb.connect(config.database, (err, db) => {
                db.collection('users').remove({}).then(handleSuccess, handleErrors);

                function handleSuccess(res) {
                    assert.notEqual(err, null);
                }

                function handleErrors(err) {
                    assert.equal(err, null);
                }
            });
        };

        beforeEach(() => {
            cleanupDb();
        });

        after(() => {
            cleanupDb();
        });

        const user = {
            email: "dummy@user.com",
            password: "dummypass"
        };

        const assertOk = (err, body, isSuccess, message, next) => {
            assert.equal(err, null);

            let json = JSON.parse(body);
            assert.equal(json.success, isSuccess);
            assert.equal(json.message, message);
            next();
        };

        const generateUser = (cb) => {
            request.post(resource, {
                form: user
            }, cb);
        };


        // Create user tests
        describe('Create user', () => {
            it('Should create a user if email and password provided', (done) => {
                generateUser((err, res, body) => {
                    assertOk(err, body, true, utils.messages.USER_CREATED_SUCCESS, done);
                });
            });
        });

        // Login User Tests
        describe('Login user', () => {
            let url = `${resource}/login`;
            it(`Should return "${utils.messages.EMAIL_NO_MATCH}" for invalid email login.`, (done) => {
                request.post(url, {
                    form: user
                }, (err, res, body) => {
                    assertOk(err, body, false, utils.messages.EMAIL_NO_MATCH, done);
                });
            });

            it(`Should return "${utils.messages.PASSWORD_NO_MATCH}" given an invalid password for login`, (done) => {
                generateUser((err, res, body) => {
                    assert.equal(err, null);
                    request.post(url, {
                        form: {
                            email: user.email,
                            password: '1'
                        }
                    }, (err, res, body) => {
                        assertOk(err, body, false, utils.messages.PASSWORD_NO_MATCH, done);
                    });
                });
            });

            it('Should return a "token" when the login is succesful', (done) => {
                generateUser((err, res, body) => {
                    assert.equal(err, null);
                    request.post(url, {
                        form: user
                    }, (err, res, body) => {
                        let result = JSON.parse(body);
                        assert.equal(typeof result.token, 'string');
                        done();
                    });
                });
            });
        });

        describe('Update User', () => {
            it(`Should return "${utils.messages.TOKEN_NOT_PROVIDED}" when updating user without token`, (done) => {
                generateUser((err, res, body) => {
                    assert.equal(err, null);
                    let result = JSON.parse(body),
                        token = result.token,
                        userId = result.user._id;
                    request.put(`${resource}/${userId}`, {
                        form: {
                            email: 'jack@bravo.com'
                        }
                    }, (err, res, body) => {
                        assertOk(err, body, false, utils.messages.TOKEN_NOT_PROVIDED, done);
                    });
                });
            });

            it(`Should return "${utils.messages.USER_UPDATED_SUCCESS}" for valid data and token provided`, (done) => {
                generateUser((err, res, body) => {
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
            it(`Should return "${utils.messages.TOKEN_NOT_PROVIDED}" when token not provided`, done => {
                //create a user
                generateUser((err, res, body) => {
                    assert.equal(err, null);
                    let json = JSON.parse(body),
                        userId = json.user._id;

                    //get the created user without token
                    request.get(`${resource}/${userId}`, (err, res, body) => {
                        assertOk(err, body, false, utils.messages.TOKEN_NOT_PROVIDED, done);
                    });
                });
            });

            it(`Should return the requested user given the valid token and userId`, done => {
                //create a user
                generateUser((err, res, body) => {
                    assert.equal(err, null);
                    let json = JSON.parse(body),
                        userId = json.user._id,
                        token = json.token;

                    //get the created user without token
                    request.get(`${resource}/${userId}`, {
                        form: {
                            token: token
                        }
                    }, (err, res, body) => {
                        let json = JSON.parse(body);
                        assert.equal(json.user._id, userId);
                        assertOk(err, body, true, undefined, done);
                    });
                });
            });

            it(`Should return "${utils.messages.MONGOID_INVALID}" given an invalid User id`, done => {
                generateUser((err, res, body) => {
                    assert.equal(err, null);

                    let json = JSON.parse(body);
                    request(`${resource}/1`, {
                        form: {
                            token: json.token
                        }
                    }, (err, res, body) => {
                        assertOk(err, body, false, utils.messages.MONGOID_INVALID, done);
                    });
                });
            });
        });
    });
})();