import * as Yup from 'yup'

export const INITIAL_VALUES = {
  lineDescription: []
}

export default () =>
  Yup.object().shape({
    lineDescription: Yup.array()
  })
