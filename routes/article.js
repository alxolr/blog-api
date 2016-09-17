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

    router.post('/', upload.single('img'), mw.isAuthenticated, (req, res) => {
        let article = new Article(req.body);

        article.author = {
            _id: req.decoded._doc._id,
            name: req.decoded._doc.name,
            surname: req.decoded._doc.surname
        };

        article.slug = utils.slugify(article.title);

        if (req.file !== undefined) {
            uploadFile(req.file, imgDirectory).then(() => {
                article.img = `/images/${req.file.originalname}`;
                saveArticle(article, res);
            }).catch((err) => {
                res.status(400).json({
                    success: false,
                    message: "Something went wrong!"
                });
            });
        } else {
            saveArticle(article, res);
        }
    });

    router.route('/:articleId')
        .put(upload.single('img'), mw.isAuthenticated, mw.isAdminOrArticleAuthor, (req, res) => {

            if (req.body.title !== undefined) {
                req.body.slug = utils.slugify(req.body.title);
            }

            if (req.file !== undefined) {
                uploadFile(req.file, imgDirectory)
                    .then(() => {
                        req.body.img = `/images/${req.file.originalname}`;
                        Article.update({
                            _id: req.params.articleId
                        }, {
                            '$set': req.body
                        }).then(handleSuccess, handleErrors);
                    })
                    .catch((err) => {
                        res.status(400).json({
                            success: false,
                            message: err
                        });
                    });
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
        })
        .get((req, res) => {
            Article.findOne({
                _id: req.params.articleId
            }).then(returnArticle, handleErrors);

            function returnArticle(article) {
                res.json({
                    success: true,
                    article: article
                });
            }
        })
        .delete((req, res) => {
            Article.remove({
                _id: req.params.articleId
            }).then(returnSuccess).catch(handleErrors);

            function returnSuccess(result) {
                res.json({
                    success: true,
                    message: utils.messages.ARTICLE_DELETE_SUCCESS
                });
            }
        });

    function handleErrors(err) {
        res.json({
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


    module.exports = router;
})();