(() => {
  "use strict";
  const express = require('express'),
    app         = express();

  app.set("view engine", "pug");

  app.get('/', (req, res) => {
    res.render('index', {
      title: 'Hi world',
    });
  });

  app.listen(8080, () => console.log('APP is working!'));
})();
