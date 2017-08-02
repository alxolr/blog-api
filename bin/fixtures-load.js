const MongoClient = require('mongodb').MongoClient;
const async = require('async');
const fixtures = require('../test/fixtures');
const config = require('config');
const assert = require('assert');

function log(text) {
  console.log(text);
}

MongoClient.connect(config.database, (err, db) => {
  assert.equal(err, null);
  log(`Succesfully connected to ${config.database}`);

  function dropUsers(callback) {
    db.collection('users').remove({}, (err) => {
      assert.equal(err, null);
      log('Collection users succesfully removed');

      callback(null);
    });
  }

  function dropArticles(callback) {
    db.collection('articles').remove({}, (err) => {
      assert.equal(err, null);
      log('Collection articles succesfully removed');
      callback(null);
    });
  }

  function insertUser(user, cb) {
    db.collection('users').insertOne(user, (err) => {
      assert.equal(err, null);
      cb();
    });
  }

  function insertArticle(article, cb) {
    db.collection('articles').insertOne(article, (err) => {
      assert.equal(err, null);
      cb();
    });
  }

  async.parallel([
    dropUsers,
    dropArticles,
  ],
    (err) => {
      assert.equal(err, null);
      function insertUsers(cb) {
        async.map(fixtures.users, insertUser, (err) => {
          assert.equal(err, null);
          log(`Users collection was updated with ${fixtures.users.length} documents`);
          cb(null);
        });
      }
      function insertArticles(cb) {
        async.map(fixtures.articles, insertArticle, (err) => {
          assert.equal(err, null);
          log(`Article collection was updated with ${fixtures.articles.length} documents`);
          cb(null);
        });
      }

      async.parallel([
        insertUsers,
        insertArticles,
      ], (err) => {
        assert.equal(err, null);
        log('Fixtures was succesfully loaded');

        db.close();
      });
    },
  );
});
