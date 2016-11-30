'use strict'
const fs = require('fs')

/**
 * Upload a file into a directory
 */
const uploadFile = (file, directory) => {
  // use the es6 promises to work with async data
  return new Promise((resolve, reject) => {
    fs.access(directory, fs.constants.F_OK, (err) => {
      if (err) {
        fs.mkdirSync(directory)
      }

      // using nodejs streams to gain performance
      let readable = fs.createReadStream(file.path)
      let writable = fs.createWriteStream(`${directory}/${file.originalname}`)
      readable.pipe(writable)

      // attach the end event to remove the initial file
      readable.on('end', () => {
        fs.unlink(file.path, (err) => {
          if (err) reject(err)
          resolve()
        })
      })
    })
  })
}

module.exports = uploadFile
