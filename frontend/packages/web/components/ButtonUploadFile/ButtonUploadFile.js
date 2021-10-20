import React, {
  forwardRef,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import ButtonUploadFileForm from './ButtonUploadFileForm'
import ButtonUploadFileStyled from './ButtonUploadFileStyled'

const ButtonUploadFile = forwardRef((props, ref) => {
  const {
    detached,
    ...rest
  } = props

  const Input = useMemo(
    () => detached ? ButtonUploadFileStyled : ButtonUploadFileForm,
    [detached]
  )

  return (
    <Input ref={ ref } { ...rest }/>
  )
})

ButtonUploadFile.propTypes = { detached: PropTypes.bool }

ButtonUploadFile.defaultProps = { detached: false }

export default ButtonUploadFile
