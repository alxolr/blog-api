(() => {
    "use strict";

    const isBoolean = (string) => {
        return (string === 'false') || (string === 'true');
    }

    const extractKeyValue = (pair) => {
        let pairs = pair.split('::');
        let extracted = pairs.reduce((prev, curr, index) => {
            if (index % 2 === 0) {
                prev.lastkey = curr;
                prev.pair[curr] = "";
            } else {
                
                if (isBoolean(curr)) {
                    curr = curr === 'true';
                }

                prev.pair[prev.lastkey] = curr;
            }
            return prev;
        }, {
            lastkey: "",
            pair: {}
        });

        return extracted.pair;
    }

    const extractFilter = (filters) => {
        if (!filters) return null;
        let result = filters.split("|")
            .reduce((prev, curr, index) => {
                let pair = extractKeyValue(curr);
                let key = Object.keys(pair)[0];
                prev[key] = pair[key];

                return prev;
            }, {});

        return result;
    };

    exports.extract = extractFilter;
})();