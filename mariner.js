const config = require(`./config`)

module.exports = {
  directory: './server/migrations',

  stopOnWarning: true,

  plugins: ['sql', 'js'],

  // see list of available options at http://knexjs.org
  sql: {
    client : 'pg',
    connection : config.databaseUrl,
  },

  backend: 'sql',
};
