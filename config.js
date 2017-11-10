module.exports = {
  baseUrl : process.env.BASE_URL,
  databaseUrl : process.env.DATABASE_URL,
  port : process.env.SERVER_PORT || 3000,
  securityToken : process.env.SECURITY_TOKEN,
  amazon : {
    s3 : {
      bucket : process.env.AWS_S3_BUCKET,
      configFileLocation : process.env.AWS_S3_CONFIG_LOCATION,
    },

    ses : {
      accessKeyId : process.env.AWS_SES_ACCESS_KEY_ID,
      secretAccessKey : process.env.AWS_SES_SECRET_ACCESS_KEY,
      region : process.env.AWS_SES_REGION,
    },
  },
};
