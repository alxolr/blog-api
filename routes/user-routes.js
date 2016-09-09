(() => {
    "use strict";

    const router = require('express').Router(),
        User = require('../models/user'),
        config = require('../config'),
        ObjectId = require('mongoose').Types.ObjectId,
        utils = require('../helpers/utils'),
        security = require('../modules/security')(config),
        jwt = require('jsonwebtoken'),
        middlewares = require('../middlewares/middlewares'),
        articleRoutes = require('./article-routes');

    router.post('/', (req, res) => {
        let user = new User(req.body);
        user.save((err) => {
            if (err) {
                if (err.hasOwnProperty('code') && err.code === utils.mongo.UNIQUE_KEY_VIOLATION) {
                    res.json({
                        success: false,
                        message: utils.messages.USER_DUPLICATE
                    });
                } else {
                    res.json({
                        success: false,
                        message: utils.listifyErrors(err)
                    });
                }
            } else {
                generateTokenForUser(user, res, utils.messages.USER_CREATED_SUCCESS);
            }
        });
    });

    router.post('/login', (req, res) => {
        let email = req.body.email,
            password = req.body.password;

        User.findOne({
            email: email
        }).then(handleSuccess, handleErrors);

        function handleSuccess(user) {
            if (user) {
                let providedEncryptedPassword = security.hashify(password);

                if (user.password === providedEncryptedPassword) {
                    generateTokenForUser(user, res, utils.messages.USER_LOGGEDIN_SUCCESS);
                } else {
                    res.json({
                        success: false,
                        message: utils.messages.PASSWORD_NO_MATCH
                    });
                }
            } else {
                res.json({
                    success: false,
                    message: utils.messages.EMAIL_NO_MATCH
                });
            }

        }

        function handleErrors(err) {
            res.json({
                success: false,
                error: utils.listifyErrors(err)
            });

        }
    });


    router.route('/:userId')
        .all(middlewares.isValidParameters, middlewares.isAuthenticated, middlewares.isAllowedOperation)
        .put((req, res) => {

            if (req.body.password !== undefined) {
                req.body.password = security.hashify(req.body.password);
            }

            User.update({
                _id: req.params.userId
            }, {
                '$set': req.body
            }).then(handleSuccess, handleErrors);

            function handleSuccess(result) {
                User.findOne({
                    _id: req.params.userId
                }).then(generateToken, handleErrors);

                function generateToken(user) {
                    generateTokenForUser(user, res, utils.messages.USER_UPDATED_SUCCESS);
                }
            }
        })
        .get((req, res) => {
            User.findOne({
                _id: req.params.userId
            }).then(handleSuccess, handleErrors);

            function handleSuccess(user) {
                if (user) {
                    return res.json({
                        success: true,
                        user: user
                    });
                } else {
                    return res.status(404).json({
                        success: false,
                        message: utils.messages.USER_NOT_FOUND
                    });
                }
            }
        })
        .delete(/* middlewares.isAllowedOperation, */ (req, res) => {
            User.remove({
                _id: req.params.userId
            }).then(handleSuccess, handleErrors);

            function handleSuccess(result) {
                return res.json({
                    success: true,
                    message: utils.messages.USER_DELETED_SUCCESS
                });
            }
        });

    function generateTokenForUser(user, res, message) {
        let token = jwt.sign(user, config.secretKey, {
            expiresIn: 36000
        });

        return res.json({
            success: true,
            user: user,
            token: token,
            message: message
        });
    }

    function handleErrors(err) {
        //res will be taken from local scope
        res.json({
            success: false,
            message: utils.listifyErrors(err)
        });
    }

    module.exports = router;
})();