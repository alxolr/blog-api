(() => {
    "use strict";
    const router = require('express').Router(),
        middlewares = require('../middlewares/middlewares'),
        Article = require('../models/article'),
        utils = require('../helpers/utils'),
        fs = require('fs'),
        multer = require('multer'),
        upload = multer({dest: 'uploads/'});

    router.post('/', upload.single('img'), middlewares.isAuthenticated, (req, res) => {

        console.log(req.file);
        
        let article = new Article(req.body);
        article.author = {
            _id: req.decoded._doc._id,
            name: req.decoded._doc.name,
            surname: req.decoded._doc.surname
        };
        article.slug = utils.slugify(article.title);

        fs.readFile(req.file.path, function(err, data) {
            let newPath = __dirname + "/uploads/photos/";
            fs.writeFile(newPath, data, function(err) {
                article.save((err) => {
                    if (!err) {
                        res.json({
                            success: true,
                            message: utils.messages.ARTICLE_CREATE_SUCCESS,
                            article: article
                        });
                    } else {
                        res.json({
                            success: false,
                            message: utils.listifyErrors(err)
                        });
                    }
                });
            });
        }); 
    });

    router.route('/:articleId')
        .put(middlewares.isAuthenticated, (req, res) => {
            if (req.body.title !== undefined) {
                req.body.slug = utils.slugify(req.body.title);
            }

            Article.update({
                _id: req.params.articleId
            }, {
                '$set': req.body
            }).then(handleSuccess, handleErrors);

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
        //res will be taken from local scope
        res.json({
            success: false,
            message: utils.listifyErrors(err)
        });
    }

    module.exports = router;
})();