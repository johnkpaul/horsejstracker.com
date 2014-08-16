var env = process.env.NODE_ENV;

var fs = require('fs');

if (!fs.existsSync(__dirname + "/../db/knexfile.js")) {
  console.error("Config file [server/db/knexfile.js] is missing");
  console.error("Did you forget to run `npm run decrypt_db_conf`?");
  process.exit(1);
}

module.exports = require('knex')(require('../db/knexfile')[env]);

