(() => {
    "use strict";
    const jwt = require('jsonwebtoken'),
        utils = require('../helpers/utils'),
        config = require('../config');

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
                        // if everything is good, save to request for use in other routes
                        req.decoded = decoded;
                        next();
                    }
                });

            } else {
                res.status(403).json({
                    success: false,
                    message: utils.messages.TOKEN_NOT_PROVIDED
                });
            }
        },
        validateParameters: (req, res, next) => {
            if (Object.prototype.hasOwnProperty.call(req, 'params')) {
                for (let param in req.params) {
                    switch (param) {
                        case 'id':
                            if (!/^[0-9a-f]{24}$/img.test(req.params[param])) {
                                res.json({
                                    success: false,
                                    message: utils.messages.MONGOID_INVALID
                                });
                            }
                            break;
                    }

                }
            }

            next();
        }
    };
})();