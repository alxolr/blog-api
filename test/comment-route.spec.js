/* global describe it beforeEach after */

'use strict'

process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const assert = require('assert')
/* eslint-disable */
const should = chai.should()
const MongoClient = require('mongodb')
const ObjectId = require('mongodb').ObjectID
const config = require('config')
const shared = require('./shared')
const server = require('../server')

chai.use(chaiHttp)

MongoClient.connect(config.database, (err, db) => {
  assert.equal(err, null)

  describe('Comments', () => {
    after(() => db.close())
    beforeEach(done => shared.insertFixtures(db, done))
    afterEach(done => shared.cleanupDatabase(db, done))

    describe('GET /api/v1/articles/:articleId/comments', () => {
      it('should list comments for a given article', (done) => {
        let articleId = '582f04d03f2df754121281c0'
        chai.request(server)
          .get(`/api/v1/articles/${articleId}/comments`)
          .end((err, res) => {
            assert.equal(err, null)
            res.status.should.be.eql(200)
            res.body.should.be.a('array')
            res.body.length.should.be.eql(2)
            done()
          })
      })

      it('should return the comment by id', (done) => {
        let articleId = '582f04d03f2df754121281c0'
        let commentId = '58433b3e2c08a70259deca1d'

        chai.request(server)
          .get(`/api/v1/articles/${articleId}/comments/${commentId}`)
          .end((err, res) => {
            // console.log(res)
            assert.equal(err, null)
            res.status.should.be.eql(200)
            res.body.should.have.property('message').eql('This article is not relevant at all')
            done()
          })
      })
    })
    describe('POST /api/v1/articles/:articleId/comments', () => {
      it('should create comment by a registered user', (done) => {
        shared.createUser(shared.user, (err, user, token) => {
          let articleId = '582f02fb9eb4af4c94da291d'
          let message = 'This article is some bullshit'
          chai.request(server)
            .post(`/api/v1/articles/${articleId}/comments`)
            .send({
              token: token,
              message: message
            })
            .end((err, res) => {
              assert.equal(err, null)
              res.status.should.be.eql(200)
              res.body.length.should.be.eql(1)

              db.collection('articles').find({
                _id: new ObjectId(articleId)
              }).toArray((err, items) => {
                assert.equal(err, null)
                items[0].comments[0].should.have.property('message').eql(message)
                items[0].comments[0].should.have.property('author')
                items[0].comments[0].author.should.have.property('firstname').eql(shared.user.firstname)
                items[0].comments[0].author.should.have.property('lastname').eql(shared.user.lastname)
                done()
              })
            })
        })
      })
    })
    describe('PUT /api/v1/articles/:articleId/comments/:commentId', () => {
      it('should be able to update the message of the comment if author or admin', (done) => {
        let articleId = '582f04d03f2df754121281c0'
        let commentId = '58433b31797f430225f0a4ef'
        let updateUrl = `/api/v1/articles/${articleId}/comments/${commentId}`
        let message = 'Actually I do not like your comment'
        let userId = '582ed973861cf81df5018309'

        shared.loginUser(userId, (err, user, token) => {
          chai.request(server)
            .put(updateUrl)
            .send({
              token: token,
              message: message
            }).end((err, res) => {
            assert.equal(err, null)
            res.status.should.be.eql(200)
            db.collection('articles').find({
              'comments._id': new ObjectId(commentId)
            }).toArray((err, items) => {
              assert.equal(err, null)
              let comments = items[0].comments
              let modified = comments.filter(comment => comment._id.toString() === commentId)[0]
              assert.equal(modified.message, message)
              done()
            })
          })
        })
      })
    })
    describe('DELETE /api/v1/articles/:articleId/comments/:commentId', () => {
      it('should delete an existing comment given admin rights', (done) => {
        shared.createUser(shared.admin, (err, admin, token) => {
          let articleId = '582f04d03f2df754121281c0'
          let commentId = '58433b3e2c08a70259deca1d'

          chai.request(server)
            .delete(`/api/v1/articles/${articleId}/comments/${commentId}`)
            .set('Authorization', 'Bearer ' + token)
            .end((err, res) => {
              assert.equal(err, null)
              res.status.should.be.eql(204) // success no content
              db.collection('articles').find({'comments._id': new ObjectId(commentId)})
                .toArray((err, docs) => {
                  assert.equal(err, null)
                  docs.length.should.be.eql(0)
                  done()
                })
            })
        })
      })
    })
  })
})
