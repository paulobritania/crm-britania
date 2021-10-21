import React from 'react'

import FieldProvider from '../providers/FieldProvider'

const withField = (registerFieldOptions) => (WrappedField) => function (props) {
  return (
    <FieldProvider
      { ...props }
      registerFieldOptions={ registerFieldOptions }
      FieldComponent={ WrappedField }
    />
  )
}

export default withField
