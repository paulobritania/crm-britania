import React, {
  useCallback,
  useMemo
} from 'react'

import PropTypes from 'prop-types'

import Chip from '@material-ui/core/Chip'
import Grid from '@material-ui/core/Grid'
import ImageOutlined from '@material-ui/icons/ImageOutlined'

import { useT } from '@britania-crm/i18n'
import colors from '@britania-crm/styles/colors'
import { formatPathToCloudStorageUrl } from '@britania-crm/utils/files'
import IconButton from '@britania-crm/web-components/IconButton'
import DeleteIcon from '@britania-crm/web-components/Icons/DeleteIcon'
import PreviewImage from '@britania-crm/web-components/PreviewImage'
import PreviewPDF from '@britania-crm/web-components/PreviewPDF'
import Tooltip from '@britania-crm/web-components/Tooltip'

import useStyles from './styles'

const PreviewFile = ({
  file, style, defaultFile, onRemove, hasPreview
}) => {
  const classes = useStyles()
  const t = useT()

  const normalizeFile = useMemo(
    () => {
      if (file.id) {
        return formatPathToCloudStorageUrl(file.path)
      }
      if (file instanceof File) {
        return URL.createObjectURL(file)
      }
      return file
    },
    [file]
  )

  const type = useMemo(
    () => {
      switch (file.type || file.contentType) {
        case 'application/pdf':
          return 'pdf'
        case 'image/jpeg':
          return 'image'
        case 'image/png':
          return 'image'
        case 'video/mp4':
          return 'video'
        default:
          return 'excel'
      }
    },
    [file])

  const nameFile = useMemo(
    () => {
      if (file?.filename) {
        return file?.filename
      }
      return file?.name
    },
    [file])

  const handleError = useCallback(
    (e) => {
      e.target.onerror = null
      e.target.src = defaultFile
    },
    [defaultFile]
  )

  return (
    <Grid container justify="flex-end" >
      {onRemove && file && hasPreview && type !== 'excel' && type !== 'video' && (
        <Grid item xs={ 1 } >
          <Tooltip title={ t('datagrid body delete tooltip') } arrow>
            <IconButton color="care" onClick={ onRemove }>
              <DeleteIcon color={ colors.red.base } size={ 24 }/>
            </IconButton>
          </Tooltip>
        </Grid>
      )}
      {hasPreview && file && type !== 'excel' && type !== 'video' && (
        <Grid item xs={ 12 } className={ file && classes.preview }>
          {type === 'pdf' ? (
            <PreviewPDF
              url={ normalizeFile }
              defaultPdf={ defaultFile }
            />
          ) : (
            <PreviewImage
              url={ normalizeFile }
              rightStyles={ style }
              defaultImg={ defaultFile }
              onError={ handleError }
            />
          )}
        </Grid>
      )}
      {(file && (type === 'excel' || type === 'video')) && (
        <Grid item xs={ 12 } className={ file && classes.preview }>
          <Chip
            label={ nameFile }
            variant="outlined"
            deleteIcon={ <DeleteIcon color={ colors.red.base } size={ 24 }/> }
            onDelete={ onRemove }
            icon={ <ImageOutlined /> }
            style={ { height: 60 } }
          />
        </Grid>
      )}
    </Grid>
  )
}

PreviewFile.propTypes = {
  style: PropTypes.object,
  file: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]).isRequired,
  defaultFile: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]),
  onRemove: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.bool
  ]),
  hasPreview: PropTypes.bool
}
PreviewFile.defaultProps = {
  style: {},
  defaultFile: '',
  onRemove: undefined,
  hasPreview: false
}

export default PreviewFile
