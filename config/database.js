const {Sequelize} = require("sequelize");
require('dotenv').config()

// Initialize the database connection
const sequelize = new Sequelize( process.env.DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;

require("../models/index"); 
(async () => {
    try {
      await sequelize.authenticate();
      console.log('Database connection established successfully.'); 
      await sequelize.sync({ alter: true });
      console.log('Database models synchronized successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
})();