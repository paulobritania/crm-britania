import React, {
  useMemo,
  useCallback,
  forwardRef
} from 'react'
import { renderToString } from 'react-dom/server'
import { Quill } from 'react-quill'

import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import FormHelperText from '@material-ui/core/FormHelperText'
import InfoIcon from '@material-ui/icons/Info'

import { colors } from '@britania-crm/styles'

import {
  StyledRichTextEditor,
  StyledAttachFile
} from './styles'

/**
 * Add attach icon
 */
const icons = Quill.import('ui/icons')
icons.attach = renderToString(<StyledAttachFile />)

const RichTextEditorStyled = forwardRef(({
  error,
  onChange,
  getFiles,
  required,
  label: externalLabel,
  ...props
}, fieldRef) => {
  const handleAttach = useCallback(() => {
    if (getFiles) {
      const input = document.createElement('input')
      const fileExtensions = '.jpg,.xls, .xlsx, .pdf'

      input.setAttribute('type', 'file')
      input.setAttribute('accept', fileExtensions)
      // input.setAttribute('multiple', '')
      input.click()
      input.onchange = () => {
        getFiles(input.files)
      }
    }
  }, [getFiles])

  const label = useMemo(
    () => `${ externalLabel }${ required ? ' *' : '' }`,
    [externalLabel, required]
  )

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ color: [] }],
        [{ align: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'underline', 'strike', { script: 'sub' }, { script: 'super' }],
        [{ list: 'bullet' }, { list: 'ordered' }],
        ['link', getFiles ? 'attach' : undefined]
      ],
      handlers: { attach: handleAttach }
    },
    clipboard: { matchVisual: true }
  }), [getFiles, handleAttach])

  const handleChange = useCallback((text) => {
    const convertTextToEmpty = text === '<p><br></p>' ? '' : text
    onChange(convertTextToEmpty)
  }, [onChange])

  return (
    <>
      <StyledRichTextEditor
        { ...props }
        placeholder={ label }
        required={ required }
        forwardedRef={ fieldRef }
        modules={ modules }
        onChange={ handleChange }
        theme="snow"
      />
      <div style={ { marginLeft: 10, marginBottom: 10 } }>
        {!!error && (
          <FormHelperText error>
            <Box style={ { color: colors.error.main } } component="span" display="flex" alignItems="center">
              <InfoIcon fontSize="small" style={ { marginRight: '8px' } } />
              {' '}{ error }
            </Box>
          </FormHelperText>
        )}
      </div>
    </>
  )
})

RichTextEditorStyled.propTypes = {
  error: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  getFiles: PropTypes.func,
  required: PropTypes.bool,
  label: PropTypes.string
}

RichTextEditorStyled.defaultProps = {
  label: null,
  error: undefined,
  getFiles: undefined,
  required: false
}

export default RichTextEditorStyled
