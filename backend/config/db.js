const { Sequelize } = require('sequelize');
require('dotenv').config({ override: true });
require('pg');
require('pg-hstore');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: process.env.DB_DIALECT,
        logging: console.log,
    }
);

module.exports = sequelize;