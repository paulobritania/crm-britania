'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('buyers', 'regional_manager_code', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })

    await queryInterface.addColumn('buyers', 'regional_manager_description', {
      type: Sequelize.STRING(70),
      allowNull: true,
    })

    await queryInterface.addColumn('buyers', 'responsible_code', {
      type: Sequelize.INTEGER,
      allowNull: true,
    })

    await queryInterface.addColumn('buyers', 'responsible_description', {
      type: Sequelize.STRING(70),
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('buyers', 'regional_manager_code')
    await queryInterface.removeColumn('buyers', 'regional_manager_description')
    await queryInterface.removeColumn('buyers', 'responsible_code')
    await queryInterface.removeColumn('buyers', 'responsible_description')
  }
};
