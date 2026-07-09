require('dotenv').config({ path: '.env.deploy' });
const { DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF } = process.env;

module.exports = {
  apps: [],
  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/Zorii4/nodejs-pm2-deploy.git',
      path: DEPLOY_PATH,
      'post-deploy': 'cd /home/zori4/frontend/source/frontend && npm i && NODE_OPTIONS=--openssl-legacy-provider npm run build',
    },
  },
};