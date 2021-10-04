import React, {
  useState,
  useCallback
} from 'react'
import { useSelector } from 'react-redux'

import PropTypes from 'prop-types'

import { getAllProfiles } from '@britania-crm/stores/profiles/profiles.selectors'
import Button from '@britania-crm/web-components/Button'
import Modal from '@britania-crm/web-components/Modal'
import TransferList from '@britania-crm/web-components/TransferList'

import useStyles, {
  Grid,
  BindContainer
} from './styles'

const ProfileLinkModal = ({
  id,
  open,
  handleClose,
  title,
  onSave,
  initialProfiles
}) => {
  const classes = useStyles()

  const [profilesSelected, setProfilesSelected] = useState(initialProfiles)

  const profiles = useSelector(getAllProfiles)

  const handleSubmit = useCallback(
    () => {
      onSave(profilesSelected)
      handleClose()
    },
    [handleClose, onSave, profilesSelected]
  )

  return (
    <Modal
      id={ id }
      open={ open }
      title={ `Vínculo de ${ title }` }
      maxWidth="lg"
      FooterComponent={ () => (
        <Grid container alignItems="center" justify="center" className={ classes.buttons }>
          <Button
            color="secondary"
            width="200px"
            variant="outlined"
            onClick={ handleClose }
          >
            Cancelar
          </Button>
          <Button
            color="secondary"
            width="200px"
            variant="contained"
            onClick={ handleSubmit }
          >
            Salvar
          </Button>
        </Grid>
      ) }
    >
      <BindContainer>
        <TransferList
          detached
          title={ title }
          value={ profilesSelected }
          options={ profiles }
          onChange={ setProfilesSelected }
        />
      </BindContainer>
    </Modal>
  )
}

export default ProfileLinkModal

ProfileLinkModal.propTypes = {
  id: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  onSave: PropTypes.func,
  initialProfiles: PropTypes.array
}

ProfileLinkModal.defaultProps = {
  handleSave () {},
  title: 'Perfis',
  rightData: [],
  leftData: [],
  onSave () {},
  initialProfiles: []
}
