'use strict';

const viewName = 'vw_buyers_report'

const oldQuery = `SELECT [name] AS 'NOME COMPLETO',
[CPF] AS'CPF',
concat(a.street, ', ', a.number, ', ', a.district, ', ', a.cep, ', ', a.city, ', ', a.[state]) AS 'ENDERECO',
telephone AS 'TELEFONE',
[role] AS 'CARGO',
category AS 'CATEGORIA',
email AS 'E-MAIL',
birthday AS 'ANIVERSARIO',
client_totvs_code AS 'CODIGO DA MATRIZ',
bl.line_description AS 'LINHA',
bl.family_description AS 'FAMILIA',
bl.family_description AS 'RESPONSAVEL',
bl.regional_manager_description AS 'GERENTE REGIONAL',
voltage AS 'VOLTAGEM',
CASE
    WHEN b.active = 1 THEN 'Ativo'
    ELSE 'Inativo'
END AS 'STATUS'
FROM buyers b
INNER JOIN buyers_address ba ON b.id = ba.id_buyers
INNER JOIN [address] a ON a.id = ba.id_address
INNER JOIN buyers_lines_families bl ON b.id = bl.buyer_id
WHERE ba.address_type = 1
`

const newQuery = `SELECT [name] AS 'NOME COMPLETO',
[CPF] AS'CPF',
concat(a.street, ', ', a.number, ', ', a.district, ', ', a.cep, ', ', a.city, '/', a.[state]) AS 'ENDERECO',
telephone AS 'TELEFONE',
[role] AS 'CARGO',
category AS 'CATEGORIA',
email AS 'E-MAIL',
birthday AS 'ANIVERSARIO',
client_totvs_code AS 'CODIGO DA MATRIZ',
client_totvs_description AS 'NOME DA MATRIZ',
bl.line_description AS 'LINHA',
bl.family_description AS 'FAMILIA',
bl.family_description AS 'RESPONSAVEL',
bl.regional_manager_description AS 'GERENTE REGIONAL',
voltage AS 'VOLTAGEM',
CASE
    WHEN b.active = 1 THEN 'Ativo'
    ELSE 'Inativo'
END AS 'STATUS'
FROM buyers b
INNER JOIN buyers_address ba ON b.id = ba.id_buyers
INNER JOIN [address] a ON a.id = ba.id_address
INNER JOIN buyers_lines_families bl ON b.id = bl.buyer_id
WHERE ba.delivery_address = 1
`

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`ALTER VIEW ${viewName} AS ${newQuery}`);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(`ALTER VIEW ${viewName} AS ${oldQuery}`);
  }
};
