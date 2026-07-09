require('dotenv').config({ path: '.env.deploy' });
const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF } = process.env;

module.exports = {
  apps: [{ name: 'mesto-backend', script: './backend/app.js' }],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/Zorii4/nodejs-pm2-deploy.git',
      path: DEPLOY_PATH,
      'pre-deploy-local': `scp ./.env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}/source/backend`,
      'post-deploy': 'cd backend && npm i && pm2 restart ecosystem.config.js --env production',
    },
  },
};