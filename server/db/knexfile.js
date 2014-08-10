// Update with your config settings.

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      user: 'jpaul',
      password: '5432',
      database: 'horsejstracker'
    },
    pool: {
      min: 1,
      max: 1
    },
    migrations: {
      tableName: 'postgresql'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      host: '127.0.0.1',
      user: 'jpaul',
      password: '5432',
      database: 'horsejstracker'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'postgresql'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'postgresql'
    }
  }

};
