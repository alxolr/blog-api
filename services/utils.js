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
        slugify: text => {
            return text.toLowerCase()
                .replace(/ /g, '-')
                .replace(/[^\w-]+/g, '');
        },
        mongo: {
            UNIQUE_KEY_VIOLATION: 11000
        },
        messages: {
            PASSWORD_REQUIRED: "User should provide a password.",
            EMAIL_REQUIRED: "User should provide a valid email address.",
            INVALID_CREDENTIALS: "The provided email and password does not match.",
            USER_DUPLICATE: "User already registered in the system.",
            USER_CREATED_SUCCESS: "User was succesfully created.",
            USER_UPDATED_SUCCESS: "The user was successfully updated",
            USER_DELETED_SUCCESS: "The user was successfully deleted",
            USER_LOGGEDIN_SUCCESS: "The user was successfully logged in.",
            USER_NOT_FOUND: "Requested user not found.",
            TOKEN_NOT_PROVIDED: "Access denied. Please provide a token.",
            TOKEN_EXPIRED: "Access denied. Provided token or invalid or expired",
            TOKEN_HIGHJACKED: "Access denied. Provided token was highjacked",
            MONGOID_INVALID: "Provided ID is not a valid one.",
            ARTICLE_CREATE_SUCCESS: "Article was successfully created.",
            ARTICLE_UPDATE_SUCCESS: "Article was successfully updated.",
            ARTICLE_DELETE_SUCCESS: "Article was successfully deleted.",
            COMMENT_CREATE_SUCCESS: "The comment has been succesfully added",
            COMMENT_CREATE_FAIL: "The comment was not been succesfull"
        }
    };
})();