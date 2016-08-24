(() => {
    "use strict";
    const crypto = require('crypto'),
        jwt = require('jsonwebtoken'),
        utils = require('../helpers/utils');

    module.exports = (config) => {
        config = {
            salt: config.salt || ''
        };

        return {
            hashify: (password) => {
                return crypto.createHash('sha256')
                    .update(config.salt + password)
                    .digest('hex');
            }
        };
    };

})();