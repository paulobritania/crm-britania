import * as Yup from 'yup'

import date from '@britania-crm/forms/validators/date.validator'

export const INITIAL_VALUES = {
  clientRegistrationType: '',
  clientRegistrationStatus: '',
  parentCompany: '',
  parentCompanyCode: '',
  creditSituation: '',
  daysWithoutBilling: '',
  cnpj: '',
  cdCode: '',
  responsibleService: '',
  regionalManager: {},
  companyName: '',
  registrationInclusionDate: '',
  registrationConclusionDate: '',
  workflowTypeId: '',
  version: '',
  workflowTask: [],
  state: '',
  city: '',
  category: '',
  clientGroup: {},
  regimeLetter: ''
}

export default ({ t }) => Yup.object().shape({
  clientRegistrationType: Yup.string(),
  clientRegistrationStatus: Yup.string(),
  parentCompany: Yup.string(),
  parentCompanyCode: Yup.string(),
  creditSituation: Yup.string(),
  daysWithoutBilling: Yup.string(),
  cnpj: Yup.string(),
  cdCode: Yup.string(),
  responsibleService: Yup.string(),
  regionalManager: Yup.object().nullable(),
  companyName: Yup.string(),
  registrationInclusionDate: date({ t })(Yup.string()),
  registrationConclusionDate: date({ t })(Yup.string()),
  workflowTypeId: Yup.string(),
  workflowTaskId: Yup.object().shape({ id: Yup.string(), title: Yup.string() }),
  version: Yup.string(),
  workflowTask: Yup.array(),
  state: Yup.string(),
  city: Yup.string(),
  category: Yup.string(),
  clientGroup: Yup.object(),
  regimeLetter: Yup.string()
})
