import React, {
  forwardRef,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import RichTextEditorForm from './RichTextEditorForm'
import RichTextEditorStyled from './RichTextEditorStyled'

const RichTextEditor = forwardRef((props, ref) => {
  const { detached, ...rest } = props

  const Input = useMemo(
    () => detached ? RichTextEditorStyled : RichTextEditorForm,
    [detached]
  )

  return (
    <Input ref={ ref } { ...rest }/>
  )
})

RichTextEditor.propTypes = {
  detached: PropTypes.bool,
  value: PropTypes.string
}

RichTextEditor.defaultProps = {
  detached: false,
  value: ''
}

export default RichTextEditor
