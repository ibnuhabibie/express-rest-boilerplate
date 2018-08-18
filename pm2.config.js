module.exports = {
  apps: [
    {
      name: 'rest-boilerplate',
      script: 'boot.js',
      watch: false,
      ignore_watch: ['logs', 'uploads', 'locales/*'],
      log_date_format: 'YYYY-MM-DD HH:mm:ssZ',
      error_file: 'logs/error.log',
      out_file: 'logs/out.log',
      min_uptime: 500,
      max_restarts: 10,
      restart_delay: 1000,
      env_development: {
        NODE_ENV: 'development',
        watch: true,
        exec_mode: 'fork',
        instances: 1
      },
      env_production: {
        instances: 2,
        exec_mode: 'cluster',
        NODE_ENV: 'production',
        instances: 2
      },
      env_staging: {
        NODE_ENV: 'staging',
        exec_mode: 'fork',
        instances: 1
      }
    }
  ]
}
