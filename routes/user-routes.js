(() => {
    "use strict";

    const router = require('express').Router(),
        User = require('../models/user'),
        assert = require('assert'),
        config = require('../config'),
        utils = require('../helpers/utils'),
        security = require('../modules/security')(config),
        jwt = require('jsonwebtoken'),
        middlewares = require('../middlewares/middlewares');

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

    router.put('/:id', middlewares.isAuthenticated, (req, res) => {

        if (req.body.password !== undefined) {
            req.body.password = security.hashify(req.body.password);
        }

        User.update({
            _id: req.params.id
        }, {
            '$set': req.body
        }).then(handleSuccess, handleErrors);

        function handleSuccess(result) {
            User.findOne({
                _id: req.params.id
            }).then(generateToken, throwErrors);

            function generateToken(user) {
                generateTokenForUser(user, res, utils.messages.USER_UPDATED_SUCCESS);
            }

            function throwErrors(err) {
                res.json({
                    success: false,
                    message: utils.listifyErrors(err)
                });
            }
        }

        function handleErrors(err) {
            res.json({
                success: false,
                message: utils.listifyErrors(err)
            });
        }
    });

    router.get('/:id', middlewares.isAuthenticated, (req, res) => {
        User.findOne({
            _id: req.params.id
        }).then(handleSuccess, handleErrors);

        function handleSuccess(user) {
            if (user) {
                res.json({
                    success: true,
                    user: user
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: utils.messages.USER_NOT_FOUND
                });
            }
        }

        function handleErrors(err) {
            res.json({
                success: false,
                message: utils.listifyErrors(err)
            });
        }
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

    function generateTokenForUser(user, res, message) {
        let token = jwt.sign(user, config.secretKey, {
            expiresIn: 60
        });

        res.json({
            success: true,
            user: user,
            token: token,
            message: message
        });
    }

    module.exports = router;
})();