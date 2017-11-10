const Joi = require('joi');
const Boom = require('boom');
const Hash = require('../../lib/hash');
const User = require('../../models/user').Model;

module.exports = {
  path : '/api/account/change-password',
  method : 'POST',
  handler(request, reply) {
    const currentUser = request.auth.credentials;
    if (request.payload.newPassword !== request.payload.confirmNewPassword) {
      reply(Boom.badRequest('Senha e Confirmar senha não conferem.'));
    } else if (! Hash.compareHash(request.payload.password, currentUser.get('password'))) {
      reply(Boom.badRequest('Usuário e/ou senha inválidos.'));
    } else {
      User.forge({ id : currentUser.id})
        .save({ password : Hash.createHash(request.payload.newPassword) }, {patch : true })
        .nodeify(reply);
    }

  },
  config : {
    auth : 'jwt',
    validate : {
      payload : {
        password : Joi.string().required(),
        newPassword : Joi.string().required(),
        confirmNewPassword : Joi.string().required(),
      },
    },
  },
};
