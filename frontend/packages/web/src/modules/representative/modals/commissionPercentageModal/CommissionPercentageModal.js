import React, {
  useRef,
  useCallback,
  useMemo,
  useState
} from 'react'

import PropTypes from 'prop-types'

import filter from 'lodash/filter'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'

import Grid from '@material-ui/core/Grid'

import { useFormEffect } from '@britania-crm/forms'
import commissionPercentageSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/representative/commissionPercentage.schema'
import I18n, { useT } from '@britania-crm/i18n'
import {
  establishments,
  lines
} from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import InputPercentage from '@britania-crm/web-components/InputPercentage'
import Modal from '@britania-crm/web-components/Modal'

import { ButtonContainer } from '../styles'

const CommissionPercentageModal = ({
  id, open, handleClose, onSave, row, commissionAndPorcentage, onEdit
}) => {
  const t = useT()
  const formRef = useRef(null)
  const [loading, setLoading] = useState(false)

  const [currentEstablishment, setCurrentEstablishment] = useState('')

  const { data: linesFromApi } = useCrmApi(lines.getAll)

  const estabelishmentsParams = useMemo(() => (
    { page: 1, pageSize: 10 }
  ), [])

  const OPTIONS_LINES = useMemo(
    () => filter(linesFromApi,
      (item) => !find(commissionAndPorcentage,
        ({ lineCode, establishmentCode }) =>
          lineCode === item.lineCode &&
        establishmentCode === currentEstablishment.establishmentCode
      )
    ),
    [commissionAndPorcentage, currentEstablishment.establishmentCode, linesFromApi]
  )

  const handleSubmit = useCallback(
    (values) => {
      setLoading(true)
      if (!isEmpty(row)) {
        onEdit(values, setLoading)
      } else {
        onSave(values, setLoading)
      }
      handleClose()
    },
    [handleClose, onEdit, onSave, row]
  )

  useFormEffect(() => {
    if (!isEmpty(row)) {
      formRef.current.setData({
        establishment: { establishmentCode: row.establishmentCode, establishmentDescription: row.establishmentDescription },
        childLine: { lineCode: row.lineCode, lineDescription: row.lineDescription },
        commission: row.commissionPercentage
      })
    }
  }, [formRef, row])

  return (
    <Modal
      id={ id }
      open={ open }
      title={ t('commission percentage') }
      maxWidth="md"
      fullWidth
      escapeWhenLoading
      loading={ loading }
      FooterComponent={ () => (
        <ButtonContainer>
          <Button
            color="secondary"
            variant="outlined"
            isLoading={ loading }
            onClick={ () => {
              handleClose()
              formRef.current.reset()
            }
            }
          >
            <I18n>cancel</I18n>
          </Button>
          <Button
            color="secondary"
            variant="contained"
            isLoading={ loading }
            onClick={ () => formRef.current.submit() }
          >
            <I18n>save</I18n>
          </Button>
        </ButtonContainer>
      ) }
    >
      <Form
        ref={ formRef }
        onSubmit={ handleSubmit }
        schemaConstructor={ commissionPercentageSchema }
        defaultValues={ INITIAL_VALUES }
      >
        <Grid container item sm={ 12 } spacing={ 1 } >
          <Grid item sm={ 12 } md={ 4 }>
            <InputAutocomplete
              url={ establishments.getAll }
              params={ estabelishmentsParams }
              paramName="description"
              valueKey="establishmentDescription"
              name="establishment"
              label={ t('establishment') }
              onValueChange={ setCurrentEstablishment }
            />
          </Grid>
          <Grid item sm={ 12 } md={ 3 }>
            <InputAutocomplete
              options={ OPTIONS_LINES }
              // url={ lines.getAll }TODO: se mudar a rota para paginado utilizar assim
              paramName="lineCode"
              valueKey="lineDescription"
              label={ t('child line') }
              name="childLine"
            />
          </Grid>
          <Grid item sm={ 12 } md={ 3 }>
            <InputPercentage
              label={ t('commission') }
              name="commission"
            />
          </Grid>
        </Grid>
      </Form>
    </Modal>
  )
}

CommissionPercentageModal.propTypes = {
  id: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSave: PropTypes.func,
  row: PropTypes.object,
  commissionAndPorcentage: PropTypes.array,
  onEdit: PropTypes.func
}

CommissionPercentageModal.defaultProps = {
  onSave () {},
  row: {},
  commissionAndPorcentage: [],
  onEdit () {}
}

export default CommissionPercentageModal
