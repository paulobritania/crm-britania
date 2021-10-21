'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('buyers', 'client_totvs_description'),
      queryInterface.removeColumn('buyers', 'buyer_address_id'),
      queryInterface.removeColumn('buyers', 'parent_company_address_id'),
      queryInterface.removeColumn('buyers', 'regional_manager_code'),
      queryInterface.removeColumn('buyers', 'regional_manager_description'),

      queryInterface.addColumn('buyers', 'image_id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      })
    ])
  },

  down: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('buyers', 'image_id'),
      queryInterface.addColumn('buyers', 'parent_company_address_id'),
      queryInterface.addColumn('buyers', 'buyer_address_id'),
      queryInterface.addColumn('buyers', 'client_totvs_description'),
      queryInterface.addColumn('buyers', 'regional_manager_description'),
      queryInterface.addColumn('buyers', 'regional_manager_code', {
        type: Sequelize.INTEGER
      }),
    ])
  }
};
