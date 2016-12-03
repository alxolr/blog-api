const config = require('config')
const security = require('../../services/security')(config)
const ObjectId = require('mongodb').ObjectID

let users = [
  {
    _id: new ObjectId('582ed973861cf81df5018309'),
    firstname: 'Alex',
    lastname: 'Scripca',
    email: 'ascripca@joli.com',
    password: security.hashify('simplepassword'),
    created_at: new Date(),
    updated_at: new Date(),
    is_subscribed: true,
    rights: ['USER']
  },
  {
    _id: new ObjectId('582ed9a687fdc41e6c0d9ce9'),
    firstname: 'Jonhy',
    lastname: 'Depp',
    email: 'jdepp@gmail.com',
    password: security.hashify('simplepassword'),
    created_at: new Date(),
    updated_at: new Date(),
    is_subscribed: true,
    rights: ['USER']
  },
  {
    _id: new ObjectId('582ed9b47713c21ea1b04f30'),
    firstname: 'France',
    lastname: 'Capca',
    email: 'fcapca@torry.com',
    password: security.hashify('simplepassword'),
    created_at: new Date(),
    updated_at: new Date(),
    is_subscribed: true,
    rights: ['ADMIN']
  },
  {
    _id: new ObjectId('5842f7c99a5df037e33080a4'),
    firstname: 'Jimmy',
    lastname: 'Goenga',
    email: 'jgoenca@torry.com',
    password: security.hashify('simplepassword'),
    created_at: new Date(),
    updated_at: new Date(),
    is_subscribed: true,
    rights: ['USER']
  }
]

module.exports = users
