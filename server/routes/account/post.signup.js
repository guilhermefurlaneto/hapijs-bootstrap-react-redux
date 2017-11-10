const Joi = require('joi');
const uuid = require('uuid/v4');
const Hash = require('../../lib/hash');
const User = require('../../models/user').Model;
const signupEmail = require('../../emails/account/sign-up');

module.exports = {
  path : '/api/account/sign-up',
  method : 'POST',
  handler(request, reply) {
    const password = uuid().split('-')[0];

    const model = request.payload;
    model.password = Hash.createHash(password);

    User.forge(model)
    .save()
    .then((user) => {
      return signupEmail.send(user.get('email'), {
        name : `${user.get('firstName')} ${user.get('lastName')}`,
        email : user.get('email'),
        password,
      });
    })
    .nodeify(reply);

  },
  config : {
    auth : 'jwt',
    validate : {
      payload : {
        firstName : Joi.string().required(),
        lastName : Joi.string().allow([null, '']),
        email : Joi.string().required().lowercase(),
        active : Joi.boolean().required(),
      },
    },
  },
};
