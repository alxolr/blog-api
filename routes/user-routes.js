(() => {
    "use strict";

    const router = require('express').Router(),
        User = require('../models/user'),
        assert = require('assert'),
        config = require('../config'),
        utils = require('../helpers/utils');


    router.post('/', (req, res) => {
        let user = new User(req.body);

        user.save((err) => {
            if (err) {
                res.json({
                    success: false,
                    errors: utils.listifyErrors(err)
                });
            } else {
                let jwt = require('jsonwebtoken'),
                    token = jwt.sign(user, config.secretKey, {
                        expiresIn: 60
                    });

                res.json({
                    success: true,
                    message: "User was successfully created",
                    user: user,
                    token: token
                });

            }
        });

    });

    module.exports = router;
})();