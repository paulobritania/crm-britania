import React, {
  useMemo,
  useState,
  forwardRef,
  useCallback,
  useEffect
} from 'react'

import PropTypes from 'prop-types'

import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'

import * as ENUM_SELECTS from '@britania-crm/constants/customer.constants'
import { useFormEffect } from '@britania-crm/forms'
import customerFilterSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/customer/customer.filter.schema'
import I18n, { useT } from '@britania-crm/i18n'
import {
  clients,
  users,
  workflows
} from '@britania-crm/services/apis/crmApi/resources/routes'
import { searchStates } from '@britania-crm/services/apis/ibgeApi'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import InputCpfCnpj from '@britania-crm/web-components/InputCpfCnpj'
import InputDate from '@britania-crm/web-components/InputDate'
import InputNumber from '@britania-crm/web-components/InputNumber'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'
import RadioGroup from '@britania-crm/web-components/RadioGroup'

import useStyles from './styles'

const CustomerFormFilter = forwardRef(({ filters, ...props }, formRef) => {
  const t = useT()
  const classes = useStyles()

  const [show, setShow] = useState(false)
  const [type, setType] = useState('')
  const [version, setVersion] = useState('')
  const [registrationType, setRegistrationType] = useState('')
  const [stateOptions, setStateOptions] = useState([])

  const options = useMemo(() => ENUM_SELECTS.getRegimeLetterOptions(t), [t])

  const { data: versionFromApi } = useCrmApi(type && workflows.getVersionUrl(type))

  const getStateOptions = useCallback(
    async () => {
      const states = await searchStates()
      setStateOptions(states)
    },
    []
  )

  const onClickAdvancedSearchButton = useCallback(
    () => {
      setShow((old) => !old)
      formRef.current.reloadSchema()
    },
    [formRef]
  )

  const onChangeWorkflowTypeId = useCallback(
    () =>
      setType(formRef.current.getFieldValue('workflowTypeId'))
    ,
    [formRef]
  )

  const onChangeVersion = useCallback(
    () =>
      setVersion(formRef.current.getFieldValue('version'))
    ,
    [formRef]
  )

  useFormEffect(
    () => {
      if (isEmpty(versionFromApi)) {
        formRef.current.setFieldValue('version', '')
      }
    }, [formRef, versionFromApi])

  useEffect(() => {
    getStateOptions()
  }, [getStateOptions])

  useFormEffect(
    () => {
      if (
        !isEmpty(filters) &&
        !isEqual(formRef.current.getData(), filters)
      ) {
        formRef.current.setData((old) => ({
          ...filters,
          clientGroup: old.clientGroup,
          regionalManager: old.regionalManager
        }))
      }
    },
    [filters, formRef]
  )

  return (
    <Form
      ref={ formRef }
      { ...props }
      schemaConstructor={ customerFilterSchema }
      defaultValues={ INITIAL_VALUES }
    >
      <Grid container spacing={ 1 }>
        <Grid item xs={ 12 } md={ 3 }>
          <InputSelect
            name="clientRegistrationType"
            label={ t('type of registration') }
            valueKey= "name"
            idKey="id"
            options={ ENUM_SELECTS.enumTypeRegister }
            onValueChange={ setRegistrationType }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputSelect
            name="clientRegistrationStatus"
            label={ t('registration status') }
            valueKey="name"
            idKey= "id"
            options={ ENUM_SELECTS.enumRegistrationStatus }
            disabled={ !registrationType }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 6 }>
          <InputText
            label={ t('matrix') }
            name="parentCompany"
            disabled={ !registrationType }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputNumber
            label={ t('matrix code', { abbreviation: false }) }
            name="parentCompanyCode"
            disabled={ !registrationType }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputSelect
            name="creditSituation"
            label={ t('credit status', { abbreviation: false }) }
            valueKey="name"
            idKey="id"
            options={ ENUM_SELECTS.enumCreditStatus }
            disabled={ !registrationType }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputNumber
            label={ t('days without billing', { abbreviation: false }) }
            name="daysWithoutBilling"
            disabled={ !registrationType }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 3 }>
          <InputCpfCnpj
            label={ t('cnpj') }
            name="cnpj"
            mode="cnpj"
            disabled={ !registrationType }
          />
        </Grid>
        <Grid item xs={ 12 } md={ 12 }>
          <Typography className={ classes.regimeLetterTitle } variant="h4">
            {t('letter of regime', { abbreviation: false })}
          </Typography>
          <RadioGroup
            name="regimeLetter"
            options={ options }
            clearable
            disabled={ !registrationType }
          />
        </Grid>
        <Grid item xs={ 4 } md={ 4 } >
          <I18n as={ Button }
            onClick={ onClickAdvancedSearchButton }
            color="warning"
            size="small"
            variant={ show ? 'outlined' : 'contained' }
            startIcon={ show ? <ChevronLeft /> : null }
            endIcon={ !show ? <ChevronRight /> : null }
          >
            advanced search
          </I18n>
        </Grid>
      </Grid>
      {show && (
        <Grid container spacing={ 1 } className={ classes.advancedSearch }>
          <Grid item xs={ 12 } md={ 3 }>
            <InputText
              label={ t('cd code', { abbreviation: false }) }
              name="cdCode"
              disabled={ !registrationType }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 3 }>
            <InputText
              label={ t('responsible service') }
              name="responsibleService"
              disabled={ !registrationType }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 3 }>
            <InputAutocomplete
              url={ users.regionalManager }
              paramName="description"
              valueKey="description"
              label={ t('regional manager') }
              name="regionalManager"
              disabled={ !registrationType }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 3 }>
          </Grid>
          <Grid item xs={ 12 } md={ 6 }>
            <InputText
              label={ t('company name') }
              name="companyName"
              disabled={ !registrationType }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 3 }>
            <InputDate
              label={ t('inclusion date') }
              name="registrationInclusionDate"
              disabled={ !registrationType }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 3 }>
            <InputDate
              label={ t('date of the conclusion') }
              name="registrationConclusionDate"
              disabled={ !registrationType }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 3 }>
            <InputSelect
              name="workflowTypeId"
              label={ t('workflow type') }
              options={ ENUM_SELECTS.enumWorkflowTypeId }
              valueKey="description"
              onValueChange={ onChangeWorkflowTypeId }
              disabled={ !registrationType }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 3 }>
            <InputSelect
              name="version"
              label={ t('version') }
              valueKey= "version"
              idKey="id"
              options={ versionFromApi }
              onValueChange={ onChangeVersion }
              disabled={ !registrationType }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 3 }>
            <InputAutocomplete
              url={ version ? workflows.getTasksUrl(version) : '' }
              valueKey="title"
              label= { t('workflow task') }
              name="workflowTaskId"
              disabled={ !type || !version }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 3 }>
            <InputSelect
              name="state"
              label="UF"
              valueKey="sigla"
              idKey="sigla"
              options={ stateOptions }
              disabled={ !registrationType }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 3 }>
            <InputText
              label={ t('city', { howMany: 1 }) }
              name="city"
              disabled={ !registrationType }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 3 }>
            <InputSelect
              label={ t('category', { howMany: 1 }) }
              name="category"
              valueKey= "name"
              options={ ENUM_SELECTS.category }
              disabled={ !registrationType }
            />
          </Grid>
          <Grid item xs={ 12 } md={ 3 }>
            <InputAutocomplete
              url={ clients.getGroups }
              paramName="nameClientGroup"
              valueKey="nameClientGroup"
              label={ t('customers group') }
              name="clientGroup"
              disabled={ !registrationType }
            />
          </Grid>
        </Grid>
      )}
    </Form>
  )
})

CustomerFormFilter.propTypes = { filters: PropTypes.object.isRequired }

export default CustomerFormFilter
