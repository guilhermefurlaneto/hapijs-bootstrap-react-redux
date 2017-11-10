module.exports = {
  method: 'GET',
  path: '/',
  handler: {
    file: 'build/index.html',
  },
  config : {
    auth : false,
    tags : ['site']
  },
};
