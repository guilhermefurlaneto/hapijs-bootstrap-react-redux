const Hapi = require('hapi');

const config = require('../config');
const pluginsLoader = require('./boot/plugins.loader');

const server = new Hapi.Server({
  connections : {
    routes : {
      cors : true,
      timeout : {
          socket : false,
          server : false,
      },
    },
  },
  debug : {
    request : ['error'],
  },
});

server.connection({
  host : '0.0.0.0',
  port : config.port,
});

pluginsLoader(server).then(() => {
  server.start((err) => {
    if (err) {
      server.log(['startup', 'error'], `Server start error ${err}`);
    } else {
      require('./boot/boot-models');
      server.log(['startup'], `Server running at ${server.info.uri}`);
    }
  });
}).catch((err) => {
    server.log(['startup', 'error'], `Server start error ${err}`);
    process.exit(1);
});
