const Book = require('../lib/book');
const Joi = require('joi');

const schema = {
  id : Joi.number().required(),
  displayName : Joi.string().required(),
  code : Joi.string().required()
};

const userPrototype = {
  tableName : 'roles',
  hasTimestamps : ['created_at', 'updated_at'],

  permissions() {
    return this.belongsToMany('Permissions', 'role_permissions', 'role_id', 'permission_id');
  }
};

const published = new Book()
  .setModelPrototypeProps(userPrototype)
  .setModelClassProps(schema)
  .register('Role', 'Roles')
  .publish();

module.exports = {
  Model : published.Model,
  Collection : published.Collection,
  schema,
};
