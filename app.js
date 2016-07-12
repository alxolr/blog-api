(() => {
  "use strict";
  const express = require('express'),
    app = express(),
    configs = require('./configs/config'),
    cluster = require('cluster');

    if (cluster.isMaster) {
      const cpus = require('os').cpus().length;

      for (let i = 0; i < cpus; i++) {
        cluster.fork();
      }

    } else {
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
    }
})();
