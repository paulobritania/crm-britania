'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('buyers_address', 'complement', {
      type: Sequelize.STRING(70),
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('buyers_address', 'complement')
  }
};
