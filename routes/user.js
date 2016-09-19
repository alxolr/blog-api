(() => {
    "use strict";

    let router = require('express').Router(),
        User = require('../models/user'),
        config = require('config'),
        ObjectId = require('mongoose').Types.ObjectId,
        utils = require('../services/utils'),
        security = require('../services/security')(config),
        jwt = require('jsonwebtoken'),
        middlewares = require('../middlewares/middlewares');

    router.post('/', (req, res) => {
        let user = new User(req.body);
        user.save((err) => {
            if (err) {
                if (err.hasOwnProperty('code') && err.code === utils.mongo.UNIQUE_KEY_VIOLATION) {
                    res.status(400).json({
                        error: utils.messages.USER_DUPLICATE
                    });
                } else {
                    res.status(400).json({
                        error: utils.listifyErrors(err)
                    });
                }
            } else {
                generateTokenForUser(user, res);
            }
        });
    });

    router.post('/login', (req, res) => {
        let email = req.body.email,
            password = req.body.password;

        User.findOne({
            email: email,
            deleted_at: {
                "$exists": false
            }
        }, {
            passoword: 0
        }).then(handleSuccess, handleUserNotFound);

        function handleUserNotFound(err) {
            res.status(403).json({
                error: utils.messages.INVALID_CREDENTIALS
            });
        }

        function handleSuccess(user) {
            if (user) {
                let providedEncryptedPassword = security.hashify(password);

                if (user.password === providedEncryptedPassword) {
                    generateTokenForUser(user, res, utils.messages.USER_LOGGEDIN_SUCCESS);
                } else {
                    res.status(403).json({
                        error: utils.messages.INVALID_CREDENTIALS
                    });
                }
            } else {
                res.status(403).json({
                    error: utils.messages.INVALID_CREDENTIALS
                });
            }
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
            }, {
                password: 0
            }).then(handleSuccess, handleErrors);

            function handleSuccess(user) {
                if (user) {
                    return res.json(user);
                } else {
                    return res.status(404).json({
                        error: utils.messages.USER_NOT_FOUND
                    });
                }
            }
        })
        .delete((req, res) => {
            User.update({
                _id: req.params.userId
            }, {
                "$set": {
                    deleted_at: new Date()
                }
            }).then(result => res.status(204).end(), handleErrors);
        });

    function generateTokenForUser(user, res) {
        delete user.password;
        let token = jwt.sign(user, config.secretKey, {
            expiresIn: 36000
        });

        return res.json({
            user: user,
            token: token,
        });
    }

    function handleErrors(err) {
        res.json({
            error: utils.listifyErrors(err)
        });
    }

    module.exports = router;
})();