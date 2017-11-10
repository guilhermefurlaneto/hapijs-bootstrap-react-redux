const bcrypt = require('bcryptjs');

module.exports = {
  createHash(plainText) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainText, salt);
  },
  compareHash(plainText, hash) {
    return bcrypt.compareSync(plainText, hash);
  },
};