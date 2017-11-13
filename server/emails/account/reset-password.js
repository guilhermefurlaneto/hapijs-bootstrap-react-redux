const pug = require('pug');
const path = require('path');
const SES = require('../../lib/aws.ses');

const subject = 'APP - Recuperação de Senha';

function send(destination, options) {
  const template = path.join(__dirname, 'reset-password.pug');

  const html = pug.compileFile(template)(options);

  return SES.sendEmail(destination, subject, html);
}

module.exports = {
  send,
};
