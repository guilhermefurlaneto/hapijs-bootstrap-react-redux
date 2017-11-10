const User = require('../models/user').Model;
const Hash = require('../lib/hash');
const Bookshelf = require('../lib/bookshelf');

/**
 * Mariner UP migration
 */
exports.up = function up() {

  return Bookshelf.transaction(t => {
    return User.forge({
      displayName : 'admin',
      email : 'admin@system.com',
      password : Hash.createHash('admin'),
      active : true,
    })
    .save(null, { transacting : t });
  });

};

/**
 * Mariner DOWN migration
 */
exports.down = function down() {
  return Bookshelf.transaction(t => {
    return User.forge({
      email : 'admin@system.com',
    })
    .fetch()
    .then(user => {
      return user.destroy({
        transacting : t
      });
    });
  });
};
