const WorkflowClientRegisterSet = new Set([
  'companyName',
  'cnpj',
  'commercialPhone',
  'billingEmail',
  'invoiceShippingEmail',
  'publicPlace',
  'number',
  'district',
  'city',
  'country',
  'state',
  'zipCode'
])

const ClientAdditionalInformationSet = new Set([
  'initialContact',
  'shareCapital',
  'numbersOfEmployes'
])

const ClientFiscalInformationSet = new Set([
  'taxRegime'
])

const ClientFinancialSet = new Set(['standardIncome', 'carrier'])

const ClientPametrizationSet = new Set([
  'shortName',
  'parentCompany',
  'historic'
])

const ClientDocumentSet = new Set(['socialContractFileId'])

export {
  WorkflowClientRegisterSet,
  ClientAdditionalInformationSet,
  ClientFiscalInformationSet,
  ClientFinancialSet,
  ClientPametrizationSet,
  ClientDocumentSet
}
