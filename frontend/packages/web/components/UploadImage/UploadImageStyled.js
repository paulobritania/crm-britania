import React, { useCallback, useMemo, memo } from 'react'
import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import InfoIcon from '@material-ui/icons/Info'

import { MSG025 } from '@britania-crm/constants/feedbackMessages.constants'
import { AppActions } from '@britania-crm/stores/app'
import { colors } from '@britania-crm/styles'
import { areEqual } from '@britania-crm/utils/memo'

import DropzoneFile from '../DropzoneFile'
import PreviewFile from '../PreviewFile'
import useStyles, { ErrorBox } from './styles'

const UploadImage = ({
  onChange,
  error,
  types,
  value,
  clearable,
  preview,
  previewStyle,
  defaultFile,
  hideWhenHasValue,
  title,
  description
}) => {
  const dispatch = useCallback(useDispatch(), [])

  const classes = useStyles()

  const hasFile = useMemo(() => value || defaultFile, [defaultFile, value])

  const hasPreview = useMemo(() => preview && !!hasFile, [hasFile, preview])

  const handleUpload = useCallback(
    (e) => {
      const ext = e[0]?.name.split('.').pop()
      if (!types.includes(e[0].type || ext)) {
        dispatch(
          AppActions.addAlert({
            type: 'error',
            message: MSG025
          })
        )
        onChange('')
        return
      }

      onChange(e[0])
    },
    [dispatch, onChange, types]
  )

  const onRemove = useCallback(() => {
    onChange('')
  }, [onChange])

  return (
    <Grid container spacing={2} alignItems='center'>
      {(!value || (hasFile && !hideWhenHasValue)) && (
        <Grid item xs={12} sm={hasPreview ? 6 : 12}>
          <DropzoneFile
            handleUpload={handleUpload}
            types={types.toString()}
            title={title}
            description={description}
          />
          <ErrorBox>
            {!!error && (
              <Box
                style={{ color: colors.error.main }}
                component='span'
                display='flex'
                alignItems='center'
              >
                <InfoIcon fontSize='small' style={{ marginRight: '8px' }} />{' '}
                {error}
              </Box>
            )}
          </ErrorBox>
        </Grid>
      )}

      <Grid
        item
        xs={12}
        sm={hideWhenHasValue ? 12 : 6}
        className={classes.preview}
      >
        <PreviewFile
          file={value}
          onRemove={clearable && onRemove}
          style={previewStyle}
          defaultFile={defaultFile}
          hasPreview={hasPreview}
        />
      </Grid>
    </Grid>
  )
}

UploadImage.propTypes = {
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  types: PropTypes.array,
  clearable: PropTypes.bool,
  preview: PropTypes.bool,
  previewStyle: PropTypes.object,
  value: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  defaultFile: PropTypes.any,
  hideWhenHasValue: PropTypes.bool,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}

UploadImage.defaultProps = {
  onChange() {},
  error: null,
  types: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
  value: '',
  preview: false,
  previewStyle: {},
  clearable: false,
  defaultFile: '',
  hideWhenHasValue: false
}

export default memo(UploadImage, areEqual)
