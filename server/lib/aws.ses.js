const config = require(`../../config`)

const Promise = require('bluebird');
const _ = require('lodash');
const aws = require('aws-sdk');

const awsConfig = new aws.Config(config.amazon.ses);

function sendEmail(to, subject, body) {
  return new Promise((resolve, reject) => {
    const ses = new aws.SES(awsConfig);

    if (_.isString(to)) {
      to = to.split(';');
    }

    ses.sendEmail({
      Source : config.AWS_EMAIL,
      Destination : { ToAddresses : to },
      Message : {
        Subject : {
          Data : subject,
        },
        Body : {
          Html : {
            Data : body,
          },
        },
      },
    }, (err, data) => {
      return err ? reject(err) : resolve(data);
    });
  });
}

module.exports = {
  sendEmail,
};
