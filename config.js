import dotenv from 'dotenv';
dotenv.config();

/**
 * @typedef EnviromentConfiguration
 * @prop {string} HOST The host address
 * @prop {string} PORT The port to listen on
 * @prop {string} MONGO_USER Mongo DB username.
 * @prop {string} MONGO_PASS Mongo DB password
 * @prop {string} MONGO_DBNAME Name of mongo database
 * @prop {string} MONGO_IP IP to mongodb host
 * @prop {string} MONGO_REPL Name of replicaset if any
 * @prop {string} JWT_SECRET JsonWebTokens signature secret
 * @prop {string} JWT_EXPIRETIME JsonWebToken expire time
 * @prop {string} SENDGRID_API_KEY Sendgrid api key
 *
 */

/**
 * @type {EnviromentConfiguration}
 */
const config = {
  ...process.env,
};

export default config;
