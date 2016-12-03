'use strict'

const router = require('express').Router()
const utils = require('../services/utils')
const mw = require('../middlewares/middlewares')
const Article = require('../models/article')

module.exports = router

router.route('/:articleId/comments')
  .get(getComments)
  .post(mw.isAuthenticated, addComment)

function getComments (req, res) {
  let articleId = req.params.articleId
  Article.findById(articleId, 'comments', (err, result) => {
    if (err) return handleError(res, 404)(err)
    res.json(result.comments)
  })
}

function addComment (req, res) {
  let articleId = req.params.articleId
  let comment = {
    message: req.body.message,
    author: {
      _id: req.decoded._doc._id,
      firstname: req.decoded._doc.firstname,
      lastname: req.decoded._doc.lastname
    }
  }
  Article.findOneAndUpdate({ _id: articleId }, {'$push': { comments: comment }})
    .then(doc => res.json(doc.comments))
    .catch(handleError(res, 404))
}

function handleError (res, code) {
  return function (err) {
    return res.status(code).json({error: utils.listifyErrors(err)})
  }
}
