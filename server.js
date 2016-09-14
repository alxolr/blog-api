(() => {
    "use strict";

    let express = require('express'),
        app = express(),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        assert = require('assert'),
        userRoutes = require('./routes/user'),
        articleRoutes = require('./routes/article'),
        commentRoutes = require('./routes/comment'),
        morgan = require('morgan'),
        config = require('config');

    mongoose.Promise = global.Promise;
    mongoose.connect(config.database, (err) => {
        assert.equal(err, null);
    });

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    // parse application/json
    app.use(bodyParser.json());
    app.use('/images', express.static('images'));
    app.use('/coverage', express.static('coverage/lcov-report/'));

    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/articles', articleRoutes);
    app.use('/api/v1/articles/', commentRoutes);

    app.listen(config.port);

    module.exports = app;
})();