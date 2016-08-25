(() => {
    "use strict";
    const router = require('express').Router(),
        middlewares = require('../middlewares/middlewares');

    router.route('/')
        .all(middlewares.isAuthenticated)
        .post((req, res) => {
            res.json({
                success: false,
                message: "BUllshit"
            });
        });

    module.exports = router;
})();