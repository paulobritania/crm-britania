import React, {
  useCallback,
  useState
} from 'react'

import PropTypes from 'prop-types'

import { useT } from '@britania-crm/i18n'
import {
  uploadFile,
  getFile,
  setDefaultImage
} from '@britania-crm/services/apis/crmApi/resources/administration.service'
import Button from '@britania-crm/web-components/Button'
import Checkbox from '@britania-crm/web-components/Checkbox'
import InfoIcon from '@britania-crm/web-components/Icons/infoIcon'
import Modal from '@britania-crm/web-components/Modal'
import Upload from '@britania-crm/web-components/Upload'

import {
  InfoContainer,
  FooterContainer,
  useStyles
} from './styles'

const LoginImageUploadModal = (props) => {
  const {
    id, open, handleClose
  } = props

  const t = useT()
  const classes = useStyles()

  const [checked, setChecked] = useState(false)
  const [makeUpload, setMakeUpload] = useState(false)
  const [makeDelete, setMakeDelete] = useState(false)
  const [showChecked, setShowChecked] = useState(true)
  const [hasFile, setHasFile] = useState(false)
  const [isPreview, setIsPreview] = useState(false)

  const handleSave = useCallback(() => {
    if (checked) {
      setMakeDelete(true)
      setMakeUpload(false)
    } else {
      setShowChecked(false)
      setMakeDelete(false)
      setMakeUpload(true)
    }
  }, [checked])

  const handleDefaultImageCheckboxChange = useCallback(
    async (event) => {
      const { checked: ch } = event.target
      setChecked(!!ch)
    },
    []
  )

  const FooterComponent = useCallback(
    () => (
      <FooterContainer>
        <InfoContainer>
          <InfoIcon/>
            A proporção ideal para sua imagem é 16:9
        </InfoContainer>
        <Checkbox
          disabled={ !hasFile }
          checked={ checked }
          onChange={ handleDefaultImageCheckboxChange }
          name="defaultLoginImage"
          color="primary"
          label={ t('login image use default') }
        />
        <Button
          style={ { marginTop: '20px', marginBottom: '30px' } }
          disabled={
            (!checked && !hasFile) ||
            (!checked && hasFile && !isPreview)
          }
          className={ classes.saveChangesButton }
          onClick={ handleSave }
        >
          { t('login image save') }
        </Button>
      </FooterContainer>
    ),
    [checked, classes.saveChangesButton, handleDefaultImageCheckboxChange, handleSave, hasFile, isPreview, t]
  )

  return (
    <Modal
      id={ id }
      open={ open }
      title="Imagem do Login"
      onClose={ handleClose }
      FooterComponent={ showChecked ? FooterComponent : null }
      maxWidth="md"
      fullWidth
      disableFullScreen
    >
      <>
        <Upload
          showsDefault={ checked }
          isPreview={ (value) => setIsPreview(value) }
          uploadFile={ uploadFile }
          deleteFile={ setDefaultImage }
          getFile={ getFile }
          hasFile={ (value) => setHasFile(value) }
          makeUpload={ makeUpload }
          makeDelete={ makeDelete }
          handleClose={ handleClose }
        />
      </>
    </Modal>
  )
}

LoginImageUploadModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired
}

export default LoginImageUploadModal
