(() => {
    "use strict";

    module.exports = {
        listifyErrors: (err) => {
            let errorMessages = [];
            for (let property in err.errors) {
                errorMessages.push({
                    "property": property,
                    "message": err.errors[property].message
                });
            }

            if (err.hasOwnProperty('message')) {
                errorMessages.push(err.message);
            }

            return errorMessages;
        },
        mongo: {
            UNIQUE_KEY_VIOLATION: 11000
        },
        messages: {
            PASSWORD_REQUIRED: "User should provided a password.",
            PASSWORD_NO_MATCH: "The provided password does not match.",
            EMAIL_REQUIRED: "User should provide a valid email address.",
            EMAIL_NO_MATCH: "The provided email was not found in the system.",
            USER_DUPLICATE: "User already registered in the system.",
            USER_CREATED_SUCCESS: "User was succesfully created.",
            USER_UPDATED_SUCCESS: "The user was successfully updated",
            USER_LOGGEDIN_SUCCESS: "The user was successfully logged in.",
            USER_NOT_FOUND: "Requested user not found.",
            INVALID_TOKEN: "Access denied. Please provide a token.",
            EXPIRED_TOKEN: "Access denied. Provided token invalid or expired",
            INVALID_MONGO_ID: "Provided ID is not a valid one."
        }
    };
})();