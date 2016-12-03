/* const should */
;(() => {
  'use strict'
  process.env.NODE_ENV = 'test'

  const server = require('../server')
  const User = require('../models/user')
  const chai = require('chai')
  const chaiHttp = require('chai-http')
  const assert = require('assert')
  const fixtures = require('./fixtures')
  const async = require('async')
  chai.use(chaiHttp)
  /* eslint-disable */
  const should = chai.should()

  let user = {
    email: 'dummyuser@mail.com',
    password: 'dummypassword',
    firstname: 'Johny',
    lastname: 'Bravo'
  }

  let admin = {
    email: 'admin@mail.com',
    password: 'goodadmin',
    firstname: 'Admin',
    lastname: 'Adminovich',
    rights: ['ADMIN']
  }

  let article = {
    title: 'Angular 2, be part of the future.',
    body: `
            This article seems very interesting, from the perspective of a new user,
            here you will find how to start codding an angular 2 application.
        `
  }

  let comment = {
    message: 'This article is not that good as the people say'
  }

  const createUser = (user, cb) => {
    let userObj = new User(user)
    userObj.save((err, doc) => {
      assert.equal(err, null)
      chai.request(server)
        .post('/api/v1/users/login')
        .send({
          email: user.email,
          password: user.password
        })
        .end((err, res) => {
          cb(err, res.body.user, res.body.token)
        })
    })
  }

  const createArticle = (author, article, cb) => {
    this.createUser(author, (err, user, token) => {
      assert.equal(err, null)
      chai.request(server)
        .post('/api/v1/articles')
        .set('x-access-token', token)
        .send(article)
        .end((err, res) => {
          cb(err, res.body, token)
        })
    })
  }

  const insertFixtures = (db, done) => {
    function insertUser (user, cb) {
      db.collection('users').insertOne(user, (err) => {
        assert.equal(err, null)
        cb(null)
      })
    }
    function insertArticle (article, cb) {
      db.collection('articles').insertOne(article, (err) => {
        assert.equal(err, null)
        cb(null)
      })
    }
    async.map(fixtures.users, insertUser, (err, result) => {
      assert.equal(err, null)

      async.map(fixtures.articles, insertArticle, (err, results) => {
        assert.equal(err, null)
        done()
      })
    })
  }

  const cleanupDatabase = (db, done) => {
    function cleanUsers (cb) {
      db.collection('users').drop((err) => {
        if (err) cb(err)
        cb(null)
      })
    }

    function cleanArticles (cb) {
      db.collection('articles').drop(err => {
        if (err) cb(err)
        cb(null)
      })
    }

    async.parallel([cleanUsers, cleanArticles], (err, results) => {
      if (err) done(err)
      else done()
    })
  }

  exports.createUser = createUser
  exports.createArticle = createArticle
  exports.user = user
  exports.admin = admin
  exports.article = article
  exports.comment = comment
  exports.insertFixtures = insertFixtures
  exports.cleanupDatabase = cleanupDatabase
})()
