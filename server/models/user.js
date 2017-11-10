const Book = require('../lib/book');
const Joi = require('joi');

const schema = {
  id : Joi.number().required(),
  displayName : Joi.string().required(),
  email : Joi.string().required(),

  remoteId : Joi.number().allow(null),
  authProvider : Joi.string().allow(null),

  password : Joi.string().allow(null),
  active : Joi.boolean().required(),

  createdAt : Joi.date().allow(null),
  updatedAt : Joi.date().allow(null),
};

const userPrototype = {
  tableName : 'users',
  hasTimestamps : ['created_at', 'updated_at'],
  hidden : ['password'],

  profile() {
    return this.hasOne('UserProfile', 'user_id');
  },

  roles() {
    return this.belongsToMany('Role', 'user_roles', 'user_id', 'role_id');
  }

};

const published = new Book()
  .setModelPrototypeProps(userPrototype)
  .setModelClassProps(schema)
  .register('User', 'Users')
  .publish();

module.exports = {
  Model : published.Model,
  Collection : published.Collection,
  schema,
};
