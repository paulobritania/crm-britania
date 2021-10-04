import React, { useMemo } from 'react'

import PropTypes from 'prop-types'

import AssociatedDataListForm from './AssociatedDataListForm'
import AssociatedDataListStyled from './AssociatedDataListStyled'

const AssociatedDataList = (props) => {
  const {
    detached,
    value,
    ...rest
  } = props

  const Input = useMemo(
    () => detached ? AssociatedDataListStyled : AssociatedDataListForm,
    [detached]
  )

  return (
    <Input
      value={ value }
      { ...rest }
    />
  )
}

AssociatedDataList.propTypes = {
  detached: PropTypes.bool,
  value: PropTypes.any
}

AssociatedDataList.defaultProps = {
  detached: false,
  value: []
}

export default AssociatedDataList
