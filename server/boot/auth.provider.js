const User = require('../models/user').Model;

module.exports = (decoded, request, callback) => {
  return User.forge({ id : decoded.id })
    .fetch({
      require : true,
    }).tap((user) => {
      process.nextTick(() => callback(null, true, user));
    }).catch(User.NotFoundError, () => {
      callback(null, false);
    })
    .catch(callback);
};
