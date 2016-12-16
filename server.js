(() => {
  'use strict'

  let express = require('express')
  let app = express()
  let bodyParser = require('body-parser')
  let mongoose = require('mongoose')
  let assert = require('assert')
  let userRoutes = require('./routes/user')
  let articleRoutes = require('./routes/article')
  let commentRoutes = require('./routes/comment')
  let morgan = require('morgan')
  let config = require('config')
  let cors = require('corse')

  if (process.env.NODE_ENV !== 'test') {
    app.use(morgan('combined'))
  }

  mongoose.Promise = global.Promise
  mongoose.connect(config.database, (err) => {
    assert.equal(err, null)
  })

  app.use(cors())

  // parse application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({
    extended: false
  }))

  // parse application/json
  app.use(bodyParser.json())
  app.use('/images', express.static('images'))
  app.use('/coverage', express.static('coverage/lcov-report/'))
  app.use('/api/doc', express.static('doc/'))

  app.use('/api/v1/users', userRoutes)
  app.use('/api/v1/articles', articleRoutes)
  app.use('/api/v1/articles/', commentRoutes)

  app.listen(config.port)

  module.exports = app
})()
