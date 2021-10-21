
import * as Yup from 'yup'

import flow from 'lodash/fp/flow'

import file from '@britania-crm/forms/validators/file.validator'
import required from '@britania-crm/forms/validators/required.validator'

export const VALUES_NAME = [
  { name: 'socialContractFile', label: 'social contract' },
  { name: 'contractualAlteration', label: 'contractual alteration' },
  { name: 'registrationFormFile', label: 'registration form' },
  { name: 'invoiceFile', label: 'payment slips or invoices from other suppliers' },

  { name: 'billingRatioFile', label: 'billing ratio' },

  { name: 'balance', label: 'balance' },
  { name: 'pre', label: 'dre' },

  { name: 'currentBalanceSheetFile', label: 'current balance sheet' },
  { name: 'lpIncomeTaxFile', label: 'pj income tax' },
  { name: 'fpIncomeTaxFile', label: 'pf income tax' },
  { name: 'defisDasnFile', label: 'defis dasn' },
  { name: 'pgdasFile', label: 'pgdas' },
  { name: 'holderDocumentFile', label: 'holder document' },
  { name: 'holderDriverLicenseFile', label: 'holder driver license' },
  { name: 'residenceProofFile', label: 'residence proof' },
  { name: 'specialRegimeLetterStFile', label: 'special regime letter st' },
  { name: 'letterOfTaxationRegimeFile', label: 'letter of taxation regime' },
  { name: 'genericConsultationMatoGrossoFile', label: 'generic consultation mato grosso' },
  { name: 'nationalSimpleConsultationFile', label: 'national simple consultation' },

  { name: 'syntacticQueryFile', label: 'sintegra consultation' },
  {
    name: 'general',
    label: 'others',
    max: 1
  }

]

export const INITIAL_VALUES_DOCUMENTS = {
  id: '',
  socialContractFileId: '',
  registrationFormFileId: '',
  invoicesFromOtherSuppliersFileId: '',
  billingRatioFileId: '',
  currentBalanceSheetFileId: '',
  lpIncomeTaxFileId: '',
  fpIncomeTaxFileId: '',
  defisDasnFileId: '',
  pgdasFileId: '',
  holderDocumentFileId: '',
  holderDriverLicenseFileId: '',
  residenceProofFileId: '',
  specialRegimeLetterStFileId: '',
  letterOfTaxationRegimeFileId: '',
  genericConsultationMatoGrossoFileId: '',
  nationalSimpleConsultationFileId: '',
  syntacticQueryFileId: '',

  socialContractFile: {},
  registrationFormFile: {},
  invoiceFile: {},
  billingRatioFile: {},
  currentBalanceSheetFile: {},
  lpIncomeTaxFile: {},
  fpIncomeTaxFile: {},
  defisDasnFile: {},
  pgdasFile: {},
  holderDocumentFile: {},
  holderDriverLicenseFile: {},
  residenceProofFile: {},
  specialRegimeLetterStFile: {},
  letterOfTaxationRegimeFile: {},
  genericConsultationMatoGrossoFile: {},
  nationalSimpleConsultationFile: {},
  syntacticQueryFile: {},
  contractualAlteration: [],

  balance: [],
  pre: [],
  general: []
}

export const documentsSchema = ({ t }) => Yup.object().shape({
  id: Yup.string(),
  socialContractFileId: Yup.string(),
  registrationFormFileId: Yup.string(),
  invoicesFromOtherSuppliersFileId: Yup.string(),
  billingRatioFileId: Yup.string(),
  currentBalanceSheetFileId: Yup.string(),
  lpIncomeTaxFileId: Yup.string(),
  fpIncomeTaxFileId: Yup.string(),
  defisDasnFileId: Yup.string(),
  pgdasFileId: Yup.string(),
  holderDocumentFileId: Yup.string(),
  holderDriverLicenseFileId: Yup.string(),
  residenceProofFileId: Yup.string(),
  specialRegimeLetterStFileId: Yup.string(),
  letterOfTaxationRegimeFileId: Yup.string(),
  genericConsultationMatoGrossoFileId: Yup.string(),
  nationalSimpleConsultationFileId: Yup.string(),

  socialContractFile: flow(
    file({ t }),
    required({ t, isNotText: true })
  )(Yup.mixed()),
  registrationFormFile: file({ t })(Yup.mixed()),
  invoiceFile: file({ t })(Yup.mixed()),
  billingRatioFile: file({ t })(Yup.mixed()),
  currentBalanceSheetFile: file({ t })(Yup.mixed()),
  lpIncomeTaxFile: file({ t })(Yup.mixed()),
  fpIncomeTaxFile: file({ t })(Yup.mixed()),
  defisDasnFile: file({ t })(Yup.mixed()),
  pgdasFile: file({ t })(Yup.mixed()),
  holderDocumentFile: file({ t })(Yup.mixed()),
  holderDriverLicenseFile: file({ t })(Yup.mixed()),
  residenceProofFile: file({ t })(Yup.mixed()),
  specialRegimeLetterStFile: file({ t })(Yup.mixed()),
  letterOfTaxationRegimeFile: file({ t })(Yup.mixed()),
  genericConsultationMatoGrossoFile: file({ t })(Yup.mixed()),
  nationalSimpleConsultationFile: file({ t })(Yup.mixed()),
  syntacticQueryFile: file({ t })(Yup.mixed()),

  balance: Yup.array().of(file({ t })(Yup.mixed())),
  pre: Yup.array().of(file({ t })(Yup.mixed())),
  general: Yup.array().of(file({ t })(Yup.mixed())),
  contractualAlteration: Yup.array().of(file({ t })(Yup.mixed()))
})
