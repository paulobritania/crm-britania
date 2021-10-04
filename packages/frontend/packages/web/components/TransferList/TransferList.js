import React, {
  forwardRef,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import TransferListForm from './TransferListForm'
import TransferListStyled from './TransferListStyled'

const TransferList = forwardRef((props, ref) => {
  const {
    detached,
    ...rest
  } = props

  const Input = useMemo(
    () => detached ? TransferListStyled : TransferListForm,
    [detached]
  )

  return (
    <Input ref={ ref } { ...rest }/>
  )
})

TransferList.propTypes = {
  detached: PropTypes.bool,
  value: PropTypes.any
}

TransferList.defaultProps = {
  detached: false,
  value: []
}

export default TransferList
