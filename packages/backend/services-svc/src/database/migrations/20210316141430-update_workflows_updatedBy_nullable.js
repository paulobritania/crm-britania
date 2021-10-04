'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('workflows ', 'updated_by', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })
  },

  down: async (queryInterface) => {
    return queryInterface.changeColumn('workflows ', 'updated_by', {
      type: Sequelize.INTEGER,
      allowNull: false,
    })
  }
};
