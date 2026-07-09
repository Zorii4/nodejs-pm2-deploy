const path = require('path');

require('dotenv').config({ path: path.resolve(__dirname, '.env.deploy') });

const {
  DEPLOY_USER,
  DEPLOY_HOST,
  DEPLOY_PATH,
  DEPLOY_REF,
  DEPLOY_REPO,
} = process.env;

module.exports = {
  apps: [
    {
      name: 'mesto-backend',
      cwd: `${DEPLOY_PATH}/current/backend`,
      script: 'src/app.ts',
      interpreter: './node_modules/.bin/ts-node',
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: DEPLOY_REPO,
      path: DEPLOY_PATH,
      'pre-deploy-local': `ssh ${DEPLOY_USER}@${DEPLOY_HOST} "mkdir -p ${DEPLOY_PATH}/shared" && scp .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/shared/.env && scp .env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/shared/.env.deploy`,
      'post-deploy': `cd ${DEPLOY_PATH}/current/backend && cp ${DEPLOY_PATH}/shared/.env .env && cp ${DEPLOY_PATH}/shared/.env.deploy .env.deploy && npm i && pm2 startOrReload ecosystem.config.js --env production`,
    },
  },
};
