(() => {
    "use strict";
    process.env.NODE_ENV = 'test';

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

    exports.user = user;
    exports.article = article;
    exports.comment = comment;

})();