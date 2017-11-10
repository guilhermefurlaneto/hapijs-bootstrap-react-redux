const config = require('../../config')

const knex = require('knex')({
  client : 'pg',
  connection : config.databaseUrl,
  searchPath : 'knex,public',
});

module.exports = knex;
