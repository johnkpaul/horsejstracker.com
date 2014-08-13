var env = process.env.NODE_ENV;

module.exports = require('knex')(require('../db/knexfile')[env]);

