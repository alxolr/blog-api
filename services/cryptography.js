const crypto = require('crypto')
const algorithm = 'aes-256-ctr'

function isJsonString (str) {
  try {
    JSON.parse(str)
  } catch (e) {
    return false
  }
  return true
}

module.exports = (config) => {
  config = {
    cipher: config.cipher || 'somerandomcipher'
  }

  return {
    encrypt: (encryptable) => {
      if (typeof encryptable === 'object') {
        encryptable = JSON.stringify(encryptable)
      }

      const cipher = crypto.createCipher(algorithm, config.cipher)
      let crypted = cipher.update(encryptable, 'utf8', 'hex')
      crypted += cipher.final('hex')

      return {crypted}
    },

    decrypt: (encrypted) => {
      const decipher = crypto.createDecipher(algorithm, config.cipher)
      let decrypted = decipher.update(encrypted.crypted, 'hex', 'utf8')
      decrypted += decipher.final('utf8')

      if (isJsonString(decrypted)) {
        return JSON.parse(decrypted)
      }

      return decrypted
    }
  }
}
