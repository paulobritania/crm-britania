import { createActions } from 'reduxsauce'

/**
 * Creating actions and types with reduxsauce.
 */
export const { Types, Creators } = createActions({ getFields: ['accessId', 'onSuccess', 'onLoader'] })

export {
  Types as FieldTypes,
  Creators as FieldActions
}
