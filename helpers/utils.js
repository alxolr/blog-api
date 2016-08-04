(() => {
    "use strict";

    module.exports = {
        listifyErrors: (err) => {
            console.log(err);
            let errorMessages = [];
            for (let property in err.errors) {
                errorMessages.push({
                    "property": property,
                    "message": err.errors[property].message
                });
            }

            return errorMessages;
        }
    };
})();