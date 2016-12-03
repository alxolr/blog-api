'use strict'

const router = require('express').Router()
const mw = require('../middlewares/middlewares')
const Article = require('../models/article')
const utils = require('../services/utils')
const multer = require('multer')
const path = require('path')
const fe = require('../services/filter-extractor')
const qb = require('../services/query-builder')
const uploadFile = require('../services/upload-file')
const JSONStream = require('JSONStream')
const upload = multer({
  dest: '/tmp/'
})
const imgDirectory = path.resolve('images/')

module.exports = router

router.get('', findArticles)
/**
 * @apiDefine ArticleSuccess
 *
 * @apiSuccess {Boolean} success Returns if the article was succesfully created.
 * @apiSuccess {Object} article Returns the newly created article
 * @apiSuccess {String} message Returns the success message.
 */

/**
 * @api {post} /api/v1/articles
 * @apiName createArticle
 * @apiVersion 1.0.0
 * @apiGroup Article
 * @apiPermission USER
 *
 * @apiParam {String} title Article title
 * @apiParam {String} body Article body
 * @apiParam {String} [image] Image for the article
 * @apiParam {String} token Access Token
 *
 * @apiParamExample {json} Request-Example:
 *     {
 *       "title": "Interesting awesome title",
 *       "body": "Here will be the body of the article",
 *       "token": "anexampleoftoken"
 *     }
 *
 * @apiUse ArticleSuccess
 */
router.post('/', upload.single('image'), mw.isAuthenticated, createArticle)

router.route('/:articleId([0-9a-f]{24})')
  /**
   * @api {put} /api/v1/articles/{articleId}
   * @apiName updateArticle
   * @apiVersion 1.0.0
   * @apiGroup Article
   * @apiPermission USER
   * @apiDescription Is updating the requested article which is defined by :articleId mongodb _id equivalent.
   *
   * @apiParam {String} [title] Article title
   * @apiParam {String} [body] Article body
   * @apiParam {String} [image] Image for the article
   * @apiParam {String} token Access Token
   *
   * @apiParamExample {json} Request-Example:
   *     {
   *       "title": "Interesting awesome title",
   *       "body": "Here will be the body of the article",
   *       "token": "anexampleoftoken"
   *     }
   *
   * @apiUse ArticleSuccess
   */
  .put(upload.single('image'), mw.isAuthenticated, mw.isAdminOrArticleAuthor, updateArticle)
  /**
   * @api {get} /api/v1/articles/{articleId}
   * @apiName getArticleByArticleId
   * @apiVersion 1.0.0
   * @apiGroup Article
   * @apiPermission GUEST
   * @apiDescription Is returning the request article by articleId.
   *
   * @apiSuccess {Object} article The requested article object.
   * @apiSuccess {Boolean} success The status of the transaction.
   */
  .get(getArticleByProperty('articleId'))
  /**
   * @api {delete} /api/v1/articles/{articleId}
   * @apiName softDeleteArticle
   * @apiVersion 1.0.0
   * @apiGroup Article
   * @apiPermission ARTICLE_AUTHOR
   *
   * @apiDescription It will softdelete the article. Article will not be seen anywhere in the system till the deleted_at field removed.
   *
   * @apiSuccessExample {json} Success-Response:
   *     HTTP/1.1 204 No Content
   */
  .delete(mw.isAuthenticated, mw.isAdminOrArticleAuthor, softDeleteArticle)

router.route('/:slug')
  /**
   * @api {get} /api/v1/articles/{slug}
   * @apiName getArticleBySlug
   * @apiVersion 1.0.0
   * @apiGroup Article
   * @apiPermission GUEST
   * @apiDescription Is returning the request article by slug.
   *
   * @apiSuccess {Object} article The requested article object.
   * @apiSuccess {Boolean} success The status of the transaction.
   */
  .get(getArticleByProperty('slug'))

function createArticle (req, res) {
  let article = new Article(req.body)

  article.author = {
    _id: req.decoded._doc._id,
    name: req.decoded._doc.name,
    surname: req.decoded._doc.surname
  }

  if (req.file !== undefined) {
    uploadFile(req.file, imgDirectory).then(() => {
      article.image = `/images/${req.file.originalname}`
      saveArticle(article, res)
    }).catch(handleErrors(res))
  } else {
    saveArticle(article, res)
  }
}

function saveArticle (article, res) {
  article.save((err) => {
    if (!err) {
      res.json(article)
    } else {
      handleErrors(res)
    }
  })
}

function handleErrors (res) {
  return (err) => {
    res.status(400).json({
      error: err
    })
  }
}

function getArticleByProperty (property) {
  return function (req, res) {
    let query = {
      deleted_at: {
        '$exists': false
      }
    }

    if (property === 'slug') {
      query.slug = req.params[property]
    } else {
      query._id = req.params[property]
    }

    Article
      .findOne(query)
      .then((article) => {
        if (article) {
          res.json(article)
        } else {
          res.status(404).json({
            error: utils.messages.ARTICLE_NOT_FOUND
          })
        }
      })
      .catch(handleErrors(res))
  }
}

function updateArticle (req, res) {
  if (req.body.title !== undefined) {
    req.body.slug = utils.slugify(req.body.title)
  }

  if (req.body._id !== undefined) delete req.body._id

  if (req.file !== undefined) {
    uploadFile(req.file, imgDirectory).then(() => {
      req.body.image = `/images/${req.file.originalname}`
      Article.update({
        _id: req.params.articleId
      }, {
        '$set': req.body
      }).then(handleSuccess, handleErrors(res))
    })
      .catch(handleErrors(res))
  } else {
    Article.update({
      _id: req.params.articleId
    }, {
      '$set': req.body
    }).then(handleSuccess)
      .catch(handleErrors(res))
  }

  function handleSuccess (result) {
    Article.findOne({
      _id: req.params.articleId
    })
      .then(article => res.json(article))
      .catch(handleErrors(res))
  }
}

function softDeleteArticle (req, res) {
  Article
    .update({
      _id: req.params.articleId
    }, {
      $set: {
        deleted_at: new Date()
      }
    })
    .then((result) => {
      // 204 No Content
      res.status(204).end()
    })
    .catch(handleErrors(res))
}

function findArticles (req, res) {
  let filters = fe.extract(req.query.filter)
  let limit = parseInt(req.query.limit) || null
  let offset = parseInt(req.query.offset) || null
  let query = qb.build(filters)
  let builder = Article.find(query)

  if (offset) {
    builder.offset(offset)
  }

  if (limit) {
    builder.limit(limit)
  }

  let stream = builder.cursor()
  res.set('Content-Type', 'application/json')
  stream.pipe(JSONStream.stringify()).pipe(res)
}
