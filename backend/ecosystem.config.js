module.exports = {
  apps: [{
    name: 'mesto-backend',
    script: '/home/zori4/backend/source/backend/src/app.ts',
    interpreter: '/home/zori4/backend/source/backend/node_modules/.bin/ts-node',
  }],
  deploy: {
    production: {
      user: 'zori4',
      host: '84.252.136.65',
      ref: 'origin/master',
      repo: 'https://github.com/Zorii4/nodejs-pm2-deploy.git',
      path: '/home/zori4/backend',
      'pre-deploy-local': 'scp ./.env zori4@84.252.136.65:/home/zori4/backend/source/backend',
      'post-deploy': 'cd /home/zori4/backend/source/backend && npm i && pm2 start ecosystem.config.js --env production',
    },
  },
};