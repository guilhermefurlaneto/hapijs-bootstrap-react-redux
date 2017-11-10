const Joi = require('joi');
const Boom = require('boom');
const JWT = require('jsonwebtoken');
const config = require('../../../config');
const Hash = require('../../lib/hash');
const User = require('../../models/user').Model;

module.exports = {
  path : '/api/account/login',
  method : 'POST',
  handler(request, reply) {
    User.forge({
      email : request.payload.email,
    })
    .fetch({
      require: true,
    })
    .then((user) => {

      if (! Hash.compareHash(request.payload.password, user.get('password'))) {
        return Boom.unauthorized('Usuário e/ou senha inválidos.');
      }

      const token = JWT.sign(user.toJSON(), config.securityToken, { expiresIn : '2h'});
      user.set('token', token);
      return user.toJSON();
    })
    .catch(User.NotFoundError, () => {
      return Boom.unauthorized('Usuário e/ou senha inválidos.');
    })
    .nodeify(reply);

  },
  config : {
    auth : false,
    validate : {
      payload : {
        password : Joi.string().required(),
        email : Joi.string().required().lowercase(),
      },
    },
  },
};
