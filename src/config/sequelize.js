const { env } = process

const baseConfig = {
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  host: env.DB_HOSTNAME,
  dialect: 'mysql',
  operatorsAliases: false,
  logging: env.NODE_ENV === 'development' ? console.log : false,
  timezone: '+07:00',
  omitNull: true,
  define: {
    underscored: false,
    timestamps: true,
    freezeTableName: true,
    charset: 'utf8mb4',
    dialectOptions: {
      collate: 'utf8mb4_unicode_ci'
    },
    defaultScope: {
      attributes: {
        exclude: []
      }
    }
  },
  pool: {
    min: 0,
    max: 5, // Never have more than five open connections
    idle: 30000, // Remove a connection from the pool after the connection has been idle
    acquire: 60000
  }
}

module.exports = baseConfig
