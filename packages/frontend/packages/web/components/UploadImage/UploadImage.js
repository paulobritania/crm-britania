import React, {
  forwardRef,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import UploadImageForm from './UploadImageForm'
import UploadImageStyled from './UploadImageStyled'

const UploadImage = forwardRef((props, ref) => {
  const {
    detached,
    ...rest
  } = props

  const Input = useMemo(
    () => detached ? UploadImageStyled : UploadImageForm,
    [detached]
  )

  return (
    <Input ref={ ref } { ...rest }/>
  )
})

UploadImage.propTypes = { detached: PropTypes.bool }

UploadImage.defaultProps = { detached: false }

export default UploadImage
