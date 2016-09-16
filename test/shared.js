(() => {
    "use strict";
    process.env.NODE_ENV = 'test';
    const config = require('config');
    const server = require('../server');
    const User = require('../models/user');
    const chai = require('chai');
    const chaiHttp = require('chai-http');
    chai.use(chaiHttp);
    const should = chai.should();

    let user = {
        email: "dummyuser@mail.com",
        password: "dummypassword",
        name: "Johny",
        surname: "Bravo"
    };

    let article = {
        title: "Angular 2, be part of the future.",
        body: `
            This article seems very interesting, from the perspective of a new user,
            here you will find how to start codding an angular 2 application.
        `
    };

    let comment = {
        message: "This article is not that good as the people say"
    };

    exports.loginUser = (cb) => {
        let userObj = new User(this.user);
        userObj.save((err, doc) => {
            chai.request(server)
                .post('/api/v1/users/login')
                .send({
                    email: user.email,
                    password: user.password
                }).end((err, res) => {
                    cb(err, res.body.user, res.body.token);
                });
        });
    };

    exports.user = user;
    exports.article = article;
    exports.comment = comment;

})();