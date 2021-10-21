require('dotenv').config()

module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '1433', 10),
    logging: false,
    benchmark: true,
    dialect: 'mssql',
    retry: {
      max: 3
    }
  }
}
