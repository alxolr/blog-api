(() => {
    "use strict";

    const extractFilter = (filters) => {
        if (!filters) return null;
        
        let keyVal = filters.split('::');
        let result = keyVal.reduce((prev, curr, index) => {
            if (index % 2 === 0) {
                prev.lastkey = curr;
                prev.result[curr] = "";
            } else {
                prev.result[prev.lastkey] = curr;
            }
            return prev;
        }, {
            lastkey: "",
            result: {}
        });

        return result.result;
    };

    exports.extract = extractFilter;

})();