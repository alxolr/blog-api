/* global describe it */
;(() => {
  'use strict'
  process.env.NODE_ENV = 'test'

  const assert = require('assert')
  const config = require('config')
  const cy = require('../services/cryptography')(config)

  describe('Cryptography', () => {
    it('should encrypt and decrypt a string', () => {
      assert.equal(cy.decrypt(cy.encrypt('vasile')), 'vasile')
    })
    it('should encrypt and decrypt an object', () => {
      let object = {
        'name': 'Anthony',
        'surname': 'Hopkins'
      }
      assert.deepEqual(cy.decrypt(cy.encrypt(object)), object)
    })
  })
})()
