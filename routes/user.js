'use strict'

const router = require('express').Router()
const User = require('../models/user')
const config = require('config')
const utils = require('../services/utils')
const security = require('../services/security')(config)
const jwt = require('jsonwebtoken')
const mw = require('../middlewares/middlewares')

module.exports = router

router.post('/', createUser)
router.post('/login', loginUser)
router.route('/:userId')
  .all(mw.isValidParameters, mw.isAuthenticated, mw.isAllowedOperation)
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser)

function createUser (req, res) {
  let user = new User(req.body)
  user.save((err) => {
    if (err) {
      if (err.hasOwnProperty('code') && err.code === utils.mongo.UNIQUE_KEY_VIOLATION) {
        return endError(res, 400, utils.messages.USER_DUPLICATE)
      } else {
        handleErrors(res)(err)
      }
    } else {
      generateTokenForUser(user, res)
    }
  })
}

function generateTokenForUser (user, res) {
  delete user.password
  let token = jwt.sign(user, config.secretKey, {
    expiresIn: 36000
  })

  return res.json({
    user: user,
    token: token
  })
}

function loginUser (req, res) {
  let email = req.body.email
  let password = req.body.password

  User.findOne({
    email: email,
    deleted_at: {
      '$exists': false
    }
  }).then(handleSuccess, handleUserNotFound)

  function handleUserNotFound (err) {
    if (err) {
      console.error(err)
    }
    return endError(res, 401, utils.messages.INVALID_CREDENTIALS)
  }

  function handleSuccess (user) {
    if (user) {
      let providedEncryptedPassword = security.hashify(password)
      if (user.password === providedEncryptedPassword) {
        return generateTokenForUser(user, res, utils.messages.USER_LOGGEDIN_SUCCESS)
      }
    }
    return endError(res, 401, utils.messages.INVALID_CREDENTIALS)
  }
}

function updateUser (req, res) {
  if (req.body.password !== undefined) {
    req.body.password = security.hashify(req.body.password)
  }

  if (req.body._id !== undefined) delete req.body._id

  User.update({
    _id: req.params.userId
  }, {
    '$set': req.body
  }).then(handleSuccess)
    .catch(handleErrors(res))

  function handleSuccess (result) {
    User.findOne({
      _id: req.params.userId
    }).then(generateToken)
      .catch(handleErrors(res))

    function generateToken (user) {
      generateTokenForUser(user, res, utils.messages.USER_UPDATED_SUCCESS)
    }
  }
}

function getUser (req, res) {
  User.findOne({
    _id: req.params.userId
  }, {
    password: 0
  }).then(handleSuccess)
    .catch(handleErrors(res))

  function handleSuccess (user) {
    if (user) {
      return res.json(user)
    } else {
      return endError(res, 404, utils.messages.USER_NOT_FOUND)
    }
  }
}

function deleteUser (req, res) {
  User.findByIdAndUpdate({
    _id: req.params.userId
  }, {
    '$set': {
      deleted_at: new Date()
    }
  })
    .then(result => res.status(204).end())
    .catch(handleErrors(res))
}

function handleErrors (res) {
  return function (err) {
    endError(res, 400, utils.listifyErrors(err))
  }
}

function endError (res, code, error) {
  res.status(code).json({error: error})
}
