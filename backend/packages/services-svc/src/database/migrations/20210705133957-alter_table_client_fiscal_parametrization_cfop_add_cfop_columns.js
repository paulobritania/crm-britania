'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('client_fiscal_parametrization_cfop', 'manaus_ag_sc_tv_description', {
      type: Sequelize.STRING(100),
      allowNull: true,
    })

    await queryInterface.addColumn('client_fiscal_parametrization_cfop', 'manufactured_vpc_st_code', {
      type: Sequelize.STRING(100),
      allowNull: true,
    })

    await queryInterface.addColumn('client_fiscal_parametrization_cfop', 'manufactured_vpc_st_description', {
      type: Sequelize.STRING(100),
      allowNull: true,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('client_fiscal_parametrization_cfop', 'manaus_ag_sc_tv_description')
    await queryInterface.removeColumn('client_fiscal_parametrization_cfop', 'manufactured_vpc_st_code')
    await queryInterface.removeColumn('client_fiscal_parametrization_cfop', 'manufactured_vpc_st_description')
  }
};
