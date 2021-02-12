require('dotenv').config();

/**
 * @typedef EnviromentConfiguration
 * @prop {string} HOST The host address
 * @prop {string} PORT The port to listen on
 * @prop {string} MONGO_USER Mongo DB username.
 * @prop {string} MONGO_PASS Mongo db password
 * @prop {string} MONGO_DBNAME Name of mongo database
 * @prop {string} MONGO_IP IP to mongodb host
 * @prop {string} MONGO_REPL Name of replicaset if any
 *
 */

/**
 * @type {EnviromentConfiguration}
 */
const config = {
  ...process.env
};

module.exports = config;
