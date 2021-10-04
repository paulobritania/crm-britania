
import React from 'react'

import PropTypes from 'prop-types'

import I18n from '@britania-crm/i18n'
import colors from '@britania-crm/styles/colors'
import Button from '@britania-crm/web-components/Button'

import { useFile } from '../../context/Files'
import {
  Preview,
  LeftBox,
  CenteredBox,
  RightBox,
  ShadowBox,
  ContentBox
} from '../../styles'
import Loading from '../Loading'
import Success from '../Success'
import Upload from '../Upload'
import Uploading from '../Uploading'

const UploadModal = ({ onRemoveClick }) => {
  const { uploadedFile: file, hasFile } = useFile()

  return (
    <ShadowBox>
      <ContentBox>

        {file.uploading && !file.error ? (
          <CenteredBox>
            <Uploading uploadPercentage={ file.progress || 0 } />
          </CenteredBox>
        ) : (
          <>
            <LeftBox>
              { (file.ready || file.error) && <Upload /> }
              { file.preview && !file.uploaded && !file.ready && <Success /> }
              {onRemoveClick && hasFile && (
                <Button
                  variant="text"
                  size="small"
                  color="default"
                  onClick={ onRemoveClick }
                  style={ {
                    fontSize: 14,
                    color: colors.britSupport1.base,
                    marginTop: 5
                  } }
                >
                  <I18n>remove image</I18n>
                </Button>
              )}
            </LeftBox>
            <RightBox>
              {!file.preview ? <Loading /> : <Preview src={ file.preview } />}
            </RightBox>
          </>
        )}
      </ContentBox>
    </ShadowBox>
  )
}

UploadModal.propTypes = { onRemoveClick: PropTypes.func }

UploadModal.defaultProps = { onRemoveClick: undefined }

export default UploadModal
