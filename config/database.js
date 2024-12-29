const Sequelize = require("sequelize");
require('dotenv').config()
const sequelize = new Sequelize( process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.HOST, // or your database server
    dialect: 'postgres', // specify the database dialect
    logging: false, // disable logging; set true to enable logging
  });

  (async () => {
    try {
      await sequelize.authenticate();
      console.log('Connection to PostgreSQL has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  })();
  
  module.exports = sequelize;