(() => {
    "use strict";

    const router = require('express').Router(),
        User = require('../models/user'),
        assert = require('assert'),
        config = require('../config'),
        utils = require('../helpers/utils'),
        crypto = require('crypto'),
        jwt = require('jsonwebtoken');

    router.post('/', (req, res) => {
        let user = new User(req.body);
        user.save((err) => {
            if (err) {
                if (err.hasOwnProperty('code') && err.code === utils.mongo.UNIQUE_KEY_VIOLATION) {
                    res.json({
                        success: false,
                        message: "User already registered in the system."
                    });
                } else {
                    res.json({
                        success: false,
                        message: utils.listifyErrors(err)
                    });
                }
            } else {
                let jwt = require('jsonwebtoken'),
                    token = jwt.sign(user, config.secretKey, {
                        expiresIn: 60
                    });
                res.json({
                    success: true,
                    message: "User was successfully created.",
                    user: user,
                    token: token
                });
            }
        });
    });

    router.put('/:id', (req, res) => {
        
        if (req.body['password'] !== undefined) {
            let hash = crypto.createHash('sha256');
            req.body.password = hash.update(req.body.password).digest('hex');  
        }

        User.update({
            _id: req.params.id
        }, {'$set': req.body}).then(handleSuccess, handleErrors);

        function handleSuccess(result) {
            User.findOne({
                _id: req.params.id
            }).then(generateToken, throwErrors);

            function generateToken(user) {
                generateTokenForUser(user, res, "The user was successfully updated");
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

    router.post('/login', (req, res) => {
        let email = req.body.email,
            password = req.body.password;

        User.findOne({
            email: email
        }).then(handleSuccess, handleErrors)

        function handleSuccess(user) {
            if (user) {
                let hash = crypto.createHash('sha256'),
                    providedEncryptedPassword = hash.update(password).digest('hex');

                if (user.password === providedEncryptedPassword) {
                    generateTokenForUser(user, res, "The user was successfully logged in.")
                } else {
                    res.json({
                        success: false,
                        message: "The provided password does not match."
                    });
                }
            } else {
                res.json({
                    sucess: false,
                    message: "The provided email was not found in the system."
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