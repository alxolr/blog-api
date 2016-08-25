(() => {
    "use strict";

    module.exports = Object.freeze({
        port: process.env.PORT || 8080,
        database: process.env.MONGO_URI || 'mongodb://localhost:27017/blog',
        secretKey: 'MegaSuperSecretKeyImpossibleToCrack',
        salt: "oyoutamago"
    });

})();