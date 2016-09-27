(() => {
    "use strict";


    /**
     * Check if the given string is an boolean
     * 
     * @param {String} string
     * @returns {Boolean}
     */
    const isBoolean = (string) => {
        return (string === 'false') || (string === 'true');
    };

    const getOperator = (value) => {
        let operators = /^(>=|<=|>|<).+$/gmi.exec(value);
        if (operators && operators.length) {
            return operators[1];
        }

        return null;
    };

    const extractKeyValue = (pair) => {
        let pairs = pair.split('::');
        let extracted = pairs.reduce((prev, curr, index) => {
            if (index % 2 === 0) {
                prev.property = curr;
            } else {
                prev.operator = getOperator(curr);
                let value = curr.replace(prev.operator, "");
                if (isBoolean(value)) {
                    prev.value = value === "true";
                } else {
                    prev.value = value;
                }
            }
            return prev;
        }, {});

        return extracted;
    };

    const extractFilter = (filters) => {
        if (!filters) return null;
        let result = filters.split("|")
            .reduce((prev, curr, index) => {
                let pair = extractKeyValue(curr);
                prev.push(pair);

                return prev;
            }, []);

        return result;
    };

    exports.extract = extractFilter;
})();