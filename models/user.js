(() => {
    "use strict";
    const mongoose = require('mongoose'),
        Schema = mongoose.Schema,
        crypto = require('crypto');

    const USER_RIGHTS = 'USER';
    const ADMIN_RIGHTS = 'ADMIN';
    const PREMIUM_USER_RIGHTS = 'ADMIN';

    const UserSchema = new Schema({
        'name': {
            type: String,
            required: false
        },
        'surname': {
            type: String,
            required: false
        },
        'password': {
            type: String,
            required: [true, "User should provide a password."]
        },
        'email': {
            type: String,
            required: [true, "User should provide an email address."],
            validate: {
                validator: (v, cb) => {
                    setTimeout(() => {
                        cb(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(v));
                    }, 0);
                },
                message: `{VALUE} is not a valid email address`
            }
        },
        'rights': {
            type: Array,
            default: [USER_RIGHTS]
        },
        'created_at': Date,
        'updated_at': Date,
        'is_subscribed': {
            type: Boolean,
            default: true
        }
    });

    UserSchema.pre('save', function(next) {
        let password = this.password,
            hash = crypto.createHash('sha256');

        hash.update(password);

        this.password = hash.digest('hex');

        if (!this.created_at) {
            this.created_at = new Date();
        }

        this.updated_at = new Date();
        next();
    });

    module.exports = mongoose.model('User', UserSchema);
})();