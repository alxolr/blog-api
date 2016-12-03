'use strict'

const router = require('express').Router()
const utils = require('../services/utils')
// const mw = require('../middlewares/middlewares')
const Article = require('../models/article')

module.exports = router

router.route('/:articleId/comments')
  .get(getComments)
  // .post(mw.isAuthenticated, addComment)

function getComments (req, res) {
  let articleId = req.params.articleId
  Article.findById(articleId, 'comments', (err, result) => {
    if (err) return handleError(res, 404)
    res.json(result.comments)
  })
}

function handleError (res, code) {
  return function (err) {
    return res.status(code).json({error: utils.listifyErrors(err)})
  }
}

// Router.post('/:articleId/comments', middlewares.isAuthenticated, (req, res) => {
//   let comment = {
//     message: req.body.message,
//     author: {
//       _id: req.decoded._doc._id,
//       name: req.decoded._doc.name,
//       surname: req.decoded._doc.surname
//     }
//   }

//   Article.update({
//     _id: req.params.articleId
//   }, {
//     '$push': {
//       comments: comment
//     }
//   }).then(sendSuccess, sendFail)

//   function sendSuccess (resp) {
//     Article.findOne({
//       _id: req.params.articleId
//     }, {
//       comments: true
//     }).then((article) => {
//       res.json({
//         success: true,
//         comments: article.comments
//       })
//     }, sendFail)
//   }

//   function sendFail (err) {
//     console.error(err)
//     res.json({
//       success: false,
//       message: utils.messages.COMMENT_CREATE_FAIL
//     })
//   }
// })
