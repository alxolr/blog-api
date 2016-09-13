(() => {
    "use strict";

    module.exports = Object.freeze({
        port: process.env.PORT || 8081,
        database: process.env.MONGO_URI || 'mongodb://localhost:27017/blogtest',
        secretKey: 'MegaSuperSecretKeyImpossibleToCrackTest',
        salt: "oyoutamagotest"
    });
})();