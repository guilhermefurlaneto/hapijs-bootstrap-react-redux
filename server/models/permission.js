const Book = require('../lib/book');
const Joi = require('joi');

const schema = {
  id : Joi.number().required(),
  displayName : Joi.string().required(),
  code : Joi.string().required(),

  createdAt : Joi.date().allow(null),
  updatedAt : Joi.date().allow(null),
};

const userPrototype = {
  tableName : 'permissions',
  hasTimestamps : ['created_at', 'updated_at'],

  roles() {
    return this.belongsToMany('Role', 'roles_permissions', 'permission_id', 'role_id');
  }
};

const published = new Book()
  .setModelPrototypeProps(userPrototype)
  .setModelClassProps(schema)
  .register('Permission', 'Permissions')
  .publish();

module.exports = {
  Model : published.Model,
  Collection : published.Collection,
  schema,
};
