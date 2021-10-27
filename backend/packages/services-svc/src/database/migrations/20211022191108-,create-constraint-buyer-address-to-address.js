'use strict';

const constraint = {
  fields: ['id_address'],
  type: 'foreign key',
  name: 'fk_buyer-address-to-address',
  references: {
    table: 'address',
    field: 'id'
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('buyers_address', constraint)
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('buyers_address', constraint.name)
  }
};
