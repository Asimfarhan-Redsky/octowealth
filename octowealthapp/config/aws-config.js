// config/aws-config.js

const AWS = require("aws-sdk");

AWS.config.update({
  region: "us-west-2",
  // other AWS configurations
});

module.exports = AWS;
