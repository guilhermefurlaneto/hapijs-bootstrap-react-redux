const Joi = require('joi');
const UserReset = require('../../models/user-reset').Model;
const moment = require('moment');
const Boom = require('boom');
const Hash = require('../../lib/hash');

module.exports = {
  path : '/api/account/reset-password',
  method : 'PUT',
  handler(request, reply) {

    if (request.payload.password !== request.payload.confirmPassword) {
      reply(Boom.badRequest('Senha e Confirmar senha não conferem.'));
    } else {
      UserReset.forge({
        token : request.payload.token,
      })
      .query('where', 'expires', '>', moment())
      .fetch({ require : true, withRelated : ['user'] })
      .then((reset) => {
        const user = reset.related('user');

        return user.save({
          password : Hash.createHash(request.payload.password),
        }, { patch : true });
      })
      .catch(UserReset.NotFoundError, () => {
        return Boom.badRequest('Código de recuperação inválido.');
      })
      .nodeify(reply);
    }

  },
  config : {
    auth : false,
    validate : {
      payload : {
        token : Joi.string().required(),
        password : Joi.string().required(),
        confirmPassword : Joi.string().required(),
      },
    },
  },
};
