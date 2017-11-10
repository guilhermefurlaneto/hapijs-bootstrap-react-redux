const enviroment = process.env.NODE_ENV || 'development';

const config = require(`./config.${enviroment}.js`)

module.exports = config;
