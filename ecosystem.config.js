module.exports = {
    apps: [
      {
        name: 'backend',
        script: './backend/server.js', // ajuste o caminho do arquivo principal do backend
        watch: true,
        env: {
          NODE_ENV: 'development'
        },
        env_production: {
          NODE_ENV: 'production'
        }
      },
      {
        name: 'frontend',
        script: 'npm',
        args: 'start',
        cwd: './frontend',
        watch: true,
        env: {
          NODE_ENV: 'development'
        },
        env_production: {
          NODE_ENV: 'production'
        }
      }
    ]
  };
  