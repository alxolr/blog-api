'use strict'

let mongoose = require('mongoose')
let Schema = mongoose.Schema
let utils = require('../services/utils')
let config = require('config')
let security = require('../services/security')(config)

const USER_RIGHTS = 'USER'

const UserSchema = new Schema({
  'firstname': {
    type: String,
    required: false
  },
  'lastname': {
    type: String,
    required: false
  },
  'password': {
    type: String,
    required: [true, utils.messages.PASSWORD_REQUIRED]
  },
  'email': {
    type: String,
    required: [true, utils.messages.EMAIL_REQUIRED],
    validate: {
      validator: (v, cb) => {
        setTimeout(() => {
          cb(/^[a-z._0-9]+@[a-z]+\.\w+$/gi.test(v))
        }, 0)
      },
      message: `{VALUE} is not a valid email address`
    },
    index: {
      unique: true,
      dropDups: true
    }
  },
  'rights': {
    type: Array,
    default: [USER_RIGHTS]
  },
  'created_at': Date,
  'updated_at': Date,
  'deleted_at': Date,
  'is_subscribed': {
    type: Boolean,
    default: true
  }
})

UserSchema.pre('save', function (next) {
  this.password = security.hashify(this.password)

  if (!this.created_at) {
    this.created_at = new Date()
  }

  this.updated_at = new Date()
  next()
})

UserSchema.pre('update', function (next) {
  this.update({}, {
    $set: {
      updated_at: new Date()
    }
  })
  next()
})

module.exports = mongoose.model('User', UserSchema)
