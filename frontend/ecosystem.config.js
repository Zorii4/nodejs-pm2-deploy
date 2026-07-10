const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '.env.deploy') });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF,
  DEPLOY_REPO,
  REACT_APP_API_URL,
} = process.env;

module.exports = {
  apps: [],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,

      'post-deploy': `cd ${DEPLOY_PATH}/current/frontend && npm i && REACT_APP_API_URL=${REACT_APP_API_URL} NODE_OPTIONS=--openssl-legacy-provider npm run build`,
    },
  },
};
