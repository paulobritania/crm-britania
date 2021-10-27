import React, { useMemo } from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { formatPathToCloudStorageUrl } from '@britania-crm/utils/files'
import Modal from '@britania-crm/web-components/Modal'
import PreviewImage from '@britania-crm/web-components/PreviewImage'
import PreviewPDF from '@britania-crm/web-components/PreviewPDF'

import useStyles, { PdfContainer } from '../styles'

const DocumentationCustomerModal = ({
  id, open, imagePreview
}) => {
  const classes = useStyles()

  const imageUrl = useMemo(
    () => formatPathToCloudStorageUrl(imagePreview.path),
    [imagePreview]
  )

  const imageType = useMemo(
    () => {
      switch (imagePreview.type || imagePreview.contentType) {
        case 'application/pdf':
          return 'pdf'
        case 'application/vnd.ms-excel':
          return 'excel'
        case 'video/mp4':
          return 'video'
        default:
          return 'image'
      }
    },
    [imagePreview])

  return (
    <Modal
      id={ id }
      open={ open }
      maxWidth="md"
      fullWidth
      escapeWhenLoading
    >
      <Grid container item sm={ 12 } spacing={ 1 } className={ classes.documentation }>
        {imageType === 'pdf' ? (
          <PdfContainer>
            <PreviewPDF
              url={ imageUrl }
              defaultPdf={ imagePreview }
            />
          </PdfContainer>
        ) : (
          <PreviewImage
            url={ imageUrl }
            rightStyles={ { width: '100%' } }
            defaultImg={ imagePreview }
          />
        )}

      </Grid>
    </Modal>
  )
}

DocumentationCustomerModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  imagePreview: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string
  ]).isRequired
}

DocumentationCustomerModal.defaultProps = {}

export default DocumentationCustomerModal
