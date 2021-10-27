'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('client_fiscal_parametrization_cfop', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: true
      },
      manufactured_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manufactured_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manufactured_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manufactured_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      national_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      national_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      national_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      national_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      imported_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      imported_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      imported_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      imported_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manufactured_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manufactured_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      national_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      national_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      national_st_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      national_st_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      imported_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      imported_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      imported_st_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      imported_st_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_tv_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_tv_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_tv_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_tv_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_tv_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_tv_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_tv_vpc_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_tv_vpc_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_notebook_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_notebook_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_notebook_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_notebook_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_notebook_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_notebook_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_notebook_vpc_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_notebook_vpc_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_microwave_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_microwave_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_microwave_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_microwave_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_microwave_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_microwave_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_microwave_vpc_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_microwave_vpc_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_minisystem_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_minisystem_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_minisystem_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_minisystem_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_minisystem_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_minisystem_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_minisystem_vpc_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_minisystem_vpc_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_arcon_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_arcon_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_arcon_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_arcon_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_arcon_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_arcon_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_arcon_vpc_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_arcon_vpc_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_monitor_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_monitor_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_monitor_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_monitor_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_monitor_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_monitor_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_monitor_vpc_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_monitor_vpc_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_smart_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_smart_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_smart_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_smart_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_smart_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_smart_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_smart_vpc_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_smart_vpc_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_tablet_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_tablet_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_tablet_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_tablet_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_tablet_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_tablet_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_tablet_vpc_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_tablet_vpc_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_desktop_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_desktop_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_desktop_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_desktop_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_desktop_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_desktop_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_desktop_vpc_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_desktop_vpc_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_free_manaus_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_free_manaus_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      manaus_ag_sc_tv_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_tv_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_tv_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_tv_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_tv_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_tv_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_tv_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      agc_sc_tv_vpc_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      agc_sc_tv_vpc_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      agc_sc_notebook_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      agc_sc_notebook_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      agc_sc_notebook_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      agc_sc_notebook_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_notebook_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_notebook_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      agc_sc_notebook_vpc_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      agc_sc_notebook_vpc_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_microwaves_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_microwaves_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_microwaves_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_microwaves_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_microwaves_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_microwaves_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_microwaves_vpc_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_microwaves_vpc_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_minisystem_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_minisystem_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_minisystem_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_minisystem_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_minisystem_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_minisystem_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_minisystem_vpc_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_minisystem_vpc_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_arcon_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_arcon_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_arcon_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_arcon_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_arcon_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_arcon_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_arcon_vpc_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_arcon_vpc_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_monitor_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_monitor_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_monitor_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_monitor_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_vpc_monitor_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_vpc_monitor_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_monitor_vpc_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_monitor_vpc_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_smart_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_smart_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_smart_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_smart_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_smart_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_smart_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_smart_vpc_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_smart_vpc_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },

      ag_sc_table_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_table_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_table_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_table_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_table_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_table_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_table_vpc_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_table_vpc_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_desktop_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_desktop_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_desktop_vpc_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_desktop_vpc_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_desktop_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_desktop_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_desktop_vpc_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sc_desktop_vpc_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },

      ag_sp_tv_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sp_tv_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sp_tv_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sp_tv_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sp_microwaves_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sp_microwaves_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sp_microwaves_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sp_microwaves_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sp_arcon_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sp_arcon_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sp_arcon_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sp_arcon_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sp_monitor_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sp_monitor_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sp_monitor_st_code: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
      ag_sp_monitor_st_description: {
        type: Sequelize.STRING(100),
        allowNull: true
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('client_fiscal_parametrization_cfop')
  }
};
