import _ from 'lodash';

const req = require.context('./', true, /^\.\/.*\.js$/);
const reducerSettings = req.keys();

const reducers = _.reduce(reducerSettings, (result, file) => {
  if (file !== './index.js' && file !== __filename) {
    const reducerSetting = req(file).default;

    const fileParts = file.split('/');
    const reducerName = fileParts[fileParts.length - 1].replace('.js', '');

    result[_.camelCase(reducerName)] = reducerSetting;
  }
  return result;
}, {});


export default reducers;


