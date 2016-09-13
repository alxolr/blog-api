(() => {
    "use strict";

    /**
     * Facade to get the needed environment
     */
    exports.get = (env) => {
        switch (env) {
            case 'dev':
                return require('./configs/dev');
            case 'prod':
                return require('./configs/prod');
            case 'test':
                return require('./configs/test');
            default:
                return require('./configs/dev');
        }
    }
})();