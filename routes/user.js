const router = require('express').Router();
const User = require('../models/user');
const config = require('config');
const utils = require('../services/utils');
const security = require('../services/security')(config);
const cryptography = require('../services/cryptography')(config);
const jwt = require('jsonwebtoken');
const mw = require('../middlewares/middlewares');

module.exports = router;


function endError(res, code, error) {
  res.status(code).json({ error });
}


function handleErrors(res) {
  return (err) => {
    endError(res, 400, utils.listifyErrors(err));
  };
}

function generateTokenForUser(user, res) {
  delete user.password;
  const encoded = cryptography.encrypt(user);
  const token = jwt.sign(encoded, config.secretKey, {
    expiresIn: 36000,
  });

  return res.json({
    user,
    token,
  });
}

function createUser(req, res) {
  const user = new User(req.body);
  user.save((err) => {
    if (err) {
      if (Object.prototype.hasOwnProperty.call(err, 'code') && err.code === utils.mongo.UNIQUE_KEY_VIOLATION) {
        return endError(res, 400, utils.messages.USER_DUPLICATE);
      }

      return handleErrors(res)(err);
    }

    return generateTokenForUser(user, res);
  });
}

function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  function handleUserNotFound(err) {
    if (err) {
      console.error(err);
    }
    return endError(res, 401, utils.messages.INVALID_CREDENTIALS);
  }

  function handleSuccess(user) {
    if (user) {
      const providedEncryptedPassword = security.hashify(password);
      if (user.password === providedEncryptedPassword) {
        return generateTokenForUser(user, res, utils.messages.USER_LOGGEDIN_SUCCESS);
      }
    }
    return endError(res, 401, utils.messages.INVALID_CREDENTIALS);
  }

  User.findOne({
    email,
    deleted_at: {
      $exists: false,
    },
  }).then(handleSuccess, handleUserNotFound);
}

function updateUser(req, res) {
  if (req.body.password !== undefined) {
    req.body.password = security.hashify(req.body.password);
  }

  if (req.body._id !== undefined) delete req.body._id;

  function handleSuccess() {
    function generateToken(user) {
      generateTokenForUser(user, res, utils.messages.USER_UPDATED_SUCCESS);
    }
    User.findOne({
      _id: req.params.userId,
    }).then(generateToken)
      .catch(handleErrors(res));
  }

  User.update(
    {
      _id: req.params.userId,
    },
    {
      $set: req.body,
    })
    .then(handleSuccess)
    .catch(handleErrors(res));
}

function getUser(req, res) {
  function handleSuccess(user) {
    if (user) {
      return res.json(user);
    }
    return endError(res, 404, utils.messages.USER_NOT_FOUND);
  }

  User.findOne(
    {
      _id: req.params.userId,
    },
    {
      password: 0,
    }).then(handleSuccess)
    .catch(handleErrors(res));
}

function deleteUser(req, res) {
  User.findByIdAndUpdate(
    {
      _id: req.params.userId,
    },
    {
      $set: {
        deleted_at: new Date(),
      },
    })
    .then(() => res.status(204).end())
    .catch(handleErrors(res));
}

router.post('/', createUser);
router.post('/login', loginUser);

router.route('/:userId')
  .all(mw.isValidParameters, mw.isAuthenticated, mw.isAllowedOperation)
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

