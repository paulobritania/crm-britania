
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect
} from 'react'

import PropTypes from 'prop-types'

import filter from 'lodash/filter'
import find from 'lodash/find'
import map from 'lodash/map'
import size from 'lodash/size'

import Grid from '@material-ui/core/Grid'

import I18n, { useT } from '@britania-crm/i18n'
import { fields as fieldsCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import Button from '@britania-crm/web-components/Button'
import InputSelect from '@britania-crm/web-components/InputSelect'
import Modal from '@britania-crm/web-components/Modal'
import TransferList from '@britania-crm/web-components/TransferList'

import useStyles from '../styles'

const MicroViewingModal = ({
  id,
  open,
  handleClose,
  accessesSelected,
  fieldSelected, // TODO  vamos utilizar para saber quem já foi selecionado no editar
  microViewList,
  isEdit,
  onSave
}) => {
  const t = useT()
  const classes = useStyles()

  const [selectedMenuId, setSelectedMenuId] = useState()
  const [fieldsSelectedInList, setFieldsSelectedInList] = useState([])

  const {
    data,
    loading
  } = useCrmApi(selectedMenuId ? [`${ fieldsCrmRoutes.get }/${ Number(selectedMenuId) }`, selectedMenuId] : null)

  const filterOptions = useMemo(() => {
    const existingAccess = map(microViewList, ({ access }) => access)
    return filter(accessesSelected, (item) => !find(existingAccess, ({ id }) => id === item.id))
  }, [microViewList, accessesSelected])

  const filterOptionsField = useMemo(() =>
    filter(data, (item) => find(fieldSelected, ({ id }) => id === item.id))
  , [data, fieldSelected])

  const handleSaveMicroView = useCallback(() => {
    let microViewObject = {}
    const selectedMenuObject = find(accessesSelected, (access) => access.id === selectedMenuId)

    const formatForHiddenFieldObject = (field) => ({
      id: field.id,
      name: field.name
    })
    const fieldsFormattedForHiddenFields = fieldsSelectedInList.map((field) => formatForHiddenFieldObject(field))
    const existingMicroView = find(microViewList, (microView) => microView.access.name === selectedMenuObject.name)

    if (existingMicroView) {
      microViewObject = {
        ...existingMicroView,
        hiddenFields: fieldsFormattedForHiddenFields
      }
    } else {
      microViewObject = {
        access: selectedMenuObject,
        hiddenFields: fieldsFormattedForHiddenFields
      }
    }
    onSave(microViewObject)
    handleClose()
  }, [fieldsSelectedInList, handleClose, microViewList, onSave, accessesSelected, selectedMenuId])

  useEffect(() => {
    if (size(filterOptions) > 0) {
      setSelectedMenuId(filterOptions[0].id)
    }
  }, [filterOptions])

  useEffect(() => {
    setFieldsSelectedInList([])
  }, [selectedMenuId])

  useEffect(() => {
    if (isEdit) {
      setFieldsSelectedInList(filterOptionsField)
    }
  }, [filterOptionsField, isEdit])

  return (
    <Modal
      id={ id }
      open={ open }
      title={ t('micro viewing') }
      maxWidth="md"
      fullWidth
      loading={ loading }
      FooterComponent={ () => (
        <Grid container alignItems="center" justify="center" spacing={ 2 } className={ classes.buttons }>
          <I18n as={ Button }
            color="secondary"
            onClick={ handleClose }
            size="small"
            variant="outlined"
            width="200px"
            disabled={ loading }
          >
            cancel
          </I18n>
          <I18n as={ Button }
            color="secondary"
            onClick={ handleSaveMicroView }
            size="small"
            variant="contained"
            width="200px"
            disabled={ loading }
          >
            save
          </I18n>
        </Grid>
      ) }
    >
      <Grid item xs={ 7 }>
        <InputSelect
          detached
          name="menuToViewMicro"
          label={ t('micro view menu') }
          onChange={ ({ target }) => setSelectedMenuId(Number(target.value)) }
          value={ selectedMenuId }
          options={ filterOptions }
          disabled={ isEdit }
          required
        />
      </Grid>
      <Grid container direction="column">
        <TransferList
          detached
          options={ data }
          value={ fieldsSelectedInList }
          onChange={ setFieldsSelectedInList }
          title={ t('field', { howMany: 2 }) }
          loading= { loading }
          onFilterChange={ false }
        />
      </Grid>
    </Modal>
  )
}

MicroViewingModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  accessesSelected: PropTypes.array,
  fieldSelected: PropTypes.array,
  microViewList: PropTypes.array,
  isEdit: PropTypes.bool,
  onSave: PropTypes.func
}

MicroViewingModal.defaultProps = {
  accessesSelected: [],
  fieldSelected: [],
  microViewList: [],
  isEdit: false,
  onSave () {}
}

export default MicroViewingModal
