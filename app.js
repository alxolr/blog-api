(() => {
    "use strict";
    const express = require('express'),
        app = express(),
        config = require('./config'),
        bodyParser = require('body-parser'),
        mongoose = require('mongoose'),
        assert = require('assert'),
        userRoutes = require('./routes/user-routes'),
        articleRoutes = require('./routes/article-routes'),
        commentRoutes = require('./routes/comment-routes');

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
    app.use('/uploads', express.static('uploads'));
    app.use('/api/doc', express.static('doc'));

    app.use('/api/v1/users', userRoutes);
    app.use('/api/v1/articles', articleRoutes);
    app.use('/api/v1/articles/', commentRoutes);

    app.listen(config.port, () => {
        console.log(`Server is running at http://localhost:${config.port}/`);
    });
})();