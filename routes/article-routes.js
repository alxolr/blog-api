(() => {
    "use strict";
    const router = require('express').Router(),
        middlewares = require('../middlewares/middlewares');

    router.post('/', middlewares.isAuthenticated, (req, res) => {
        return res.json({
            success: false,
            message: "Fail goda"
        });
    });

    module.exports = router;
})();