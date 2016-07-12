(() => {
  "use strict";
  const express = require('express'),
    app = express(),
    configs = require('./configs/config');

  app.set('view engine', 'ejs');
  app.use(express.static('public'));

  app.get('/', (req, res) => {
    res.render('index', {
      title: "ALXOLR Homepage"
    });
  });

  app.listen(configs.PORT, () => {
    console.log('Application is running at http://localhost:' + configs.PORT + '/');
  });
})();
