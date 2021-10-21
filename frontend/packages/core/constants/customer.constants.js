export const enumTypeRegister = [
  { id: 'REGISTER', name: 'Cadastro' },
  { id: 'PRE_REGISTRATION', name: 'Pré cadastro' }
]

export const enumRegistrationStatus = [{ id: 'ACTIVE', name: 'Ativo' }, { id: 'INACTIVE', name: 'Inativo' }, { id: 'BOTH', name: 'Ambos' }]

export const enumCreditStatus = [
  { id: 'NORMAL', name: 'Normal' },
  { id: 'AUTOMATIC', name: 'Automático' },
  { id: 'ONLY_IMPLEMENT_ORDER', name: ' Só Imp Ped' },
  { id: 'SUSPENDED', name: 'Suspenso' },
  { id: 'CASH_PAYMENT', name: 'Pg à Vista' }
]

export const enumWorkflowTypeId = [
  {
    id: 9,
    code: 'ACtC',
    description: 'Alteração de Categoria do Cliente'
  },
  {
    id: 5,
    code: 'ACtC',
    description: 'Atualização de Cadastro de Cliente'
  },
  {
    id: 6,
    code: 'ARC',
    description: 'Alteração de Ranking de Cliente'
  },
  {
    id: 2,
    code: 'PCC',
    description: 'Pré Cadastro de Cliente'
  }
]

export const category = [
  { id: 'A', name: 'A' },
  { id: 'B', name: 'B' },
  { id: 'C', name: 'C' }
]

export const getRegimeLetterOptions = (t) => [
  {
    id: 'COMPLETE',
    name: '100%'
  },
  {
    id: 'PARTIAL',
    name: t('partial')
  },
  {
    id: 'BOTH',
    name: t('both')
  }
]
