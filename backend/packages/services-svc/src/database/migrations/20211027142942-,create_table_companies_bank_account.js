'use strict';

const bank = {
  fields: ['bank_code'],
  type: 'foreign key',
  name: 'fk_bank_using_bankCode',
  references: {
    table: 'banks',
    field: 'code'
  }
}

const companie = {
  fields: ['companie_id'],
  type: 'foreign key',
  name: 'fk_companie_using_companieId',
  references: {
    table: 'companies',
    field: 'id'
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.createTable('companies_bank_account', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false
        },
        bank_code: { 
          type: Sequelize.INTEGER,
          allowNull: false,
          default: 0
        },
        companie_code: { 
          type: Sequelize.INTEGER,
          allowNull: false,
          default: 0
        },
        agency: {
          type: Sequelize.STRING(10),
        },
        account: {
          type: Sequelize.STRING(10),
        },
        note: {
          type: Sequelize.STRING(10),
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          default: Sequelize.NOW
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: true,
          default: Sequelize.NOW
        }
      }
      ),
     queryInterface.addConstraint('companies_bank_account', bank),
     queryInterface.addConstraint('companies_bank_account', companie)
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeConstraint('companies_bank_account', bank.name),
      queryInterface.dropTable('companies_bank_account')
    ]
    )
  }
};
