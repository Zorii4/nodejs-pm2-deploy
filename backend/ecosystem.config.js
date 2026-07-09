require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF,
} = process.env;

module.exports = {
  apps: [{
    name: 'mesto-backend',
    script: `${DEPLOY_PATH}/source/backend/src/app.ts`,
    interpreter: `${DEPLOY_PATH}/source/backend/node_modules/.bin/ts-node`,
  }],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/Zorii4/nodejs-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source/backend`,
      'post-deploy': `cd ${DEPLOY_PATH}/source/backend && npm i && pm2 start ecosystem.config.js --env production`,
    },
  },
};
