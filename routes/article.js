const router = require('express').Router();
const mw = require('../middlewares/middlewares');
const Article = require('../models/article');
const utils = require('../services/utils');
const multer = require('multer');
const path = require('path');
const fe = require('../services/filter-extractor');
const qb = require('../services/query-builder');
const config = require('config');
const uploadFile = require('../services/upload-file');

const upload = multer({
  dest: '/tmp/',
});
const imgDirectory = path.resolve('images/');

module.exports = router;


function handleErrors(res) {
  return (err) => {
    res.status(400).json({
      error: utils.listifyErrors(err),
    });
  };
}

function saveArticle(article, res) {
  article.save((err) => {
    if (err) {
      return handleErrors(res)(err);
    }
    return res.json(article);
  });
}


function createArticle(req, res) {
  const article = new Article(req.body);
  article.author = {
    _id: req.decoded._id,
    name: req.decoded.firstname,
    surname: req.decoded.lastname,
  };

  if (req.file !== undefined) {
    uploadFile(req.file, imgDirectory).then(() => {
      article.image = `/images/${req.file.originalname}`;
      saveArticle(article, res);
    }).catch(handleErrors(res));
  } else {
    saveArticle(article, res);
  }
}

function getArticleByProperty(property) {
  return (req, res) => {
    const query = {
      deleted_at: {
        $exists: false,
      },
    };

    if (property === 'slug') {
      query.slug = req.params[property];
    } else {
      query._id = req.params[property];
    }

    Article
      .findOne(query)
      .then((article) => {
        if (article) {
          res.json(article);
        } else {
          res.status(404).json({
            error: utils.messages.ARTICLE_NOT_FOUND,
          });
        }
      })
      .catch(handleErrors(res));
  };
}

function updateArticle(req, res) {
  function handleSuccess() {
    Article.findOne({
      _id: req.params.articleId,
    })
      .then(article => res.json(article))
      .catch(handleErrors(res));
  }
  if (req.body.title !== undefined) {
    req.body.slug = utils.slugify(req.body.title);
  }

  if (req.body._id !== undefined) delete req.body._id;

  if (req.file !== undefined) {
    uploadFile(req.file, imgDirectory).then(() => {
      req.body.image = `/images/${req.file.originalname}`;
      Article.update(
        {
          _id: req.params.articleId,
        },
        {
          $set: req.body,
        }).then(handleSuccess, handleErrors(res));
    })
      .catch(handleErrors(res));
  } else {
    Article.update(
      {
        _id: req.params.articleId,
      },
      {
        $set: req.body,
      }).then(handleSuccess)
      .catch(handleErrors(res));
  }
}

function softDeleteArticle(req, res) {
  Article
    .update({
      _id: req.params.articleId,
    }, {
      $set: {
        deleted_at: new Date(),
      },
    })
    .then(() => {
      // 204 No Content
      res.status(204).end();
    })
    .catch(handleErrors(res));
}

function findArticles(req, res) {
  const filter = req.query.filter || null;
  const filters = fe.extract(filter);
  const limit = parseInt(req.query.limit) || config.perPage;
  const skip = parseInt(req.query.skip) || 0;
  const query = qb.build(filters);

  query.deleted_at = {
    $exists: false,
  };

  Article.find(query).count().lean().exec((err, count) => {
    if (err) handleErrors(res)(404);
    const results = Article.find(query).sort({ updated_at: -1 });
    results.limit(limit);
    results.skip(skip);

    results.lean().exec((err, articles) => {
      if (err) handleErrors(res)(404);
      const response = {
        count,
        limit,
        skip,
        articles,
      };

      return res.json(response);
    });
  });
}


router.get('', findArticles);
router.post('/', upload.single('image'), mw.isAuthenticated, createArticle);

router.route('/:articleId([0-9a-f]{24})')
  .put(upload.single('image'), mw.isAuthenticated, mw.isAdminOrArticleAuthor, updateArticle)
  .get(getArticleByProperty('articleId'))
  .delete(mw.isAuthenticated, mw.isAdminOrArticleAuthor, softDeleteArticle);

router.route('/:slug')
  .get(getArticleByProperty('slug'));
