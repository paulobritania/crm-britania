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

const companie = {
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
    return queryInterface.addConstraint('companies_bank_account', companie)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('companies_bank_account', companie.name)
  }
};
