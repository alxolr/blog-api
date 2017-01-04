'use strict'

const router = require('express').Router()
const utils = require('../services/utils')
const mw = require('../middlewares/middlewares')
const Article = require('../models/article')

module.exports = router

router.route('/:articleId/comments')
  .get(getComments)
  .post(mw.isAuthenticated, addComment)

router.route('/:articleId/comments/:commentId')
  .get(getComment)
  .put(mw.isAuthenticated, updateComment)
  .delete(mw.isAuthenticated, deleteComment)

function getComment (req, res) {
  const commentId = req.params.commentId
  const articleId = req.params.articleId

  Article.findOne({
    '_id': articleId,
    'comments._id': commentId
  }, {
    'comments.$': 1
  }).then((docs) => {
    if (docs && docs.comments.length) {
      return res.json(docs.comments[0])
    }
    throw Error(utils.messages.COMMENT_NOT_FOUND)
  })
  .catch(err => handleError(res, 404)(err))
}

function getCommentsForArticleId (articleId, res) {
  Article.findById(articleId, 'comments', (err, result) => {
    if (err) return handleError(res, 404)(err)
    res.json(result.comments)
  })
}

function getComments (req, res) {
  let articleId = req.params.articleId
  return getCommentsForArticleId(articleId, res)
}

function addComment (req, res) {
  let articleId = req.params.articleId
  let comment = {
    message: req.body.message,
    author: {
      _id: req.decoded._id,
      firstname: req.decoded.firstname,
      lastname: req.decoded.lastname
    }
  }
  Article.findOneAndUpdate({ _id: articleId }, {'$push': { comments: comment }})
    .then(doc => getCommentsForArticleId(articleId, res))
    .catch(handleError(res, 404))
}

function updateComment (req, res) {
  let commentId = req.params.commentId
  let message = req.body.message

  Article.update(
    {'comments._id': commentId},
    {'$set': {
      'comments.$.message': message,
      'comments.$.updated_at': new Date()
    }}).then((result) => {
      return res.json(result)
    })
    .catch(handleError(res, 404))
}

function deleteComment (req, res) {
  let articleId = req.params.articleId
  let commentId = req.params.commentId

  Article.update(
    { _id: articleId },
    { $pull: { comments: { _id: commentId } } },
    { safe: true }
  ).then((doc) => res.status(204).end())
    .catch(handleError(res, 404))
}

function handleError (res, code) {
  return function (err) {
    return res.status(code).json({ error: err.message })
  }
}
