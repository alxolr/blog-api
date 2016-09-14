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
        console.log(`Successfuly connected to ${config.database}`);
    });

    // parse application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({
        extended: false
    }));

    // parse application/json
    app.use(bodyParser.json());
    app.use('/images', express.static('images'));

    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/articles', articleRoutes);
    app.use('/api/v1/articles/', commentRoutes);

    app.listen(config.port, () => {
        console.log(`Server is running at http://localhost:${config.port}/`);
    });

    module.exports = app;
})();