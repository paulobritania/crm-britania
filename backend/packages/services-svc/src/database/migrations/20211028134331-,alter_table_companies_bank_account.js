'use strict';

const company = {
  fields: ['company_id'],
  type: 'foreign key',
  name: 'fk_companie_using_companieId',
  references: {
    table: 'companies',
    field: 'id'
  },
  onDelete: 'no action',
  onUpdate: 'no action'
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('companies_bank_account', company)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('companies_bank_account', company.name)
  }
};
