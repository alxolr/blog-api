(() => {
    "use strict";
    const fs = require('fs');

    /**
     * Upload a file into a directory
     */
    const uploadFile = (file, directory) => {
        return new Promise((resolve, reject) => {
            fs.access(directory, fs.constants.F_OK, (err) => {
                if (err) {
                    fs.mkdirSync(directory);
                }
                fs.readFile(file.path, function (err, data) {
                    if (err) reject(err);

                    fs.writeFile(`${directory}/${file.originalname}`, data, function (err) {
                        if (err) reject(err);

                        fs.unlink(file.path, (err) => {
                            if (err) reject(err);
                            resolve();
                        });
                    });
                });
            });
        });
    };

    module.exports = uploadFile;

})();