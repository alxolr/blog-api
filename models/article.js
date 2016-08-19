(() => {
    'use strict';
    const mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    const ArticleSchema = new Schema({
        'title': {
            type: String,
            required: true
        },
        'category': [],
        'slug': {
            type: String,
            required: true
        },
        'body': {
            type: String,
            required: true
        },
        'author': {
            type: String,
            required: true
        },
        'created_at': Date,
        'udated_at': Date,
    });

    module.exports = mongoose.model('Article', ArticleSchema);
})();