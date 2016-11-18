/* global describe it */
/* global beforeEach it */

(() => {
  'use strict'

  process.env.NODE_ENV = 'test'

  let chai = require('chai')
  let chaiHttp = require('chai-http')
  let User = require('../models/user')
  let server = require('../server')
  let shared = require('./shared')
  let utils = require('../services/utils')
  let assert = require('assert')

  chai.use(chaiHttp)

  describe('Users', () => {
    beforeEach((done) => {
      User.remove({}, (err) => {
        assert.equal(err, null)
        done()
      })
    })

    describe('[POST] /api/v1/users', () => {
      it('it should create a user if email and password provided', (done) => {
        chai.request(server)
          .post('/api/v1/users')
          .send(shared.user)
          .end((err, res) => {
            assert.equal(err, null)
            res.should.have.status(200)
            res.body.should.have.property('user')
            res.body.should.have.property('token')
            res.body.user.firstname.should.be.eql(shared.user.firstname)
            done()
          })
      })
      it('it should retun password required if not set', (done) => {
        let user = Object.assign({}, shared.user)
        delete user.password
        chai.request(server)
          .post('/api/v1/users')
          .send(user)
          .end((err, res) => {
            assert.notEqual(err, null)
            res.body.error.should.be.a('array')
            res.body.error[0].property.should.be.eql('password')
            res.body.error[0].message.should.be.eql(utils.messages.PASSWORD_REQUIRED)
            res.should.have.status(400)
            done()
          })
      })
      it('it should return email required if not set', (done) => {
        let user = Object.assign({}, shared.user)
        delete user.email
        chai.request(server)
          .post('/api/v1/users')
          .send(user)
          .end((err, res) => {
            assert.notEqual(err, null)
            res.body.error.should.be.a('array')
            res.body.error[0].property.should.be.eql('email')
            res.body.error[0].message.should.be.eql(utils.messages.EMAIL_REQUIRED)
            res.should.have.status(400)
            done()
          })
      })
    })

    describe('[POST] /api/v1/users/login', () => {
      it('it should return a valid token when valid credentials', (done) => {
        let credentials = Object.assign({}, {
          email: shared.user.email,
          password: shared.user.password
        })
        let user = new User(shared.user)
        user.save((err, user) => {
          assert.equal(err, null)
          chai.request(server)
            .post('/api/v1/users/login')
            .send(credentials)
            .end((err, res) => {
              assert.equal(err, null)
              res.status.should.be.eql(200)
              res.body.should.have.property('token')
              res.body.should.have.property('user')
              done()
            })
        })
      })
      it('should return invalid credentials error when email or password is not ok', (done) => {
        let credentials = {
          email: 'dummy1@test.com',
          password: 'qwerty'
        }
        let user = new User(shared.user)
        user.save((err, user) => {
          assert.equal(err, null)
          chai.request(server)
            .post('/api/v1/users/login')
            .send(credentials)
            .end((err, res) => {
              assert.notEqual(err, null)
              res.status.should.be.eql(401)
              res.body.error.should.be.eql(utils.messages.INVALID_CREDENTIALS)
              done()
            })
        })
      })
      it('should not login a softdeleted user', (done) => {
        let user = new User(shared.user)
        user.deleted_at = new Date()
        user.save((err, user) => {
          assert.equal(err, null)
          chai.request(server)
            .post('/api/v1/users/login')
            .send({
              email: shared.user.email,
              password: shared.user.password
            }).end((err, res) => {
              assert.notEqual(err, null)
              res.status.should.be.eql(401)
              res.body.should.have.property('error').eql(utils.messages.INVALID_CREDENTIALS)
              done()
            })
        })
      })
    })

    describe('[PUT] /api/v1/users/:userId', () => {
      it('should not update the user without the token', (done) => {
        let user = new User(shared.user)
        let update = Object.assign({}, shared.user)
        update.firstname = 'George'
        user.save((err, user) => {
          assert.equal(err, null)
          let _id = user._id
          chai.request(server)
            .put('/api/v1/users/' + _id)
            .send(update)
            .end((err, res) => {
              assert.notEqual(err, null)
              res.status.should.be.eql(401)
              res.body.should.have.property('error').eql(utils.messages.TOKEN_NOT_PROVIDED)
              done()
            })
        })
      })
      it('should update the user when token is provided', (done) => {
        let user = new User(shared.user)
        user.save((err, user) => {
          assert.equal(err, null)
          chai.request(server)
            .post('/api/v1/users/login')
            .send({
              email: shared.user.email,
              password: shared.user.password
            }).end((err, res) => {
              assert.equal(err, null)
              let token = res.body.token
              chai.request(server)
                .put('/api/v1/users/' + user._id)
                .send({
                  firstname: 'George',
                  lastname: 'Andreas',
                  token: token
                }).end((err, res) => {
                  assert.equal(err, null)
                  User.findOne({
                    _id: user._id
                  }, (err, user) => {
                    assert.equal(err, null)
                    user.should.have.property('firstname').eql('George')
                    user.should.have.property('lastname').eql('Andreas')
                    done()
                  })
                })
            })
        })
      })
    })

    describe('[GET] /api/v1/users/:userId', () => {
      it('should return access denied if token not provided', (done) => {
        let user = new User(shared.user)
        user.save((err, user) => {
          assert.equal(err, null)
          chai.request(server)
            .get('/api/v1/users/' + user._id)
            .end((err, res) => {
              assert.notEqual(err, null)
              res.status.should.be.eql(401)
              res.body.should.have.property('error').eql(utils.messages.TOKEN_NOT_PROVIDED)
              done()
            })
        })
      })
      it('should return the requested user if valid token is provided', (done) => {
        let user = new User(shared.user)
        user.save((err, user) => {
          assert.equal(err, null)
          chai.request(server)
            .post('/api/v1/users/login')
            .send({
              email: shared.user.email,
              password: shared.user.password
            }).end((err, res) => {
              assert.equal(err, null)
              let token = res.body.token
              chai.request(server)
                .get('/api/v1/users/' + user._id)
                .send({
                  token: token
                }).end((err, res) => {
                  assert.equal(err, null)
                  res.status.should.be.eql(200)
                  res.body.should.have.property('email')
                  res.body.should.not.have.property('password')
                  res.body.should.have.property('_id').eql(user._id.toString())
                  done()
                })
            })
        })
      })
    })

    describe('[DELETE] /api/v1/users/:userId', () => {
      it('should return access denied when trying to delete a user without token', (done) => {
        let user = new User(shared.user)
        user.save((err, user) => {
          assert.equal(err, null)
          chai.request(server)
            .delete('/api/v1/users/' + user._id)
            .end((err, res) => {
              assert.notEqual(err, null)
              res.status.should.be.eql(401)
              res.body.should.have.property('error').eql(utils.messages.TOKEN_NOT_PROVIDED)
              done()
            })
        })
      })
      it('should softdelete the user if provided valid token', (done) => {
        let user = new User(shared.user)
        user.save((err, user) => {
          assert.equal(err, null)
          chai.request(server)
            .post('/api/v1/users/login')
            .send({
              email: shared.user.email,
              password: shared.user.password
            }).end((err, res) => {
              assert.equal(err, null)
              let token = res.body.token
              chai.request(server)
                .delete('/api/v1/users/' + user._id)
                .send({
                  token: token
                })
                .end((err, res) => {
                  assert.equal(err, null)
                  res.status.should.be.eql(204)
                  User.findOne({
                    _id: user._id
                  }, (err, doc) => {
                    assert.equal(err, null)
                    doc.should.have.property('_id').eql(user._id)
                    doc.should.have.property('deleted_at')
                    done()
                  })
                })
            })
        })
      })
    })
  })
})()
