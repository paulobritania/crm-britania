'use strict';

const bank = {
  fields: ['bank_code'],
  type: 'foreign key',
  name: 'fk_bank_using_bankCode',
  references: {
    table: 'banks',
    field: 'code'
  },
  onDelete: 'no action',
  onUpdate: 'no action'
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('companies_bank_account', bank)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('companies_bank_account', bank.name)
  }
};
