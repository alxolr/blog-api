(() => {
    "use strict";
    const router = require('express').Router(),
        middlewares = require('../middlewares/middlewares'),
        Article = require('../models/article'),
        utils = require('../helpers/utils');

    router.post('/', middlewares.isAuthenticated, (req, res) => {
        let article = new Article(req.body);
        article.author = {
            _id: req.decoded._doc._id,
            name: req.decoded._doc.name,
            surname: req.decoded._doc.surname
        };
        article.slug = utils.slugify(article.title);

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

    router.route('/:articleId')
        .put((req, res) => {

            if (req.body.title !== undefined) {
                req.body.slug = utils.slugify(req.body.title);
            }

            Article.update({
                _id: req.params.articleId
            }, {
                '$set': req.body
            }).then(handleSuccess, handleErrors);

            function handleSuccess(result) {
                console.log();

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
        });

    function handleErrors(err) {
        console.log(err);
        //res will be taken from local scope
        res.json({
            success: false,
            message: utils.listifyErrors(err)
        });
    }

    module.exports = router;
})();