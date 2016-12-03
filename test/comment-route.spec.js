/* global describe it beforeEach after */

'use strict'

process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = require('assert')
/* eslint-disable */
const should = chai.should()
const MongoClient = require('mongodb')
const config = require('config')
const shared = require('./shared')

chai.use(chaiHttp)

MongoClient.connect(config.database, (err, db) => {
  assert.equal(err, null)

  describe('COMMENTS', () => {
    after(() => db.close())
    beforeEach(done => shared.insertFixtures(db, done))
    afterEach(done => shared.cleanupDatabase(db, done))
  })
})
