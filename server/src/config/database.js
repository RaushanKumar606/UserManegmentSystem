

const { DataSource } = require('typeorm');
require('dotenv').config();

const User = require('../models/user');
const Software = require('../models/software');
const Request = require('../models/request');

const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Raushan@2000",
  database: "postgres",
 entities: [User, Software, Request],
  synchronize: true,
});
AppDataSource.initialize()
  .then(() => {
    console.log('Database connected successfully');
    process.exit(0);

    
  })
  .catch((error) => {
    console.error('Database connection error:', error);
    process.exit(1);
  });

module.exports = AppDataSource; 