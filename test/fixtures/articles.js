const ObjectId = require('mongodb').ObjectID
const utils = require('../../services/utils')

let articles = [
  {
    _id: new ObjectId('585bdd93cacd525c91e177dd'),
    title: 'Some random softedelete article',
    category: ['articles', 'frontend'],
    slug: utils.slugify('Some random softedelete article'),
    body: `Officia est veniam proident ullamco do eu enim. Elit ad Lorem veniam eiusmod qui officia deserunt sunt et consequat et nisi ipsum sunt. Nulla occaecat voluptate in labore ex cillum voluptate laborum exercitation aute sint elit fugiat ea. Exercitation Lorem culpa Lorem dolor laborum ut commodo.\r\nLorem in sunt Lorem tempor adipisicing dolore veniam magna velit nulla aliqua ipsum sunt. Ex laboris dolor veniam et id do irure dolor incididunt laboris sunt pariatur. Id dolore aliqua esse qui veniam fugiat nulla sunt consectetur qui.\r\nExercitation et sunt excepteur sunt et ex dolore do anim proident velit amet. Magna aliqua Lorem voluptate est dolore pariatur aute est ex aute laboris esse irure anim. Commodo id nostrud quis laborum sint anim non nulla sint est. Duis in non et aliquip irure velit ad nisi quis. Eiusmod velit amet est ex voluptate amet occaecat adipisicing nostrud veniam excepteur.\r\nOfficia reprehenderit culpa aliqua nostrud sunt labore sit ea sint non aute sit voluptate officia. Qui id elit ut non aliquip. Do fugiat voluptate laborum officia et ex sint tempor amet eiusmod pariatur aliqua amet. Non dolore magna magna id aliqua sunt pariatur elit. Est anim mollit est laborum deserunt non officia.\r\nAliqua cupidatat cupidatat ea dolore culpa laborum. Adipisicing eiusmod anim irure magna enim id excepteur ullamco excepteur pariatur excepteur eu. Culpa elit dolore fugiat occaecat dolore elit irure consectetur cillum Lorem eu. Cupidatat magna qui velit velit id reprehenderit.\r\nLabore esse aliqua nulla ipsum laboris cupidatat pariatur ea Lorem ullamco eiusmod. Deserunt dolore minim qui ut cupidatat. Cupidatat elit laborum pariatur pariatur consectetur. Aute adipisicing reprehenderit laborum irure occaecat irure non sunt deserunt dolor voluptate. Dolor laboris commodo adipisicing anim. Nulla esse consequat duis consequat veniam aliqua voluptate Lorem deserunt culpa anim.\r\nLaborum aliquip labore non fugiat ullamco eu. Do eiusmod laborum esse dolore enim quis cillum excepteur reprehenderit ea enim. Sint anim qui culpa reprehenderit ea consectetur exercitation eu. Nostrud occaecat commodo nostrud cillum consectetur nulla non incididunt incididunt incididunt nulla veniam nostrud.\r\nUt ut adipisicing nulla esse. Exercitation et labore ullamco aliqua aliqua cupidatat sint dolor commodo excepteur. Anim esse esse et consequat sit ea ad culpa adipisicing dolore cupidatat. Anim et sint ad labore minim est amet id Lorem laborum deserunt ea. Dolore consequat non labore deserunt laboris enim reprehenderit ex cillum laborum adipisicing in.\r\nUt sunt elit magna ex qui ad mollit irure tempor esse laboris minim eu. Consectetur pariatur culpa aliqua incididunt laborum eiusmod. Irure Lorem ipsum ipsum aliqua ex laboris laborum non qui ad nulla. Laboris culpa incididunt deserunt adipisicing non occaecat. Lorem eu sint tempor Lorem elit. Laboris aliqua non occaecat eu occaecat cillum ipsum non dolor commodo aliquip minim eiusmod.\r\nTempor irure esse anim veniam ipsum deserunt adipisicing qui pariatur deserunt sunt elit tempor. Ex tempor eu incididunt reprehenderit ipsum mollit ut id sint. Aliquip nostrud culpa do tempor ipsum non dolore nisi.\r\n`,
    author: {
      _id: '582ed973861cf81df5018309',
      firstname: 'Alex',
      lastname: 'Scripca'
    },
    created_at: new Date(2016, 12, 21),
    updated_at: new Date(),
    deleted_at: new Date(),
    comments: []
  },
  {
    _id: new ObjectId('582f0266019cd449e3771955'),
    title: 'Angular is the mother of all js projects',
    category: ['articles', 'frontend'],
    slug: utils.slugify('Angular is the mother of all js projects'),
    body: `Officia est veniam proident ullamco do eu enim. Elit ad Lorem veniam eiusmod qui officia deserunt sunt et consequat et nisi ipsum sunt. Nulla occaecat voluptate in labore ex cillum voluptate laborum exercitation aute sint elit fugiat ea. Exercitation Lorem culpa Lorem dolor laborum ut commodo.\r\nLorem in sunt Lorem tempor adipisicing dolore veniam magna velit nulla aliqua ipsum sunt. Ex laboris dolor veniam et id do irure dolor incididunt laboris sunt pariatur. Id dolore aliqua esse qui veniam fugiat nulla sunt consectetur qui.\r\nExercitation et sunt excepteur sunt et ex dolore do anim proident velit amet. Magna aliqua Lorem voluptate est dolore pariatur aute est ex aute laboris esse irure anim. Commodo id nostrud quis laborum sint anim non nulla sint est. Duis in non et aliquip irure velit ad nisi quis. Eiusmod velit amet est ex voluptate amet occaecat adipisicing nostrud veniam excepteur.\r\nOfficia reprehenderit culpa aliqua nostrud sunt labore sit ea sint non aute sit voluptate officia. Qui id elit ut non aliquip. Do fugiat voluptate laborum officia et ex sint tempor amet eiusmod pariatur aliqua amet. Non dolore magna magna id aliqua sunt pariatur elit. Est anim mollit est laborum deserunt non officia.\r\nAliqua cupidatat cupidatat ea dolore culpa laborum. Adipisicing eiusmod anim irure magna enim id excepteur ullamco excepteur pariatur excepteur eu. Culpa elit dolore fugiat occaecat dolore elit irure consectetur cillum Lorem eu. Cupidatat magna qui velit velit id reprehenderit.\r\nLabore esse aliqua nulla ipsum laboris cupidatat pariatur ea Lorem ullamco eiusmod. Deserunt dolore minim qui ut cupidatat. Cupidatat elit laborum pariatur pariatur consectetur. Aute adipisicing reprehenderit laborum irure occaecat irure non sunt deserunt dolor voluptate. Dolor laboris commodo adipisicing anim. Nulla esse consequat duis consequat veniam aliqua voluptate Lorem deserunt culpa anim.\r\nLaborum aliquip labore non fugiat ullamco eu. Do eiusmod laborum esse dolore enim quis cillum excepteur reprehenderit ea enim. Sint anim qui culpa reprehenderit ea consectetur exercitation eu. Nostrud occaecat commodo nostrud cillum consectetur nulla non incididunt incididunt incididunt nulla veniam nostrud.\r\nUt ut adipisicing nulla esse. Exercitation et labore ullamco aliqua aliqua cupidatat sint dolor commodo excepteur. Anim esse esse et consequat sit ea ad culpa adipisicing dolore cupidatat. Anim et sint ad labore minim est amet id Lorem laborum deserunt ea. Dolore consequat non labore deserunt laboris enim reprehenderit ex cillum laborum adipisicing in.\r\nUt sunt elit magna ex qui ad mollit irure tempor esse laboris minim eu. Consectetur pariatur culpa aliqua incididunt laborum eiusmod. Irure Lorem ipsum ipsum aliqua ex laboris laborum non qui ad nulla. Laboris culpa incididunt deserunt adipisicing non occaecat. Lorem eu sint tempor Lorem elit. Laboris aliqua non occaecat eu occaecat cillum ipsum non dolor commodo aliquip minim eiusmod.\r\nTempor irure esse anim veniam ipsum deserunt adipisicing qui pariatur deserunt sunt elit tempor. Ex tempor eu incididunt reprehenderit ipsum mollit ut id sint. Aliquip nostrud culpa do tempor ipsum non dolore nisi.\r\n`,
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
    body: `Officia est veniam proident ullamco do eu enim. Elit ad Lorem veniam eiusmod qui officia deserunt sunt et consequat et nisi ipsum sunt. Nulla occaecat voluptate in labore ex cillum voluptate laborum exercitation aute sint elit fugiat ea. Exercitation Lorem culpa Lorem dolor laborum ut commodo.\r\nLorem in sunt Lorem tempor adipisicing dolore veniam magna velit nulla aliqua ipsum sunt. Ex laboris dolor veniam et id do irure dolor incididunt laboris sunt pariatur. Id dolore aliqua esse qui veniam fugiat nulla sunt consectetur qui.\r\nExercitation et sunt excepteur sunt et ex dolore do anim proident velit amet. Magna aliqua Lorem voluptate est dolore pariatur aute est ex aute laboris esse irure anim. Commodo id nostrud quis laborum sint anim non nulla sint est. Duis in non et aliquip irure velit ad nisi quis. Eiusmod velit amet est ex voluptate amet occaecat adipisicing nostrud veniam excepteur.\r\nOfficia reprehenderit culpa aliqua nostrud sunt labore sit ea sint non aute sit voluptate officia. Qui id elit ut non aliquip. Do fugiat voluptate laborum officia et ex sint tempor amet eiusmod pariatur aliqua amet. Non dolore magna magna id aliqua sunt pariatur elit. Est anim mollit est laborum deserunt non officia.\r\nAliqua cupidatat cupidatat ea dolore culpa laborum. Adipisicing eiusmod anim irure magna enim id excepteur ullamco excepteur pariatur excepteur eu. Culpa elit dolore fugiat occaecat dolore elit irure consectetur cillum Lorem eu. Cupidatat magna qui velit velit id reprehenderit.\r\nLabore esse aliqua nulla ipsum laboris cupidatat pariatur ea Lorem ullamco eiusmod. Deserunt dolore minim qui ut cupidatat. Cupidatat elit laborum pariatur pariatur consectetur. Aute adipisicing reprehenderit laborum irure occaecat irure non sunt deserunt dolor voluptate. Dolor laboris commodo adipisicing anim. Nulla esse consequat duis consequat veniam aliqua voluptate Lorem deserunt culpa anim.\r\nLaborum aliquip labore non fugiat ullamco eu. Do eiusmod laborum esse dolore enim quis cillum excepteur reprehenderit ea enim. Sint anim qui culpa reprehenderit ea consectetur exercitation eu. Nostrud occaecat commodo nostrud cillum consectetur nulla non incididunt incididunt incididunt nulla veniam nostrud.\r\nUt ut adipisicing nulla esse. Exercitation et labore ullamco aliqua aliqua cupidatat sint dolor commodo excepteur. Anim esse esse et consequat sit ea ad culpa adipisicing dolore cupidatat. Anim et sint ad labore minim est amet id Lorem laborum deserunt ea. Dolore consequat non labore deserunt laboris enim reprehenderit ex cillum laborum adipisicing in.\r\nUt sunt elit magna ex qui ad mollit irure tempor esse laboris minim eu. Consectetur pariatur culpa aliqua incididunt laborum eiusmod. Irure Lorem ipsum ipsum aliqua ex laboris laborum non qui ad nulla. Laboris culpa incididunt deserunt adipisicing non occaecat. Lorem eu sint tempor Lorem elit. Laboris aliqua non occaecat eu occaecat cillum ipsum non dolor commodo aliquip minim eiusmod.\r\nTempor irure esse anim veniam ipsum deserunt adipisicing qui pariatur deserunt sunt elit tempor. Ex tempor eu incididunt reprehenderit ipsum mollit ut id sint. Aliquip nostrud culpa do tempor ipsum non dolore nisi.\r\n`,
    author: {
      _id: new ObjectId('582ed973861cf81df5018309'),
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
    body: `Officia est veniam proident ullamco do eu enim. Elit ad Lorem veniam eiusmod qui officia deserunt sunt et consequat et nisi ipsum sunt. Nulla occaecat voluptate in labore ex cillum voluptate laborum exercitation aute sint elit fugiat ea. Exercitation Lorem culpa Lorem dolor laborum ut commodo.\r\nLorem in sunt Lorem tempor adipisicing dolore veniam magna velit nulla aliqua ipsum sunt. Ex laboris dolor veniam et id do irure dolor incididunt laboris sunt pariatur. Id dolore aliqua esse qui veniam fugiat nulla sunt consectetur qui.\r\nExercitation et sunt excepteur sunt et ex dolore do anim proident velit amet. Magna aliqua Lorem voluptate est dolore pariatur aute est ex aute laboris esse irure anim. Commodo id nostrud quis laborum sint anim non nulla sint est. Duis in non et aliquip irure velit ad nisi quis. Eiusmod velit amet est ex voluptate amet occaecat adipisicing nostrud veniam excepteur.\r\nOfficia reprehenderit culpa aliqua nostrud sunt labore sit ea sint non aute sit voluptate officia. Qui id elit ut non aliquip. Do fugiat voluptate laborum officia et ex sint tempor amet eiusmod pariatur aliqua amet. Non dolore magna magna id aliqua sunt pariatur elit. Est anim mollit est laborum deserunt non officia.\r\nAliqua cupidatat cupidatat ea dolore culpa laborum. Adipisicing eiusmod anim irure magna enim id excepteur ullamco excepteur pariatur excepteur eu. Culpa elit dolore fugiat occaecat dolore elit irure consectetur cillum Lorem eu. Cupidatat magna qui velit velit id reprehenderit.\r\nLabore esse aliqua nulla ipsum laboris cupidatat pariatur ea Lorem ullamco eiusmod. Deserunt dolore minim qui ut cupidatat. Cupidatat elit laborum pariatur pariatur consectetur. Aute adipisicing reprehenderit laborum irure occaecat irure non sunt deserunt dolor voluptate. Dolor laboris commodo adipisicing anim. Nulla esse consequat duis consequat veniam aliqua voluptate Lorem deserunt culpa anim.\r\nLaborum aliquip labore non fugiat ullamco eu. Do eiusmod laborum esse dolore enim quis cillum excepteur reprehenderit ea enim. Sint anim qui culpa reprehenderit ea consectetur exercitation eu. Nostrud occaecat commodo nostrud cillum consectetur nulla non incididunt incididunt incididunt nulla veniam nostrud.\r\nUt ut adipisicing nulla esse. Exercitation et labore ullamco aliqua aliqua cupidatat sint dolor commodo excepteur. Anim esse esse et consequat sit ea ad culpa adipisicing dolore cupidatat. Anim et sint ad labore minim est amet id Lorem laborum deserunt ea. Dolore consequat non labore deserunt laboris enim reprehenderit ex cillum laborum adipisicing in.\r\nUt sunt elit magna ex qui ad mollit irure tempor esse laboris minim eu. Consectetur pariatur culpa aliqua incididunt laborum eiusmod. Irure Lorem ipsum ipsum aliqua ex laboris laborum non qui ad nulla. Laboris culpa incididunt deserunt adipisicing non occaecat. Lorem eu sint tempor Lorem elit. Laboris aliqua non occaecat eu occaecat cillum ipsum non dolor commodo aliquip minim eiusmod.\r\nTempor irure esse anim veniam ipsum deserunt adipisicing qui pariatur deserunt sunt elit tempor. Ex tempor eu incididunt reprehenderit ipsum mollit ut id sint. Aliquip nostrud culpa do tempor ipsum non dolore nisi.\r\n`,
    author: {
      _id: new ObjectId('582ed973861cf81df5018309'),
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
    body: `Officia est veniam proident ullamco do eu enim. Elit ad Lorem veniam eiusmod qui officia deserunt sunt et consequat et nisi ipsum sunt. Nulla occaecat voluptate in labore ex cillum voluptate laborum exercitation aute sint elit fugiat ea. Exercitation Lorem culpa Lorem dolor laborum ut commodo.\r\nLorem in sunt Lorem tempor adipisicing dolore veniam magna velit nulla aliqua ipsum sunt. Ex laboris dolor veniam et id do irure dolor incididunt laboris sunt pariatur. Id dolore aliqua esse qui veniam fugiat nulla sunt consectetur qui.\r\nExercitation et sunt excepteur sunt et ex dolore do anim proident velit amet. Magna aliqua Lorem voluptate est dolore pariatur aute est ex aute laboris esse irure anim. Commodo id nostrud quis laborum sint anim non nulla sint est. Duis in non et aliquip irure velit ad nisi quis. Eiusmod velit amet est ex voluptate amet occaecat adipisicing nostrud veniam excepteur.\r\nOfficia reprehenderit culpa aliqua nostrud sunt labore sit ea sint non aute sit voluptate officia. Qui id elit ut non aliquip. Do fugiat voluptate laborum officia et ex sint tempor amet eiusmod pariatur aliqua amet. Non dolore magna magna id aliqua sunt pariatur elit. Est anim mollit est laborum deserunt non officia.\r\nAliqua cupidatat cupidatat ea dolore culpa laborum. Adipisicing eiusmod anim irure magna enim id excepteur ullamco excepteur pariatur excepteur eu. Culpa elit dolore fugiat occaecat dolore elit irure consectetur cillum Lorem eu. Cupidatat magna qui velit velit id reprehenderit.\r\nLabore esse aliqua nulla ipsum laboris cupidatat pariatur ea Lorem ullamco eiusmod. Deserunt dolore minim qui ut cupidatat. Cupidatat elit laborum pariatur pariatur consectetur. Aute adipisicing reprehenderit laborum irure occaecat irure non sunt deserunt dolor voluptate. Dolor laboris commodo adipisicing anim. Nulla esse consequat duis consequat veniam aliqua voluptate Lorem deserunt culpa anim.\r\nLaborum aliquip labore non fugiat ullamco eu. Do eiusmod laborum esse dolore enim quis cillum excepteur reprehenderit ea enim. Sint anim qui culpa reprehenderit ea consectetur exercitation eu. Nostrud occaecat commodo nostrud cillum consectetur nulla non incididunt incididunt incididunt nulla veniam nostrud.\r\nUt ut adipisicing nulla esse. Exercitation et labore ullamco aliqua aliqua cupidatat sint dolor commodo excepteur. Anim esse esse et consequat sit ea ad culpa adipisicing dolore cupidatat. Anim et sint ad labore minim est amet id Lorem laborum deserunt ea. Dolore consequat non labore deserunt laboris enim reprehenderit ex cillum laborum adipisicing in.\r\nUt sunt elit magna ex qui ad mollit irure tempor esse laboris minim eu. Consectetur pariatur culpa aliqua incididunt laborum eiusmod. Irure Lorem ipsum ipsum aliqua ex laboris laborum non qui ad nulla. Laboris culpa incididunt deserunt adipisicing non occaecat. Lorem eu sint tempor Lorem elit. Laboris aliqua non occaecat eu occaecat cillum ipsum non dolor commodo aliquip minim eiusmod.\r\nTempor irure esse anim veniam ipsum deserunt adipisicing qui pariatur deserunt sunt elit tempor. Ex tempor eu incididunt reprehenderit ipsum mollit ut id sint. Aliquip nostrud culpa do tempor ipsum non dolore nisi.\r\n`,
    author: {
      _id: new ObjectId('582ed9b47713c21ea1b04f30'),
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
    body: `Officia est veniam proident ullamco do eu enim. Elit ad Lorem veniam eiusmod qui officia deserunt sunt et consequat et nisi ipsum sunt. Nulla occaecat voluptate in labore ex cillum voluptate laborum exercitation aute sint elit fugiat ea. Exercitation Lorem culpa Lorem dolor laborum ut commodo.\r\nLorem in sunt Lorem tempor adipisicing dolore veniam magna velit nulla aliqua ipsum sunt. Ex laboris dolor veniam et id do irure dolor incididunt laboris sunt pariatur. Id dolore aliqua esse qui veniam fugiat nulla sunt consectetur qui.\r\nExercitation et sunt excepteur sunt et ex dolore do anim proident velit amet. Magna aliqua Lorem voluptate est dolore pariatur aute est ex aute laboris esse irure anim. Commodo id nostrud quis laborum sint anim non nulla sint est. Duis in non et aliquip irure velit ad nisi quis. Eiusmod velit amet est ex voluptate amet occaecat adipisicing nostrud veniam excepteur.\r\nOfficia reprehenderit culpa aliqua nostrud sunt labore sit ea sint non aute sit voluptate officia. Qui id elit ut non aliquip. Do fugiat voluptate laborum officia et ex sint tempor amet eiusmod pariatur aliqua amet. Non dolore magna magna id aliqua sunt pariatur elit. Est anim mollit est laborum deserunt non officia.\r\nAliqua cupidatat cupidatat ea dolore culpa laborum. Adipisicing eiusmod anim irure magna enim id excepteur ullamco excepteur pariatur excepteur eu. Culpa elit dolore fugiat occaecat dolore elit irure consectetur cillum Lorem eu. Cupidatat magna qui velit velit id reprehenderit.\r\nLabore esse aliqua nulla ipsum laboris cupidatat pariatur ea Lorem ullamco eiusmod. Deserunt dolore minim qui ut cupidatat. Cupidatat elit laborum pariatur pariatur consectetur. Aute adipisicing reprehenderit laborum irure occaecat irure non sunt deserunt dolor voluptate. Dolor laboris commodo adipisicing anim. Nulla esse consequat duis consequat veniam aliqua voluptate Lorem deserunt culpa anim.\r\nLaborum aliquip labore non fugiat ullamco eu. Do eiusmod laborum esse dolore enim quis cillum excepteur reprehenderit ea enim. Sint anim qui culpa reprehenderit ea consectetur exercitation eu. Nostrud occaecat commodo nostrud cillum consectetur nulla non incididunt incididunt incididunt nulla veniam nostrud.\r\nUt ut adipisicing nulla esse. Exercitation et labore ullamco aliqua aliqua cupidatat sint dolor commodo excepteur. Anim esse esse et consequat sit ea ad culpa adipisicing dolore cupidatat. Anim et sint ad labore minim est amet id Lorem laborum deserunt ea. Dolore consequat non labore deserunt laboris enim reprehenderit ex cillum laborum adipisicing in.\r\nUt sunt elit magna ex qui ad mollit irure tempor esse laboris minim eu. Consectetur pariatur culpa aliqua incididunt laborum eiusmod. Irure Lorem ipsum ipsum aliqua ex laboris laborum non qui ad nulla. Laboris culpa incididunt deserunt adipisicing non occaecat. Lorem eu sint tempor Lorem elit. Laboris aliqua non occaecat eu occaecat cillum ipsum non dolor commodo aliquip minim eiusmod.\r\nTempor irure esse anim veniam ipsum deserunt adipisicing qui pariatur deserunt sunt elit tempor. Ex tempor eu incididunt reprehenderit ipsum mollit ut id sint. Aliquip nostrud culpa do tempor ipsum non dolore nisi.\r\n`,
    author: {
      _id: new ObjectId('582ed9a687fdc41e6c0d9ce9'),
      firstname: 'Johny',
      lastname: 'Depp'
    },
    created_at: new Date(2016, 4, 11),
    updated_at: new Date(),
    comments: [{
      _id: new ObjectId('58433b3e2c08a70259deca1d'),
      author: {
        _id: new ObjectId('582ed9b47713c21ea1b04f30'),
        firstname: 'France',
        lastname: 'Capca'
      },
      message: 'This article is not relevant at all',
      created_at: new Date(2015, 4, 11)
    }, {
      _id: new ObjectId('58433b31797f430225f0a4ef'),
      author: {
        _id: new ObjectId('582ed973861cf81df5018309'),
        firstname: 'Alex',
        lastname: 'Scripca'
      },
      message: 'I actually liked it',
      created_at: new Date(2016, 4, 11)
    }]
  }
]

module.exports = articles
