(() => {
    "use strict";
    const config = require('../configs/test'),
        mongodb = require('mongodb').MongoClient,
        assert = require('assert'),
        request = require('request'),
        utils = require('../helpers/utils'),
        shared = require('./shared');

    describe(`User resource ${shared.userResource}/:userId`, () => {

        afterEach(() => {
            shared.cleanupCollection('users');
        });

        before(() => {
            shared.cleanupCollection('users');
        });

        describe('Create user', () => {
            it('Should create a user if email and password provided', (done) => {
                shared.generateUser((err, res, body) => {
                    shared.assertOk(err, body, true, utils.messages.USER_CREATED_SUCCESS, done);
                });
            });
        });

        describe('Login user', () => {
            let url = `${shared.userResource}/login`;
            it(`Should return "${utils.messages.EMAIL_NO_MATCH}" for invalid email login.`, (done) => {
                request.post(url, {
                    form: shared.user
                }, (err, res, body) => {
                    shared.assertOk(err, body, false, utils.messages.EMAIL_NO_MATCH, done);
                });
            });

            it(`Should return "${utils.messages.PASSWORD_NO_MATCH}" given an invalid password for login`, (done) => {
                shared.generateUser((err, res, body) => {
                    assert.equal(err, null);
                    request.post(url, {
                        form: {
                            email: shared.user.email,
                            password: '1'
                        }
                    }, (err, res, body) => {
                        shared.assertOk(err, body, false, utils.messages.PASSWORD_NO_MATCH, done);
                    });
                });
            });

            it('Should return a "token" when the login is succesful', (done) => {
                shared.generateUser((err, res, body) => {
                    assert.equal(err, null);
                    request.post(url, {
                        form: shared.user
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
                shared.generateUser((err, res, body) => {
                    assert.equal(err, null);
                    let result = JSON.parse(body),
                        token = result.token,
                        userId = result.user._id;
                    request.put(`${shared.userResource}/${userId}`, {
                        form: {
                            email: 'jack@bravo.com'
                        }
                    }, (err, res, body) => {
                        shared.assertOk(err, body, false, utils.messages.TOKEN_NOT_PROVIDED, done);
                    });
                });
            });

            it(`Should return "${utils.messages.USER_UPDATED_SUCCESS}" for valid data and token provided`, (done) => {
                shared.generateUser((err, res, body) => {
                    assert.equal(err, null);
                    let result = JSON.parse(body),
                        token = result.token,
                        userId = '' + result.user._id;
                    request.put(`${shared.userResource}/${userId}`, {
                        form: {
                            email: 'jack@bravo.com',
                            token: token
                        }
                    }, (err, res, body) => {
                        shared.assertOk(err, body, true, utils.messages.USER_UPDATED_SUCCESS, done);
                    });
                });
            });
        });

        describe('Get User', () => {
            it(`Should return "${utils.messages.TOKEN_NOT_PROVIDED}" when token not provided`, done => {
                //create a user
                shared.generateUser((err, res, body) => {
                    assert.equal(err, null);
                    let json = JSON.parse(body),
                        userId = json.user._id;
                    request.get(`${shared.userResource}/${userId}`, (err, res, body) => {
                        shared.assertOk(err, body, false, utils.messages.TOKEN_NOT_PROVIDED, done);
                    });
                });
            });

            it(`Should return the requested user given the valid token and userId`, done => {
                shared.generateUser((err, res, body) => {
                    assert.equal(err, null);
                    let json = JSON.parse(body),
                        userId = json.user._id,
                        token = json.token;
                    request.get(`${shared.userResource}/${userId}`, {
                        form: {
                            token: token
                        }
                    }, (err, res, body) => {
                        let json = JSON.parse(body);
                        assert.equal(json.user._id, userId);
                        shared.assertOk(err, body, true, undefined, done);
                    });
                });
            });

            it(`Should return "${utils.messages.MONGOID_INVALID}" given an invalid User id`, done => {
                shared.generateUser((err, res, body) => {
                    assert.equal(err, null);
                    let json = JSON.parse(body);
                    request(`${shared.userResource}/1`, {
                        form: {
                            token: json.token
                        }
                    }, (err, res, body) => {
                        shared.assertOk(err, body, false, utils.messages.MONGOID_INVALID, done);
                    });
                });
            });
        });

        describe("Delete User", () => {
            it(`Should return "${utils.messages.TOKEN_NOT_PROVIDED}" when trying to delete a user without token`, done => {
                shared.generateUser((err, res, body) => {
                    assert.equal(err, null);
                    let json = JSON.parse(body);
                    request.delete(`${shared.userResource}/${json.user._id}`, (err, res, body) => {
                        shared.assertOk(err, body, false, utils.messages.TOKEN_NOT_PROVIDED, done);
                    });
                });
            });

            it(`Should allow user deletion by the user itself or "admin" and return "${utils.messages.TOKEN_HIGHJACKED}"`, done => {
                shared.generateUser((err, res, body) => {
                    assert.equal(err, null);
                    let json = JSON.parse(body),
                        token1 = json.token;
                    request.post(shared.userResource, {
                        form: {
                            email: "johny@comrada.com",
                            password: "tuition2"
                        }
                    }, (err, res, body) => {
                        assert.equal(err, null);
                        let json = JSON.parse(body);
                        request.delete(`${shared.userResource}/${json.user._id}`, {
                            form: {
                                token: token1
                            }
                        }, (err, res, body) => {
                            shared.assertOk(err, body, false, utils.messages.TOKEN_HIGHJACKED, done);
                        });
                    });
                });
            });

            it(`Should return "${utils.messages.USER_DELETED_SUCCESS}" for the valid user deletion`, done => {
                shared.generateUser((err, res, body) => {
                    assert.equal(err, null);
                    let json = JSON.parse(body);
                    request.delete(`${shared.userResource}/${json.user._id}`, {
                        form: {
                            token: json.token
                        }
                    }, (err, res, body) => {
                        shared.assertOk(err, body, true, utils.messages.USER_DELETED_SUCCESS, done);
                    });
                });
            });
        });
    });
})();