# alxolr/blog-api ![alt](https://travis-ci.org/alxolr/blog-api.svg?branch=master)

## Motivation
> The repository was created to help people to create single page applications using `angular`, `angular 2`, `react` or any other spa js frameworks. The repository is providing a RESTfull Api, ready to be used.
 

## Prerequisites
* `mongodb` [Install mongoDb](https://docs.mongodb.com/manual/installation/)
* `nodejs` version 6.x+ 
```bash
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```
* npm `sudo apt-get install npm`

## Global npm modules
* `npm install -g apidoc`  Used for generating the api documentation
* `npm install -g istanbul` Used to create the code coverage
* `npm install -g mocha` Used as a test runner

## Starting the project
+ Open the project folder and run `npm install`
+ run the command `node bin/fixtures-load.js` and will load the 
+ run the command `apidoc -e node_modules/` and it will generate the api documentation
+ optionally you can run `istanbul cover _mocha` in the same folder
+ finaly run `npm start` - to start the api server
+ `npm test` - to run the tests

## Routes
- to access the api documentation you can follow [Api Docs](http://localhost:3000/api/doc), after the server started.
- to access the code coverage reports you can follow [Code Coverage](http://localhost:3000/coverage), after the server started.