const path = require('path');
const glob = require('glob');

const models = glob.sync(path.join(__dirname, '..', 'models', '**', '*.js'));

models.forEach((model) => {
  require(model);
});
