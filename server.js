const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const assert = require('assert');
const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');
const morgan = require('morgan');
const config = require('config');
const cors = require('cors');

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'));
}

mongoose.Promise = global.Promise;
mongoose.connect(config.database, (err) => {
  assert.equal(err, null);
});

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false,
}));

// parse application/json
app.use(bodyParser.json());
app.use('/images', express.static('images'));

app.use('/api/v1/users', userRoutes);
app.use('/api/v1/articles', articleRoutes);

app.listen(config.port);

module.exports = app;
