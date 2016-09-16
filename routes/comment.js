(() => {
    "use strict";

    const Router = require('express').Router(),
        utils = require('../helpers/utils'),
        middlewares = require('../middlewares/middlewares'),
        Article = require('../models/article');

    Router.post('/:articleId/comments', middlewares.isAuthenticated, (req, res) => {
        let comment = {
            message: req.body.message,
            author: {
                _id: req.decoded._doc._id,
                name: req.decoded._doc.name,
                surname: req.decoded._doc.surname
            }
        };

        Article.update({
            _id: req.params.articleId,
        }, {
            "$push": {
                comments: comment
            }

        }).then(sendSuccess, sendFail);

        function sendSuccess(resp) {

            Article.findOne({
                _id: req.params.articleId
            }, {
                comments: true
            }).then((article) => {
                console.log(article);
                res.json({
                    success: true,
                    comments: article.comments
                });
            }, sendFail);

        }

        function sendFail(err) {
            res.json({
                success: false,
                message: utils.messages.COMMENT_CREATE_FAIL
            });
        }
    });

    module.exports = Router;
})();