(() => {
    "use strict";

    module.exports = {
        port: process.env.PORT || 8080,
        database: process.env.MONGO_URI || 'mongodb://localhost:27017/blog'
    };

})();