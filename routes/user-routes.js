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

    router.post('/login', (req, res) => {
        let email = req.body.email,
            password = req.body.password;

        User.findOne({
            email: email
        }, (err, user) => {
            if (err) {
                res.json({
                    success: false,
                    error: utils.listifyErrors(err)
                });
            } else {
                if (user) {
                    let hash = crypto.createHash('sha256'),
                        providedEncryptedPassword = hash.update(password).digest('hex');

                    if (user.password === providedEncryptedPassword) {
                        let token = jwt.sign(user, config.secretKey, {
                            expiresIn: 60
                        });

                        res.json({
                            success: true,
                            user: user,
                            token: token,
                            message: "The user was successfully logged in"
                        });
                    } else {
                        res.json({
                            success: false,
                            message: "The provided password does not match existing one"
                        });
                    }
                } else {
                    res.json({
                        sucess: false,
                        message: "The provided email was not found in the system."
                    });
                }
            }
        });
    });

    module.exports = router;
})();