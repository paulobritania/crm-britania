import { Provider } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

export const DatabaseProvider: Provider = {
  provide: 'SEQUELIZE',
  useFactory: async (logger: PinoLogger) => {
    logger.setContext('Sequelize');

    const db: Sequelize = new Sequelize(
      process.env.DB_NAME,
      process.env.DB_USER,
      process.env.DB_PASSWORD,
      {
        dialect: 'mssql',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '1433', 10),
        logging: logger.info.bind(logger),
        benchmark: true,
        retry: {
          max: 3,
        },
        operatorsAliases: {
          $like: Op.like,
          $iLike: Op.iLike,
          $notLike: Op.notLike,
          $not: Op.not,
          $in: Op.in,
          $notIn: Op.notIn,
          $isNull: Op.is,
          $isNotNull: Op.not,
          $or: Op.or,
          $greaterThen: Op.gt,
          $greaterOrEqualThen: Op.gte,
          $lowerThen: Op.lt,
          $lowerOrEqualThen: Op.lte,
          $between: Op.between,
          $notBetween: Op.notBetween,
        },
      },
    );

    db.addModels([]);

    return db;
  },
  inject: [PinoLogger],
};
