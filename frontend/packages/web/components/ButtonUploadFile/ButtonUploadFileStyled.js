import React, {
  useCallback,
  useMemo,
  useRef
} from 'react'
// import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'
import uuid from 'short-uuid'

import { find } from 'lodash'
import filter from 'lodash/filter'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'
import reduce from 'lodash/reduce'
import size from 'lodash/size'

import Box from '@material-ui/core/Box'
import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import ImageOutlined from '@material-ui/icons/ImageOutlined'
import InfoIcon from '@material-ui/icons/Info'

// import { MSG025 } from '@britania-crm/constants/feedbackMessages.constants'
// import { AppActions } from '@britania-crm/stores/app'
import colors from '@britania-crm/styles/colors'
import Button from '@britania-crm/web-components/Button'
import DeleteIcon from '@britania-crm/web-components/Icons/DeleteIcon'
import DownloadIcon from '@britania-crm/web-components/Icons/DownloadIcon'

import useStyles, { ErrorBox } from './styles'

const ButtonUploadFileStyled = ({
  onChange,
  error,
  types,
  value,
  className,
  variant,
  buttonLabel,
  label,
  required,
  isLoading,
  disabled,
  multiple,
  toDownload,
  toDelete,
  toUpload,
  name,
  max
}) => {
  // const dispatch = useCallback(useDispatch(), [])
  const classes = useStyles()

  const inputRef = useRef(null)

  const hasFile = useMemo(
    () => value instanceof File || !isEmpty(value),
    [value]
  )

  const inputKey = useMemo(
    () => uuid().new(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [value]
  )

  const canAddMoreFiles = useMemo(
    () => {
      if (multiple) {
        return max ? size(value) < max : true
      }
      return !hasFile
    }
    ,
    [hasFile, max, multiple, value]
  )

  const handleUpload = useCallback(
    (e) => {
      let file = e && e[0]

      if (file) {
        // if (!types.includes(e[0].type)) {
        //   dispatch(AppActions.addAlert({
        //     type: 'error',
        //     message: MSG025
        //   }))
        //   onChange(multiple ? [] : '')
        //   return
        // }

        if (multiple) {
          const getExtension = (str) => {
            const strBreaked = str.split('.')
            return `.${ strBreaked[strBreaked.length - 1] }`
          }
          const getNameWithoutExtension = (str) => {
            const strBreaked = str.split('.')
            return strBreaked
              .slice(0, strBreaked.length - 1)
              .join('.')
          }
          const { name } = file

          if (find(value, (item) => item.file?.filename === name || item.name === name)) {
            const nameWithoutExtension = getNameWithoutExtension(name)
            const extension = getExtension(name)

            const newCounter = reduce(
              value,
              (acc, item) => {
                const filename = item.file?.filename || item.name
                const fileExtension = getExtension(filename)

                if (fileExtension === extension) {
                  const filenameWithoutExtension = getNameWithoutExtension(filename)
                  const filenameBreaked = filenameWithoutExtension.split('(')

                  const filenameOriginal = filenameBreaked
                    .slice(0, filenameBreaked.length > 1 ? filenameBreaked.length - 1 : 1)
                    .join('(')

                  if (nameWithoutExtension.trim() === filenameOriginal.trim()) {
                    return acc + 1
                  }
                }
                return acc
              },
              0
            )
            if (newCounter > 0) {
              file = new File([file], `${ nameWithoutExtension } (${ newCounter })${ extension }`)
            }
          }
        }

        onChange(multiple ? [...value, file] : file)
        toUpload(file, name)
      }
    },
    [multiple, name, onChange, toUpload, value]
  )

  const removeFile = useCallback(
    (file, index) => {
      const newValue = multiple ? filter(value, (_, i) => i !== index) : ''

      onChange(newValue)
      toDelete(file)
    },
    [multiple, onChange, toDelete, value]
  )

  const createChip = useCallback(
    (file, index) => (
      <Chip
        key={ `${ file.filename || file.name }-${ index }` }
        label={ file.filename || file.name }
        variant="outlined"
        deleteIcon={
          <>
            {file.id && (
              <DownloadIcon
                className={ classes.iconImage }
                onClick={ () => toDownload(name, file) }
                color={ colors.secondary.main }
                colorHover={ colors.info.main }
              />
            )}
            {!disabled && (
              <DeleteIcon
                className={ classes.iconImage }
                onClick={ () => removeFile(file, index) }
                color={ colors.secondary.main }
                colorHover={ colors.info.main }
              />
            )}
          </>
        }
        onDelete={ () => {} }
        icon={ <ImageOutlined /> }
        classes={ { root: classes.chip, label: classes.labelChip } }
      />
    ),
    [classes.chip, classes.iconImage, classes.labelChip, disabled, name, removeFile, toDownload]
  )

  const showChip = useMemo(
    () => {
      if (multiple) {
        return map(value, (file, index) => createChip(file.file || file, index))
      }
      return hasFile && createChip(value)
    },
    [createChip, hasFile, multiple, value]
  )

  return (
    <Grid container style={ { marginBottom: 5 } }>
      <Grid item xs={ 12 } >
        <InputLabel
          required={ required }
          error={ !!error }
          style={ {
            color: error ? colors.error.main : colors.black,
            paddingBottom: 5,
            paddingLeft: 5
          } }
        >
          {label}
        </InputLabel>

        <input
          key={ inputKey }
          ref={ inputRef }
          accept={ types.toString() }
          className={ classes.input }
          id={ `button-file-${ name }` }
          multiple={ multiple }
          type="file"
          name={ name }
          onChange={ (e) => handleUpload(e.target.files) }
        />

        {!disabled && canAddMoreFiles && (
          <label htmlFor={ `button-file-${ name }` }>
            <Button
              id={ name }
              component="span"
              size="small"
              variant={ variant }
              className={ className }
              isLoading={ isLoading }
            >
              {buttonLabel}
            </Button>
          </label>
        )}
      </Grid>

      <Grid
        item
        xs={ 12 }
        className={ classes.cardImage }
        style={ {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center'
        } }
      >
        { showChip }
      </Grid>

      <Grid item xs={ 12 }>
        <ErrorBox>
          {!!error && (
            <Box style={ { color: colors.error.main } } component="span" display="flex" alignItems="center">
              <InfoIcon fontSize="small" style={ { marginRight: '8px' } } />
              {' '}{ error }
            </Box>
          )}
        </ErrorBox>
      </Grid>

    </Grid>
  )
}

ButtonUploadFileStyled.propTypes = {
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  types: PropTypes.array,
  value: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.object,
    PropTypes.string
  ]).isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf(['outlined', 'contained', 'text']),
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  buttonLabel: PropTypes.any,
  label: PropTypes.any,
  multiple: PropTypes.bool,
  toDownload: PropTypes.func,
  toDelete: PropTypes.func,
  toUpload: PropTypes.func,
  name: PropTypes.string.isRequired,
  max: PropTypes.number
}

ButtonUploadFileStyled.defaultProps = {
  onChange () {},
  error: null,
  types: ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'],
  value: '',
  className: null,
  variant: 'contained',
  buttonLabel: null,
  label: null,
  isLoading: false,
  required: false,
  disabled: false,
  multiple: false,
  toDelete () {},
  toDownload () {},
  toUpload () {},
  max: undefined
}

export default ButtonUploadFileStyled
