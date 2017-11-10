const Book = require('../lib/book');
const Joi = require('joi');

const schema = {
  userId : Joi.number().required(),
  profile : Joi.object().required(),
};

const prototype = {
  tableName : 'user_profiles',
  idAttribute : 'user_id',

  user() {
    return this.belongsTo('User', 'user_id');
  },

};

const published = new Book()
  .setModelPrototypeProps(prototype)
  .setModelClassProps(schema)
  .register('UserProfile', 'UserProfiles')
  .publish();

module.exports = {
  Model : published.Model,
  Collection : published.Collection,
  schema,
};
