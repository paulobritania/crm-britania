import React, {
  useCallback,
  useMemo,
  useRef,
  useState
} from 'react'
import { useDispatch } from 'react-redux'
import {
  useHistory,
  useLocation
} from 'react-router-dom'

import isEmpty from 'lodash/isEmpty'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { useFormEffect } from '@britania-crm/forms'
import companiesSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/companies/companies.schema'
import I18n, { useT } from '@britania-crm/i18n'
import { useBanksList } from '@britania-crm/services/apis/bancoCentralApi'
import { companies as companiesRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { CompanyActions } from '@britania-crm/stores/companies'
import { trimMask } from '@britania-crm/utils/formatters'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import InputCpfCnpj from '@britania-crm/web-components/InputCpfCnpj'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'
import { CircularLoader } from '@britania-crm/web-components/Loader'
import TextArea from '@britania-crm/web-components/TextArea'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import useStyles from './styles'

const CompanyFormScreen = () => {
  const t = useT()
  const classes = useStyles()
  const { routes, currentRoute } = useRoutes()
  const dispatch = useCallback(useDispatch(), [])
  const history = useHistory()

  const { state } = useLocation()
  const formRef = useRef(null)

  const [loader, setLoader] = useState(false)
  const [title, setTitle] = useState()

  const mode = useMemo(
    () => {
      switch (currentRoute.path) {
        case routes.viewCompany?.path: return 'view'
        case routes.newCompany?.path: return 'create'
        case routes.editCompany?.path: return 'edit'
        default: return 'view'
      }
    },
    [currentRoute, routes]
  )
  const isEdit = useMemo(() => mode === 'edit', [mode])
  const companyId = useMemo(() => state?.params?.id, [state])
  const disabled = useMemo(() => mode === 'view', [mode])

  const pageTitle = useMemo(() => {
    switch (mode) {
      case 'edit':
        return t('editing {this}', { this: t('company', { howMany: 1 }) })
      case 'view':
        return t('view of {this}', { this: t('company', { howMany: 1 }) })
      default:
        return t('new {this}', { gender: 'female', this: t('company', { howMany: 1 }) })
    }
  }, [mode, t])

  const { data: companyFromApi, loading } = useCrmApi(companyId ? [companiesRoutes.getOne.replace(':id', companyId), companyId] : null)

  const onSuccessCallBack = useCallback(
    () => {
      history.push(routes.companies.path)
      setLoader(false)
    }
    ,
    [history, routes.companies.path]
  )

  const handleSubmit = useCallback(
    (values) => {
      const payload = {
        ...values,
        cnpj: values.cnpj ? trimMask(values.cnpj) : null
      }
      if (mode === 'edit') {
        dispatch(CompanyActions.updateCompany(
          payload,
          companyId,
          onSuccessCallBack,
          () => setLoader(false)
        ))
      } else {
        dispatch(CompanyActions.saveCompany(
          payload,
          onSuccessCallBack,
          () => setLoader(false)
        ))
      }
    },
    [companyId, dispatch, mode, onSuccessCallBack]
  )

  useFormEffect(() => {
    if (!isEmpty(companyFromApi)) {
      formRef.current.setData({ ...companyFromApi })
    }
  }, [companyFromApi])

  const {
    data: banksList,
    loading: banksListLoading
  } = useBanksList()

  return (
    <Form
      ref={ formRef }
      onSubmit={ handleSubmit }
      schemaConstructor={ companiesSchema }
      defaultValues={ INITIAL_VALUES }
    >
      {(loader || loading) && <CircularLoader/>}
      <Grid container spacing={ 2 } className={ classes.container } >
        <Grid item className={ classes.header } sm={ 12 }>
          <Typography className={ classes.title } variant="h4" gutterBottom >
            {pageTitle}
          </Typography>
        </Grid>

        <Grid item sm={ 12 } md={ 8 }>
          <InputText
            name="name"
            label={ t('company') }
            onValueChange={ setTitle }
            readOnly={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputCpfCnpj
            name="cnpj"
            mode="cnpj"
            label={ t('cnpj') }
            onValueChange={ setTitle }
            readOnly={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputSelect
            name="bankCode"
            label={ t('bank') }
            options={ banksList }
            valueKey="label"
            idKey="CodigoSicap"
            loading={ banksListLoading }
            readOnly={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 2 }>
          <InputText
            name="agency"
            label={ t('agency', { howMany: 1 }) }
            onValueChange={ setTitle }
            readOnly={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 2 }>
          <InputText
            name="account"
            label={ t('account', { howMany: 1 }) }
            onValueChange={ setTitle }
            readOnly={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputText
            name="identifier"
            label={ t('identifier') }
            onValueChange={ setTitle }
            readOnly={ disabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 12 }>
          <TextArea
            name="message"
            label={ t('message label') }
            onValueChange={ setTitle }
            readOnly={ disabled }
            rows={ 3 }
            inputProps={ { maxLength: 500 } }
          />

        </Grid>
        <Grid item xs={ 12 } className={ classes.buttons }>
          <Grid>
          </Grid>
          {mode === 'view' ? (
            <Grid>
              <I18n
                as={ Button }
                variant="outlined"
                color="secondary"
                readOnly={ loader }
                onClick={ () => history.push(routes.companies.path) }
              >
              back
              </I18n>

            </Grid>
          ) : (
            <Grid>
              <I18n
                as={ Button }
                variant="outlined"
                color="secondary"
                readOnly={ loader }
                onClick={ () => history.push(routes.companies.path) }
              >
              cancel
              </I18n>
              <I18n as={ Button }
                color="secondary"
                variant="contained"
                readOnly={ !title }
                className={ classes.btnSave }
                isLoading={ loader }
                onClick={ () => formRef.current.submit() }
              >
                {isEdit ? 'request atualization' : 'finish registration'}
              </I18n>
            </Grid>
          )}

        </Grid>
      </Grid>
    </Form>
  )
}

export default CompanyFormScreen
