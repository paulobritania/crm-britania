import React, {
  useCallback,
  useMemo,
  useState
} from 'react'

import PropTypes from 'prop-types'

import debounce from 'lodash/debounce'
import isEmpty from 'lodash/isEmpty'
import uniqBy from 'lodash/uniqBy'

import I18n, { useT } from '@britania-crm/i18n'
import * as crmApiRoutes from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import Button from '@britania-crm/web-components/Button'
import Modal from '@britania-crm/web-components/Modal'
import TransferList from '@britania-crm/web-components/TransferList'

import {
  BindContainer,
  ButtonContainer
} from '../styles'

const LinkRepresentativeModal = (props) => {
  const {
    id,
    open,
    handleClose,
    onSave,
    initialRepresentatives,
    username
  } = props

  const t = useT()
  const [queryParams, setQueryParams] = useState({ name: '' })

  const {
    data: representatives = [],
    loading
  } = useCrmApi([crmApiRoutes.representatives.baseRoute, queryParams], { params: queryParams })
  const [selectedRepresentatives, setSelectedRepresentatives] = useState(initialRepresentatives)

  const debounceQuery = debounce((filter) => {
    if (filter.length >= 3)setQueryParams({ name: filter })
  }, 300)

  const loadingRepresentatives = useMemo(
    () => isEmpty(representatives) && loading,
    [loading, representatives]
  )

  const handleConfirm = useCallback(
    () => {
      onSave(selectedRepresentatives)
      handleClose()
    },
    [handleClose, onSave, selectedRepresentatives]
  )

  const onFilterChange = useCallback((side, filter) => {
    if (side === 'left')debounceQuery(filter)
  }, [debounceQuery])

  const options = useMemo(() =>
    queryParams.name || selectedRepresentatives ? uniqBy([...selectedRepresentatives, ...representatives], 'code') : [],
  [queryParams.name, representatives, selectedRepresentatives])

  return (
    <Modal
      id={ id }
      title={ t('link of {this}', { this: t('representative', { howMany: 2 }) }) }
      open={ open }
      maxWidth="md"
      fullWidth
      FooterComponent={ () => (
        <ButtonContainer>
          <Button
            color="secondary"
            variant="outlined"
            onClick={ handleClose }
          >
            <I18n>cancel</I18n>
          </Button>
          <Button
            color="secondary"
            variant="contained"
            onClick={ handleConfirm }
          >
            <I18n>save</I18n>
          </Button>
        </ButtonContainer>
      ) }
    >
      <BindContainer>
        <TransferList
          detached
          title={ t('representative', { howMany: 2 }) }
          value={ selectedRepresentatives }
          options={ options }
          onChange={ setSelectedRepresentatives }
          loading={ loadingRepresentatives }
          onFilterChange = { onFilterChange }
          valueKey="code"
          header={ username }
          type={ t('user', { howMany: 1 }) }
        />
      </BindContainer>
    </Modal>
  )
}

LinkRepresentativeModal.propTypes = {
  id: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  onSave: PropTypes.func.isRequired,
  initialRepresentatives: PropTypes.array,
  username: PropTypes.string
}

LinkRepresentativeModal.defaultProps = { initialRepresentatives: [], username: '' }

export default LinkRepresentativeModal
