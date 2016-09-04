(() => {
    "use strict";
    const config = require('../config'),
        mongodb = require('mongodb'),
        assert = require('assert'),
        request = require('request');

    let user = {
        email: "dummyuser@mail.com",
        password: "dummypassword"
    };

    let article = {
        title: "Angular 2, be part of the future.",
        body: `
            This article seems very interesting, from the perspective of a new user,
            here you will find how to start codding an angular 2 application.
        `
    };

    /**
     * Remove all documents from the specified collection
     */
    exports.cleanupCollection = (collection) => {
        mongodb.connect(config.database, (err, db) => {
            db.collection(collection).remove({}).then(handleSuccess, handleErrors);

            function handleSuccess(res) {
                assert.notEqual(err, null);
            }

            function handleErrors(err) {
                assert.equal(err, null);
            }
        });
    };

    /** 
     * Assert if the result is ok, and then pass the callback
     */
    exports.assertOk = (err, body, isSuccess, message, next) => {
        assert.equal(err, null);

        let json = JSON.parse(body);
        assert.equal(json.success, isSuccess);
        assert.equal(json.message, message);
        next();
    };

    /**
     * Create a user and then use the results in cb function
     */
    exports.generateUser = (callback) => {
        let url = `http://localhost:${config.port}/api/v1/users`;
        request.post(url, {
            form: user
        }, callback);
    };

    /**
     * Create a new article in the database
     */
    exports.generateArticle = (callback) => {
        this.generateUser((err, result, body) => {
            assert.equal(err, null);
            let json = JSON.parse(body),
            token = json.token,
            url = `http://localhost:${config.port}/api/v1/articles`;
            request.post(url, {
                form: {
                    token: token,
                    title: article.title,
                    body: article.body
                }
            }, callback);
        });
    };

    exports.user = user;
    exports.article = article;

})();