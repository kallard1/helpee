const path = require('path')
const config = require('./dist/config')

module.exports = {
  development: {
    client: 'pg',
    connection: config.default[process.env.NODE_ENV].bdd,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, '/dist/migrations')
    }
  },

  production: {
    client: 'pg',
    connection: config.default[process.env.NODE_ENV].bdd,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: path.join(__dirname, '/dist/migrations')
    }
  }
}
