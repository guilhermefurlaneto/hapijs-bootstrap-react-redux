const config = require('../../../config')

const pug = require('pug');
const path = require('path');
const SES = require('../../lib/aws.ses');

const subject = 'CRM - Confirmação de Cadastro';

function send(destination, options) {
  const template = path.join(__dirname, 'sign-up.pug');

  options.url = config.BASE_URL;
  const html = pug.compileFile(template)(options);

  return SES.sendEmail(destination, subject, html);
}

module.exports = {
  send,
};
