(() => {
    "use strict";
    const router = require('express').Router(),
        middlewares = require('../middlewares/middlewares'),
        Article = require('../models/article'),
        utils = require('../helpers/utils');

    router.post('/', middlewares.isAuthenticated, (req, res) => {
        let article = new Article(req.body);
        article.author = req.decoded._doc._id,
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

    module.exports = router;
})();