'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('representative_commission_percentage', 'establishment_code', {
      type: Sequelize.STRING(5),
      allowNull: true
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('representative_commission_percentage', 'establishment_code', {
      type: Sequelize.INTEGER,
      allowNull: true
    })
  }
};
