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


    const postArticle = (req, res) => {
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

    const putArticle = (req, res) => {
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
            .remove({
                _id: req.params.articleId
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

    router.post('/', upload.single('image'), mw.isAuthenticated, postArticle);

    router.route('/:articleId([0-9a-f]{24})')
        .put(upload.single('image'), mw.isAuthenticated, mw.isAdminOrArticleAuthor, putArticle)
        .get(getArticleBy('articleId'))
        .delete(deleteArticle);

    router.route('/:slug')
        .get(getArticleBy('slug'));

    module.exports = router;
})();