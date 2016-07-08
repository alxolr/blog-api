(() => {
  "use strict";
  const express = require('express'),
    app = express(),
    pdfService = require('./services/pdf.service');

  app.set("view engine", "ejs");

  app.get('/', (req, res) => {
    pdfService({
      "projects": [{
        "name": "Little Fashion Gallery"
      }]
    }, err => res.end('The file was prepared for download, proceed at http://localhost:8080/download'));
  });
  app.get('/download', function(req, res) {
    res.download('output.pdf');
  });

  app.listen(8080, () => console.log('APP is working!'));

})();
