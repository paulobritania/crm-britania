'use strict';

const options = [
  {
    name: 'Todos Menus',
    alias: 'TODOS_MENUS'
  },
  {
    name: 'Administrativo',
    alias: 'ADMINISTRATIVO'
  },
  {
    name: 'Clientes',
    alias: 'CLIENTES'
  },
  {
    name: 'Pedidos',
    alias: 'PEDIDOS'
  },
  {
    name: 'Orçamento & Negociações',
    alias: 'ORCAMENTO_E_NEGOCIACOES'
  },
  {
    name: 'Vendas',
    alias: 'VENDAS'
  },
  {
    name: 'Notas Fiscais e Agendamentos',
    alias: 'NOTAS_FICAIS_E_AGENDAMENTOS'
  },
  {
    name: 'Contratos',
    alias: 'CONTRATOS'
  },
  {
    name: 'Catálogos',
    alias: 'CATALOGOS'
  },
  {
    name: 'VPC',
    alias: 'VPC'
  },
  {
    name: 'Financeiro',
    alias: 'FINANCEIRO'
  },
  {
    name: 'Biblioteca',
    alias: 'BIBLIOTECA'
  },
  {
    name: 'Dashboard',
    alias: 'DASHBOARD'
  },
  {
    name: 'Menu',
    alias: 'MENU'
  },
]

const created_at = new Date().toISOString()
const data = options.map(item => {
  return {
    name: item.name,
    alias: item.alias,
    created_at
  }
})

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('accesses', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('accesses', data, {});
  }
};
