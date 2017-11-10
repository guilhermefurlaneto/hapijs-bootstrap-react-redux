const Joi = require('joi');
const moment = require('moment');
const crypto = require('crypto');
const config = require('../../../config');

const User = require('../../models/user').Model;
const UserReset = require('../../models/user-reset').Model;

const ResetPasswordEmail = require('../../emails/account/reset-password');

module.exports = {
  path : '/api/account/reset-password',
  method : 'POST',
  handler(request, reply) {

    User.forge({ email : request.payload.email })
      .fetch({
        require : true,
      })
      .then(user => {
        return UserReset.forge({
          userId : user.id,
          expires : moment().add(24, 'hours'),
          token : crypto.randomBytes(32).toString('hex'),
        }).save()
        .then(userReset => {
          const url = [
            config.baseUrl,
            '/reset-password?',
            `token=${userReset.get('token')}`
          ].join('');

          return ResetPasswordEmail.send(user.get('email'), {
            url,
            name : user.get('displayName'),
          });
        });
      })
      .nodeify(reply)
      .catch(User.NotFoundError, () => {
        reply();
      });
  },
  config : {
    auth : false,
    validate : {
      payload : {
        email : Joi.string().required(),
      },
    },
  },
};
