(() => {
    "use strict";
    const config = require('../config'),
        mongodb = require('mongodb'),
        assert = require('assert'),
        request = require('request');

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
            form: {
                email: "dummyuser1@mail.com",
                password: "dummypassword"
            }
        }, callback);
    };

})();