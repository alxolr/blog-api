(() => {
  'use strict'

  const Router = require('express').Router()
  const utils = require('../services/utils')
  const middlewares = require('../middlewares/middlewares')
  const Article = require('../models/article')

  Router.post('/:articleId/comments', middlewares.isAuthenticated, (req, res) => {
    let comment = {
      message: req.body.message,
      author: {
        _id: req.decoded._doc._id,
        name: req.decoded._doc.name,
        surname: req.decoded._doc.surname
      }
    }

    Article.update({
      _id: req.params.articleId
    }, {
      '$push': {
        comments: comment
      }
    }).then(sendSuccess, sendFail)

    function sendSuccess (resp) {
      Article.findOne({
        _id: req.params.articleId
      }, {
        comments: true
      }).then((article) => {
        res.json({
          success: true,
          comments: article.comments
        })
      }, sendFail)
    }

    function sendFail (err) {
      console.error(err)
      res.json({
        success: false,
        message: utils.messages.COMMENT_CREATE_FAIL
      })
    }
  })

  module.exports = Router
})()
