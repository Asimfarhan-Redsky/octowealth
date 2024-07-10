// config/cognito-config.js

import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "us-west-2_AFvltDMJF",
  ClientId: "5febkoksb64fncgssvlis94id9",
};

export default new CognitoUserPool(poolData);
