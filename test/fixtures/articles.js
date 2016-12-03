const ObjectId = require('mongodb').ObjectID
const utils = require('../../services/utils')

let articles = [
  {
    _id: new ObjectId('582f0266019cd449e3771955'),
    title: 'Angular is the mother of all js projects',
    category: ['articles', 'frontend'],
    slug: utils.slugify('Angular is the mother of all js projects'),
    body: `I expect angular to be one of the most usefull stuff in my quiver
    it is a well balanced frontend language where you can easily create programs
    and applications.`,
    author: {
      _id: '582ed973861cf81df5018309',
      firstname: 'Alex',
      lastname: 'Scripca'
    },
    created_at: new Date(2014, 10, 23),
    updated_at: new Date(),
    comments: []
  },
  {
    _id: new ObjectId('5832098580a5aa524e725cd2'),
    title: 'Started the job to be a master of nodejs programming',
    category: ['articles', 'frontend'],
    slug: utils.slugify('Started the job to be a master of nodejs programming'),
    body: `This is a quite interesting experience what to say, somewhat very interesting`,
    author: {
      _id: '582ed973861cf81df5018309',
      firstname: 'Alex',
      lastname: 'Scripca'
    },
    created_at: new Date(2013, 10, 23),
    updated_at: new Date(),
    comments: []
  },
  {
    _id: new ObjectId('582f003a45f3fc4394ac3544'),
    title: 'To be or not to be this is the question',
    category: ['articles', 'philosophy'],
    slug: utils.slugify('To be or not to be this is the question'),
    body: `This article is not about how to be or how is 
    to be it is just to make sure our life is good and can be acceptable for
    others. Sometimes is far better to not exist or to exist not as good
    but other times this stuff is not working as expected.`,
    author: {
      _id: '582ed973861cf81df5018309',
      firstname: 'Alex',
      lastname: 'Scripca'
    },
    created_at: new Date(2015, 11, 23),
    updated_at: new Date(),
    comments: []
  },
  {
    _id: new ObjectId('582f02fb9eb4af4c94da291d'),
    title: 'Lorem ipsum other stuff',
    category: ['articles', 'philosophy'],
    slug: utils.slugify('Lorem ipsum other stuff'),
    body: `This article is not about how to be or how is 
    to be it is just to make sure our life is good and can be acceptable for
    others. Other text usefull shit and something unbelivable awefull is going 
    on this types of fixtures`,
    author: {
      _id: '582ed9b47713c21ea1b04f30',
      firstname: 'France',
      lastname: 'Capca'
    },
    created_at: new Date(2012, 11, 23),
    updated_at: new Date(),
    comments: []
  }, {
    _id: new ObjectId('582f04d03f2df754121281c0'),
    title: 'Johny Depps life as a struggle',
    category: ['articles', 'biography'],
    slug: utils.slugify('Johny Depps life as a struggle'),
    body: `This article is not about how to be or how is 
    to be it is just to make sure our life is good and can be acceptable for
    others. Other text usefull shit and something unbelivable awefull is going 
    on this types of fixtures`,
    author: {
      _id: '582ed9a687fdc41e6c0d9ce9',
      firstname: 'Johny',
      lastname: 'Depp'
    },
    created_at: new Date(2016, 4, 11),
    updated_at: new Date(),
    comments: [{
      author: {
        _id: '582ed9b47713c21ea1b04f30',
        firstname: 'France',
        lastname: 'Capca'
      },
      message: 'This article is not relevant at all',
      created_at: new Date()
    }, {
      author: {
        _id: '582ed973861cf81df5018309',
        firstname: 'Alex',
        lastname: 'Scripca'
      },
      message: 'I actually liked it',
      created_at: new Date()
    }]
  }
]

module.exports = articles
