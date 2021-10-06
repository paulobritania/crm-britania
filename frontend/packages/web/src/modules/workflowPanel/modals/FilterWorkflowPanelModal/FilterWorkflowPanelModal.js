import React, {
  useCallback,
  useRef,
  useMemo,
  useEffect,
  useState
} from 'react'
import { useSelector } from 'react-redux'

import clsx from 'clsx'
import PropTypes from 'prop-types'

import isEqual from 'lodash/isEqual'
import omitBy from 'lodash/omitBy'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import filterSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/workflow/workflow.filter.schema'
import I18n, { useT } from '@britania-crm/i18n'
import { getWorkflowTypes } from '@britania-crm/stores/workflow/workflow.selectors'
import { formatBackDateToIsoFormat } from '@britania-crm/utils/date'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputDateRange from '@britania-crm/web-components/InputDateRange'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'
import Modal from '@britania-crm/web-components/Modal'

import useStyles from './styles'

const FilterWorkflowPanelModal = ({
  id,
  open,
  handleClose,
  handleSearch,
  filters
}) => {
  const classes = useStyles()
  const workflowTypes = useSelector(getWorkflowTypes)
  const t = useT()

  const formRef = useRef(null)

  const [mounted, setMounted] = useState(false)

  const mockStatus = useMemo(
    () => [
      { id: 'ACTIVE', name: 'Ativo' },
      { id: 'PROGRAMMED', name: 'Ativo Programado' },
      { id: 'EXPIRED', name: 'Ativo Vencido' },
      { id: 'INACTIVE', name: 'Inativo' }
    ],
    []
  )

  const onCleanForm = useCallback(
    () => formRef.current.reset(),
    []
  )

  const handleSubmit = useCallback(
    (values) => {
      const { period, ...rest } = values

      if (period.from) {
        rest.dateStart = formatBackDateToIsoFormat(period.from)
      }
      if (period.to) {
        rest.dateEnd = formatBackDateToIsoFormat(period.to)
      }

      handleSearch(omitBy(rest, (field) => !field))
      handleClose()
    },
    [handleClose, handleSearch]
  )

  useEffect(
    () => {
      if (mounted && !isEqual(filters, INITIAL_VALUES)) {
        const {
          dateStart,
          dateEnd,
          ...values
        } = filters

        formRef.current.setData({
          ...values,
          period: {
            from: dateStart || INITIAL_VALUES.period.from,
            to: dateEnd || INITIAL_VALUES.period.to
          }
        })
      } else {
        setMounted(true)
      }
    },
    [filters, mounted]
  )

  return (
    <Modal
      id={ id }
      open={ open }
      classes={ { paperScrollPaper: classes.modal } }
      maxWidth="lg"
    >
      <Form
        ref={ formRef }
        schemaConstructor={ filterSchema }
        defaultValues={ INITIAL_VALUES }
        onSubmit={ handleSubmit }
      >
        <Grid className={ classes.card } >
          <Grid item xs={ 12 }>
            <I18n as={ Typography } variant="h6" gutterBottom className={ classes.title } >
              filter data
            </I18n>
          </Grid>
          <Grid item xs={ 12 } className={ classes.form }>
            <InputText
              name="title"
              label={ t('title') }
              className={ classes.input }
            />
            <InputSelect
              name="typeId"
              label={ t('type') }
              valueKey="description"
              options={ workflowTypes }
            />
            <InputSelect
              name="status"
              label={ t('status') }
              options={ mockStatus }
            />
            <InputDateRange
              name="period"
              label={ t('period', { howMany: 1 }) }
            />
          </Grid>
        </Grid>
      </Form>
      <Grid item className={ clsx(classes.buttons, classes.btnCancel) }>
        <I18n as={ Button }
          color="secondary"
          variant="text"
          onClick={ onCleanForm }
        >
          clean
        </I18n>
        <I18n as={ Button }
          color="secondary"
          variant="contained"
          onClick={ () => formRef.current.submit() }
          className={ classes.btnSave }
        >
          filter
        </I18n>
      </Grid>
    </Modal>
  )
}

FilterWorkflowPanelModal.propTypes = {
  id: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  handleSearch: PropTypes.func,
  filters: PropTypes.object
}

FilterWorkflowPanelModal.defaultProps = {
  handleSearch () {},
  filters: {}
}

export default FilterWorkflowPanelModal
