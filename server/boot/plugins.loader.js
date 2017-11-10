const Inert = require('inert');
const Good = require('good');
const Routes = require('hapi-plus-routes');
const JWT = require('hapi-auth-jwt2');
const Promise = require('bluebird');

const config = require('../../config');
const authenticationProvider = require('./auth.provider');

const plugins = [Inert];

const logSqueezeArgs = [{
  log : '*',
  response : '*',
  request : '*',
  'request-internal' : '*',
}];

plugins.push({
  register : Good,
  options : {
    reporters : {
      console : [{
        module : 'good-squeeze',
        name : 'Squeeze',
        args : logSqueezeArgs,
      }, {
        module : 'good-console',
        args : [{
          format : 'HH:mm:ss DD.MM.YYYY',
        }],
      }, 'stdout'],
      file : [{
        module : 'good-squeeze',
        name : 'Squeeze',
        args : logSqueezeArgs,
      }, {
        module : 'good-squeeze',
        name : 'SafeJson',
      }, {
        module : 'rotating-file-stream',
        args : [
          'log',
          {
            interval : '1d',
            compress : 'gzip',
            path : './logs',
          },
        ],
      }],
    },
  },
});

plugins.push({
  register : Routes,
  options : {
    routes : './server/routes/**/*.js',
  },
});

module.exports = server => new Promise((resolve, reject) => {

  server.register(JWT, (jwtRegErr) => {
    if (jwtRegErr) {
      reject(jwtRegErr);
    } else {
      server.auth.strategy('jwt', 'jwt', true, {
        key : config.securityToken,
        verifyOptions : {
          algorithms : ['HS256'],
        },
        validateFunc : authenticationProvider,
      });

      server.register(plugins, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    }
  });
});
