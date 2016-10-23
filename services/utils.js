(() => {
  'use strict'

  module.exports = {
    listifyErrors: (err) => {
      let errorMessages = []
      for (let property in err.errors) {
        errorMessages.push({
          'property': property,
          'message': err.errors[property].message
        })
      }

      if (err.hasOwnProperty('message')) {
        errorMessages.push(err.message)
      }

      return errorMessages
    },

    slugify: text => {
      return text.toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w-]+/g, '')
    },

    mongo: {
      UNIQUE_KEY_VIOLATION: 11000
    },
    messages: {
      PASSWORD_REQUIRED: 'User should provide a password.',
      EMAIL_REQUIRED: 'User should provide a valid email address.',
      INVALID_CREDENTIALS: 'The provided email and password does not match.',
      USER_DUPLICATE: 'User already registered in the system.',
      USER_NOT_FOUND: 'Requested user not found.',
      TOKEN_NOT_PROVIDED: 'Access denied. Please provide a token.',
      TOKEN_EXPIRED: 'Access denied. Provided token or invalid or expired',
      TOKEN_HIGHJACKED: 'Access denied. Provided token was highjacked',
      MONGOID_INVALID: 'Provided ID is not a valid one.',
      ARTICLE_NOT_FOUND: 'Requested article was not found',
      COMMENT_CREATE_FAIL: 'The comment was not been succesfull'
    }
  }
})()
