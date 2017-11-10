const Promise = require('bluebird');
const AWS = require('aws-sdk');
const _ = require('lodash');

const config = require(`../../config`)


AWS.config.loadFromPath(config.amazon.s3.configFileLocation);

const s3 = new AWS.S3({
  params : {
    Bucket : config.amazon.s3.bucket,
  },
});

function uploadToStorage(key, blob, contentType) {
  return new Promise((resolve, reject) => {
    s3.upload({
      Key : key,
      Body : blob,
      ACL : 'public-read',
      ContentType : contentType
    }).send((err, data) => {
      return err
      ? reject(err)
      : resolve(data);
    });
  });
}

function downloadFromStorage(key) {
  return new Promise((resolve, reject) => {
    s3.getObject({
      Key : key,
    }, (err, data) => {
      return err
      ? reject(err)
      : resolve(
        _.pick(data, ['Blob', 'Metadata'])
      );
    });
  });
}

function deleteFromStorage(key) {
  return new Promise((resolve, reject) => {
    s3.deleteObject({
      Key : key,
    }, (err, data) => {
      return err
      ? reject(err)
      : resolve(data);
    });
  });
}

module.exports = {
  uploadToStorage,
  downloadFromStorage,
  deleteFromStorage,
};
