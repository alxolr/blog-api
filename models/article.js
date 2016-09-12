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
            required: true,
            index: {
                unique: true,
                dropDups: true,
            }
        },
        'body': {
            type: String,
            required: true
        },
        'author': {
            type: {
                _id: String,
                name: String,
                surname: String
            },
            required: true
        },
        tags: String,
        'created_at': Date,
        'updated_at': Date,
        'comments': {
            type: [{
                author: {
                    type: {
                        _id: String,
                        name: String,
                        surname: String
                    },
                    required: true
                },
                created_at: {
                    type: Date,
                    default: new Date(),
                },
                message: String
            }],
            required: false
        },
        img: String
    });

    ArticleSchema.pre('save', function(next) {
        if (!this.created_at) {
            this.created_at = new Date();
        }

        this.updated_at = new Date();

        next();
    });

    ArticleSchema.pre('update', function(next) {
        this.update({}, {
            $set: {
                updated_at: new Date()
            }
        });
        next();
    });

    module.exports = mongoose.model('Article', ArticleSchema);
})();