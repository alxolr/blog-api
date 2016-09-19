(() => {
    "use strict";
    const router = require('express').Router(),
        mw = require('../middlewares/middlewares'),
        Article = require('../models/article'),
        utils = require('../services/utils'),
        fs = require('fs'),
        multer = require('multer'),
        uploadFile = require('../services/upload-file'),
        upload = multer({
            dest: '/tmp/'
        });
    let imgDirectory = __dirname + '/../images';


    const createArticle = (req, res) => {
        let article = new Article(req.body);
        article.author = {
            _id: req.decoded._doc._id,
            name: req.decoded._doc.name,
            surname: req.decoded._doc.surname
        };
        if (req.file !== undefined) {
            uploadFile(req.file, imgDirectory).then(() => {
                article.image = `/images/${req.file.originalname}`;
                saveArticle(article, res);
            }).catch(handleErrors);
        } else {
            saveArticle(article, res);
        }
    };

    const getArticleBy = (property) => {
        return function(req, res) {
            let query = {
                deleted_at: {
                    '$exists': false
                }
            };
            if (property === "slug") {
                query.slug = req.params[property];
            } else {
                query._id = req.params[property];
            }
            Article
                .findOne(query)
                .then((article) => {
                    if (article) {
                        res.json({
                            success: true,
                            article: article
                        });
                    } else {
                        res.status(404).json({
                            success: false,
                            message: utils.messages.ARTICLE_NOT_FOUND
                        });
                    }
                })
                .catch(handleErrors);
        };
    };

    const updateArticle = (req, res) => {
        if (req.body.title !== undefined) {
            req.body.slug = utils.slugify(req.body.title);
        }
        if (req.file !== undefined) {
            uploadFile(req.file, imgDirectory)
                .then(() => {
                    req.body.image = `/images/${req.file.originalname}`;
                    Article.update({
                        _id: req.params.articleId
                    }, {
                        '$set': req.body
                    }).then(handleSuccess, handleErrors);
                })
                .catch(handleErrors);
        } else {
            Article.update({
                _id: req.params.articleId
            }, {
                '$set': req.body
            }).then(handleSuccess, handleErrors);
        }

        function handleSuccess(result) {
            Article.findOne({
                _id: req.params.articleId
            }).then(sendArticle, handleErrors);

            function sendArticle(article) {
                res.json({
                    success: true,
                    message: utils.messages.ARTICLE_UPDATE_SUCCESS,
                    article: article
                });
            }
        }
    };

    const deleteArticle = (req, res) => {
        Article
            .update({
                _id: req.params.articleId
            }, {
                $set: {
                    deleted_at: new Date()
                }
            })
            .then((result) => {
                res.json({
                    success: true,
                    message: utils.messages.ARTICLE_DELETE_SUCCESS
                });
            })
            .catch(handleErrors);
    };


    function handleErrors(err) {
        res.status(400).json({
            success: false,
            message: utils.listifyErrors(err)
        });
    }

    function saveArticle(article, res) {
        article.save((err) => {
            if (!err) {
                res.json({
                    success: true,
                    message: utils.messages.ARTICLE_CREATE_SUCCESS,
                    article: article
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: utils.listifyErrors(err)
                });
            }
        });
    }

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
    router.post('/', upload.single('image'), mw.isAuthenticated, createArticle);

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
        .get(getArticleBy('articleId'))
        .delete(deleteArticle);

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
        .get(getArticleBy('slug'));

    module.exports = router;
})();