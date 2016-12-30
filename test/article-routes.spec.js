/* global describe it beforeEach afterEach after */

'use strict'

process.env.NODE_ENV = 'test'

const chai = require('chai')
const chaiHttp = require('chai-http')
const Article = require('../models/article')
const server = require('../server')
const shared = require('./shared')
const utils = require('../services/utils')
const config = require('config')
const fs = require('fs')
const assert = require('assert')
const path = require('path')
const MongoClient = require('mongodb').MongoClient

let photo = 'big-boobs-photo-450x299.png'

MongoClient.connect(config.database, (err, db) => {
  assert.equal(err, null)

  chai.use(chaiHttp)

  describe('Articles', () => {
    beforeEach((done) => shared.insertFixtures(db, done))
    afterEach((done) => shared.cleanupDatabase(db, done))
    after(() => db.close())

    describe('[POST] /api/v1/articles', () => {
      it('should not be able to create article without token', (done) => {
        chai.request(server)
          .post('/api/v1/articles')
          .send({
            title: shared.article.title,
            body: shared.article.body
          }).end((err, res) => {
            assert.notEqual(err, null)
            res.status.should.be.eql(401)
            res.body.should.have.property('error').eql(utils.messages.TOKEN_NOT_PROVIDED)
            done()
          })
      })
      it('should return an apropriate message when title or body missing', done => {
        shared.createUser(shared.user, (err, user, token) => {
          assert.equal(err, null)
          chai.request(server)
            .post('/api/v1/articles')
            .set('Authorization', `Bearer ${token}`)
            .send({
              body: shared.article.body
            })
            .end((err, res) => {
              assert.notEqual(err, null)
              res.body.should.have.property('error')
              done()
            })
        })
      })
      it('should create the article if token provided', (done) => {
        shared.createUser(shared.user, (err, user, token) => {
          assert.equal(err, null)
          chai.request(server)
            .post('/api/v1/articles')
            .send({
              title: shared.article.title,
              body: shared.article.body,
              token: token
            }).end((err, res) => {
              assert.equal(err, null)
              res.status.should.be.eql(200)
              res.body.should.have.property('author')
              res.body.should.have.property('slug').eql(utils.slugify(shared.article.title))
              done()
            })
        })
      })

      it('should be able to upload the article main photo and the photo should be accessible', (done) => {
        shared.createUser(shared.user, (err, user, token) => {
          assert.equal(err, null)
          chai.request(server)
            .post('/api/v1/articles')
            .set('Content-Type', 'multipart/form-data')
            .field('title', shared.article.title)
            .field('body', shared.article.body)
            .field('token', token)
            .attach('image', fs.createReadStream(path.resolve(`test/${photo}`)), photo)
            .end((err, res) => {
              assert.equal(err, null)
              res.status.should.be.eql(200)
              res.body.should.have.property('image').eql(`/images/${photo}`)
              chai.request(server)
                .get(`/images/${photo}`)
                .end((err, res) => {
                  assert.equal(err, null)
                  res.status.should.be.eql(200)
                  done()
                })
            })
        })
      })
    })

    describe('[PUT] /api/v1/articles/:articleId', () => {
      it('should not allow article modification without token', (done) => {
        let article = new Article(shared.article)
        article.save((err, article) => {
          assert.notEqual(err, null)
          chai.request(server)
            .put('/api/v1/articles/1234567890abcdef12345678')
            .send({})
            .end((err, res) => {
              assert.notEqual(err, null)
              res.status.should.be.eql(401)
              res.body.error.should.be.eql(utils.messages.TOKEN_NOT_PROVIDED)
              done()
            })
        })
      })

      it('should allow article modifications for the article author', (done) => {
        shared.createArticle(shared.user, shared.article, (err, article, token) => {
          assert.equal(err, null)
          chai.request(server)
            .put('/api/v1/articles/' + article._id)
            .send({
              token: token,
              title: 'New title for the article'
            }).end((err, res) => {
              assert.equal(err, null)
              res.status.should.be.eql(200)
              res.body.should.have.property('title').eql('New title for the article')
              done()
            })
        })
      })

      it('should not allow article edit for users others than author', (done) => {
        shared.createArticle(shared.user, shared.article, (err, article, token) => {
          assert.equal(err, null)
          shared.createUser({
            email: 'other@user.com',
            password: 'interesting'
          }, (err, user, token) => {
            assert.equal(err, null)
            chai.request(server)
              .put('/api/v1/articles/' + article._id)
              .send({
                token: token,
                title: 'Should not be possible'
              }).end((err, res) => {
                assert.notEqual(err, null)
                res.status.should.be.eql(401)
                res.body.error.should.be.eql(utils.messages.TOKEN_HIGHJACKED)
                done()
              })
          })
        })
      })

      it('should allow article modification for the ADMIN user rights', (done) => {
        shared.createArticle(shared.user, shared.article, (err, article, token) => {
          assert.equal(err, null)
          shared.createUser(shared.admin, (err, admin, token) => {
            assert.equal(err, null)
            chai.request(server)
              .put('/api/v1/articles/' + article._id)
              .send({
                token: token,
                title: 'Modified by admin'
              }).end((err, res) => {
                assert.equal(err, null)
                res.status.should.be.eql(200)
                res.body.title.should.be.eql('Modified by admin')
                done()
              })
          })
        })
      })

      it('should allow the image modification and upload of a new photo', (done) => {
        shared.createArticle(shared.user, shared.article, (err, article, token) => {
          assert.equal(err, null)
          chai.request(server)
            .put('/api/v1/articles/' + article._id)
            .set('Content-Type', 'multipart/form-data')
            .field('token', token)
            .attach('image', fs.createReadStream(path.resolve(`test/${photo}`)), photo)
            .end((err, res) => {
              assert.equal(err, null)
              res.status.should.be.eql(200)
              res.body.image.should.be.eql('/images/' + photo)
              done()
            })
        })
      })

      it('should ignore the _id field if it is sent in the parameters', (done) => {
        shared.createArticle(shared.user, shared.article, (err, article, token) => {
          assert.equal(err, null)
          article.title = 'Some new title'
          chai.request(server)
            .put('/api/v1/articles/' + article._id)
            .set('x-access-token', token)
            .send(article)
            .end((err, res) => {
              assert.equal(err, null)
              res.status.should.be.eql(200)
              res.body.should.have.property('title').eql('Some new title')
              done()
            })
        })
      })
    })

    describe('[GET] /api/v1/article/:articleId', () => {
      it('should return all the details of the article', (done) => {
        shared.createArticle(shared.user, shared.article, (err, article, token) => {
          assert.equal(err, null)
          chai.request(server)
            .get('/api/v1/articles/' + article._id)
            .end((err, res) => {
              assert.equal(err, null)
              res.status.should.be.eql(200)
              res.body.should.have.property('title')
              res.body.should.have.property('body')
              res.body.should.have.property('comments')
              done()
            })
        })
      })

      it('should not return the details of a softdeleted article', (done) => {
        let article = Object.assign({}, shared.article)
        article.deleted_at = new Date()
        shared.createArticle(shared.user, article, (err, article, token) => {
          assert.equal(err, null)
          chai.request(server)
            .get('/api/v1/articles/' + article._id)
            .end((err, res) => {
              assert.notEqual(err, null)
              res.status.should.be.eql(404)
              res.body.should.have.property('error').eql(utils.messages.ARTICLE_NOT_FOUND)
              done()
            })
        })
      })
    })

    describe('[GET] /api/v1/articles/:slug', () => {
      it('should be possible to get the article details by slug', (done) => {
        shared.createArticle(shared.user, shared.article, (err, article, token) => {
          assert.equal(err, null)
          chai.request(server)
            .get('/api/v1/articles/' + article.slug)
            .end((err, res) => {
              assert.equal(err, null)
              res.status.should.be.eql(200)
              res.body.should.have.property('title')
              res.body.should.have.property('body')
              res.body.should.have.property('comments')
              done()
            })
        })
      })
    })

    describe('[GET] /api/v1/articles', () => {
      it('should return 5 articles given no filter or limit set', (done) => {
        chai.request(server)
          .get('/api/v1/articles')
          .end((err, res) => {
            assert.equal(err, null)
            res.status.should.be.eql(200)
            res.body.articles.should.be.a('array')
            res.body.articles.length.should.be.eql(5)
            done()
          })
      })
      it('should be able to `filter` the article collection', (done) => {
        let filter = 'created_at::>2016-09-15'
        shared.createArticle(shared.user, shared.article, (err, article, token) => {
          assert.equal(err, null)
          chai.request(server)
            .get(`/api/v1/articles?filter=${filter}`)
            .end((err, res) => {
              assert.equal(err, null)
              res.status.should.be.eql(200)
              res.body.articles.should.be.a('array')
              done()
            })
        })
      })
      it(`should be able to filter the articles by created_at > 2012-09-15 date`, (done) => {
        let filter = 'created_at::>2012-09-15'
        chai.request(server)
          .get(`/api/v1/articles?filter=${filter}`)
          .end((err, res) => {
            assert.equal(err, null)
            res.status.should.be.eql(200)
            res.body.articles.should.be.a('array')
            res.body.articles.length.should.be.eql(5)
            done()
          })
      })
      it(`should be able to limit the results`, (done) => {
        let query = 'filter=created_at::>2012-09-15&limit=2'
        chai.request(server)
          .get(`/api/v1/articles?${query}`)
          .end((err, res) => {
            assert.equal(err, null)
            res.status.should.be.eql(200)
            res.body.articles.should.be.a('array')
            res.body.articles.length.should.be.eql(2)
            done()
          })
      })
      it('should be able to filter the articles by created_at > 2015-09-12', done => {
        let filter = 'created_at::>2015-09-12'
        chai.request(server)
          .get(`/api/v1/articles?filter=${filter}`)
          .end((err, res) => {
            assert.equal(err, null)
            res.status.should.be.eql(200)
            res.body.articles.length.should.be.eql(2)
            done()
          })
      })

      it('should not return the softedeleted articles', done => {
        let filter = 'created_at::>=2016-12-21'
        chai.request(server)
          .get(`/api/v1/articles?filter=${filter}`)
          .end((err, res) => {
            assert.equal(err, null)
            res.status.should.be.eql(200)
            res.body.articles.length.should.be.eql(0)
            done()
          })
      })
    })

    describe('[DELETE] /api/v1/articles/:articleId', () => {
      it('should be softedeleted by the article author', done => {
        shared.createArticle(shared.user, shared.article, (err, article, token) => {
          assert.equal(err, null)
          chai.request(server)
            .delete('/api/v1/articles/' + article._id)
            .send({
              token: token
            })
            .end((err, res) => {
              assert.equal(err, null)
              res.status.should.be.eql(204)
              Article.findOne({
                _id: article._id
              }, (err, doc) => {
                assert.equal(err, null)
                doc.should.have.property('deleted_at').not.null
                done()
              })
            })
        })
      })

      it('should be softedeleted by the admin', (done) => {
        shared.createArticle(shared.user, shared.article, (err, article, token) => {
          assert.equal(err, null)
          shared.createUser(shared.admin, (err, admin, token) => {
            assert.equal(err, null)
            chai.request(server)
              .delete('/api/v1/articles/' + article._id)
              .send({
                token: token
              })
              .end((err, res) => {
                assert.equal(err, null)
                res.status.should.be.eql(204)
                done()
              })
          })
        })
      })

      it('should not allow softdelete by other user', (done) => {
        shared.createArticle(shared.user, shared.article, (err, article, token) => {
          assert.equal(err, null)
          shared.createUser({
            'email': 'other@user.com',
            'password': 'test'
          }, (err, user, token) => {
            assert.equal(err, null)
            chai.request(server)
              .delete('/api/v1/articles/' + article._id)
              .send({
                token: token
              })
              .end((err, res) => {
                assert.notEqual(err, null)
                res.status.should.be.eql(401)
                res.body.error.should.be.eql(utils.messages.TOKEN_HIGHJACKED)
                done()
              })
          })
        })
      })
    })
  })
})
