'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const utils = require('../services/utils')

const AuthorSchema = new Schema({
  firstname: String,
  lastname: String
})

const CommentsSchema = new Schema({
  author: AuthorSchema,
  message: { type: String, required: true },
  created_at: { type: Date, default: new Date() },
  updated_at: { type: Date, required: true }
})

const ArticleSchema = new Schema({
  'title': {
    type: String,
    required: true
  },
  'category': [],
  'slug': {
    type: String,
    index: {
      unique: true,
      dropDups: true
    }
  },
  'body': {
    type: String,
    required: true
  },
  'author': {
    type: {
      _id: String,
      firstname: String,
      lastname: String
    },
    required: true
  },
  tags: String,
  'created_at': Date,
  'updated_at': Date,
  'deleted_at': Date,
  'comments': [CommentsSchema],
  image: String
})

ArticleSchema.pre('save', function (next) {
  if (!this.created_at) {
    this.created_at = new Date()
  }

  this.slug = utils.slugify(this.title)
  this.updated_at = new Date()
  next()
})

ArticleSchema.pre('update', function (next) {
  this.update({}, {
    $set: {
      updated_at: new Date()
    }
  })
  next()
})

module.exports = mongoose.model('Article', ArticleSchema)
