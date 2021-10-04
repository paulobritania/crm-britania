const Sequelize = require('sequelize');
const dotenv = require('dotenv')
dotenv.config()

const db = {
  sequelize: new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect: 'mssql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '1433', 10),
      benchmark: true,
      logging: false,
      retry: {
        max: 3
      },
      operatorsAliases: {
        $like: Sequelize.Op.like,
        $iLike: Sequelize.Op.iLike,
        $notLike: Sequelize.Op.notLike,
        $not: Sequelize.Op.not,
        $in: Sequelize.Op.in,
        $notIn: Sequelize.Op.notIn,
        $isNull: Sequelize.Op.is,
        $isNotNull: Sequelize.Op.not,
        $or: Sequelize.Op.or,
        $greaterThen: Sequelize.Op.gt,
        $greaterOrEqualThen: Sequelize.Op.gte,
        $lowerThen: Sequelize.Op.lt,
        $lowerOrEqualThen: Sequelize.Op.lte,
        $between: Sequelize.Op.between,
        $notBetween: Sequelize.Op.notBetween
      }
    }
  ),
  Sequelize: Sequelize,
}

module.exports = db;
