(() => {
    "use strict";
    
    const router = require('express').Router(),
    path = require('path'),
    middlewares = require(path.join(__dirname + '../midlewares/acl'));
    User = require(path.join(__dirname + '../models/user'));

    module.exports = router;
})();