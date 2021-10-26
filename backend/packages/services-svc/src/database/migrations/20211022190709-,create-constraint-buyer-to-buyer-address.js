'use strict'

const constraint = {
  fields: ['id_buyers'],
  type: 'foreign key',
  name: 'fk_buyer_address_idAddress',
  references: {
    table: 'buyers',
    field: 'id'
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.addConstraint('buyers_address', constraint)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('buyers_address', constraint.name)
  }
}
