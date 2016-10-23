(() => {
  'use strict'

  const jwt = require('jsonwebtoken')
  const utils = require('../services/utils')
  const config = require('config')
  const Article = require('../models/article')

  const tokenHighjacked = (res) => {
    return res.status(401).json({
      error: utils.messages.TOKEN_HIGHJACKED
    })
  }

  const isAuthenticated = (req, res, next) => {
    let token = req.query.token || req.body.token || req.headers['x-access-token']
    if (token) {
      jwt.verify(token, config.secretKey, function (err, decoded) {
        if (err) {
          return res.json({
            success: false,
            message: utils.messages.TOKEN_EXPIRED
          })
        } else {
          req.decoded = decoded
          next()
        }
      })
    } else {
      return res.status(401).json({
        error: utils.messages.TOKEN_NOT_PROVIDED
      })
    }
  }

  const isValidParameters = (req, res, next) => {
    if (Object.prototype.hasOwnProperty.call(req, 'params')) {
      for (let param in req.params) {
        switch (param) {
          case 'userId':
          case 'articleId':
            if (!/^[0-9a-f]{24}$/gmi.test(req.params[param])) {
              return res.status(400).json({
                error: utils.messages.MONGOID_INVALID
              })
            }
            break
        }
      }
    }

    next()
  }

  const isAllowedOperation = (req, res, next) => {
    let userId = req.params.userId
    let token = req.query.token || req.body.token || req.headers['x-access-token']

    jwt.verify(token, config.secretKey, (err, decoded) => {
      if (err) console.error(err)
      if ((userId === decoded._doc._id) || (decoded._doc.rights.indexOf('ADMIN') !== -1)) {
        next()
      } else {
        return res.status(401).json({
          error: utils.messages.TOKEN_HIGHJACKED
        })
      }
    })
  }

  const isAdmin = (user) => {
    return user.rights.indexOf('ADMIN') !== -1
  }

  const isArticleAuthor = (user, articleId) => {
    return new Promise((resolve, reject) => {
      Article.findOne({
        _id: articleId
      }, {
        author: 1
      }, (err, article) => {
        if (err) reject(err)

        if (article) {
          if (article.author._id === user._id) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })
    })
  }

  const isAdminOrArticleAuthor = (req, res, next) => {
    let user = req.decoded._doc
    let articleId = req.params.articleId

    if (isAdmin(user)) {
      next()
    } else {
      isArticleAuthor(user, articleId).then((isAuthor) => {
        if (isAuthor) {
          next()
        } else {
          return tokenHighjacked(res)
        }
      }).catch((err) => {
        if (err) {
          console.error(err)
        }
        return tokenHighjacked(res)
      })
    }
  }

  exports.isAuthenticated = isAuthenticated
  exports.isValidParameters = isValidParameters
  exports.isAllowedOperation = isAllowedOperation
  exports.isAdminOrArticleAuthor = isAdminOrArticleAuthor
})()
