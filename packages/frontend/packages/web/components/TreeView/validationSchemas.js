import * as yup from 'yup'

export const responseValidationSchema = yup.array().of(yup.object({
  type: yup.object().required(),
  requiresJustification: yup.boolean().required(),
  title: yup.string().required(),
  nextTaskOrder: yup.string().nullable(),
  finishWorkflowWithError: yup.boolean().required(),
  finishWorkflowSuccessfully: yup.boolean().required()
})).required().min(1)

export const conditionValidationSchema = yup.array().of(yup.object({
  title: yup.string().required(),
  fieldId: yup.number().required(),
  accessId: yup.number().required(),
  comparisonSymbol: yup.string().required(),
  comparisonValue: yup.string().required(),
  type: yup.object().required()
}))
