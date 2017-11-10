const Book = require('../lib/book');
const Joi = require('joi');

const schema = {
  id : Joi.number().required(),
  userId : Joi.number().required(),
  expires : Joi.date().required(),
  token : Joi.string().required(),

  createdAt : Joi.date().allow(null),
  updatedAt : Joi.date().allow(null),
};

const userResetPrototype = {
  tableName : 'user_resets',
  hasTimestamps : ['created_at', 'updated_at'],

  user() {
    return this.belongsTo('User', 'user_id');
  }
};

const published = new Book()
  .setModelPrototypeProps(userResetPrototype)
  .setModelClassProps(schema)
  .register('UserReset', 'UserResets')
  .publish();

module.exports = {
  Model : published.Model,
  Collection : published.Collection,
  schema,
};
