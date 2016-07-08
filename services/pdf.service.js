(() => {
  "use strict";
  const pdf = require('pdfkit');
  const fs = require('fs');

  module.exports = function(config, done) {
    let doc = new pdf();
    doc.pipe(fs.createWriteStream('output.pdf'));
    doc.fontSize(24);
    doc.text('CV - Olaru Alexandru');

    doc.fontSize(16);
    config.projects.forEach(project => {
       doc.text(project.name);
    });

    doc.end();

    done(null);
  };
})();
