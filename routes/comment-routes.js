(() => {
    "use strict";

    const Router = require('express').Router(),
    utils = require('../helpers/utils'),
    middlewares = require('../middlewares/middlewares');

    Router.post('/', (err, res) => {
        res.json({
            success: false,
            message: utils.messages.COMMENT_CREATE_FAIL
        });
    });

    module.exports = Router;

})();