(() => {
    "use strict";
    let jwt = require('jsonwebtoken'),
        utils = require('../helpers/utils'),
        config = require('config'),
        User = require('../models/user');

    module.exports = {
        isAuthenticated: (req, res, next) => {
            let token = req.query.token || req.body.token || req.headers['x-access-token'];

            if (token) {
                // verifies secret and checks exp
                jwt.verify(token, config.secretKey, function(err, decoded) {
                    if (err) {
                        return res.json({
                            success: false,
                            message: utils.messages.TOKEN_EXPIRED
                        });
                    } else {
                        req.decoded = decoded;
                        next();
                    }
                });

            } else {
                return res.status(403).json({
                    success: false,
                    message: utils.messages.TOKEN_NOT_PROVIDED
                });
            }
        },
        isValidParameters: (req, res, next) => {
            if (Object.prototype.hasOwnProperty.call(req, 'params')) {
                for (let param in req.params) {
                    switch (param) {
                        case 'userId':
                            if (!/^[0-9a-f]{24}$/gmi.test(req.params[param])) {
                                return res.json({
                                    success: false,
                                    message: utils.messages.MONGOID_INVALID
                                });
                            }
                            break;
                    }
                }
            }

            next();
        },
        isAllowedOperation: (req, res, next) => {
            let userId = req.params.userId,
                token = req.query.token || req.body.token || req.headers['x-access-token'];

            jwt.verify(token, config.secretKey, function(err, decoded) {
                if ((userId === decoded._doc._id) || (decoded._doc.rights.indexOf('ADMIN') !== -1)) {
                    next();
                } else {
                    return res.json({
                        success: false,
                        message: utils.messages.TOKEN_HIGHJACKED
                    });
                }
            });
        }
    };
})();