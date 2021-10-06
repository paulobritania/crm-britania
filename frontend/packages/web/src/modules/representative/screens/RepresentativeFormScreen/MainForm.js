import React, {
  useCallback,
  useMemo,
  useRef,
  useState,
  useEffect
} from 'react'
import { useDispatch } from 'react-redux'
import {
  useHistory,
  useLocation
} from 'react-router-dom'

import isEmpty from 'lodash/isEmpty'

import Grid from '@material-ui/core/Grid'
import Tab from '@material-ui/core/Tab'

import { useFormEffect } from '@britania-crm/forms'
import representativeSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/representative/representative.schema'
import I18n, { useT } from '@britania-crm/i18n'
import { representative as representativeCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import { searchStates } from '@britania-crm/services/apis/ibgeApi'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { RepresentativeActions } from '@britania-crm/stores/representative'
import {
  formatBackDateTimeToBackDateFormat,
  formatFriendlyDateToBackFormat
} from '@britania-crm/utils/date'
import { trimMask } from '@britania-crm/utils/formatters'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import { CircularLoader } from '@britania-crm/web-components/Loader'
import Tabs from '@britania-crm/web-components/Tabs'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import Customer from './Customer'
import Representative from './Representative'
import useStyles from './styles'

const MainForm = () => {
  const t = useT()
  const classes = useStyles()
  const { routes } = useRoutes()
  const history = useHistory()
  const dispatch = useCallback(useDispatch(), [])

  const { state } = useLocation()
  const formRef = useRef(null)

  const [saveLoader, setSaveLoader] = useState(false)
  const [concludeLoader, setConcludeLoader] = useState(false)
  const [currentState, setCurrentState] = useState('')
  const [stateOptions, setStateOptions] = useState([])

  const mode = useMemo(() => state?.params?.mode, [state])
  const modeView = useMemo(() => mode === 'view', [mode])
  const id = useMemo(() => state?.params?.id, [state.params.id])

  const { data: representativeFromApi, loading: getLoading } = useCrmApi(id ? [representativeCrmRoutes.getOne.replace(':id', id), id] : null, null, { revalidateOnFocus: false })

  const loading = useMemo(
    () => getLoading || saveLoader || concludeLoader,
    [concludeLoader, getLoading, saveLoader]
  )

  const tabsOptions = useMemo(() => [
    <Tab key={ 1 } label={ t('representative', { howMany: 1 }) }/>,
    <Tab key={ 2 } label={ t('registration Parameterization') }/>
  ], [t])

  const getFieldAddress = useCallback(
    (address) => {
      formRef.current.setData({ address: { ...address, district: address.neighborhood } })
    },
    []
  )

  const tabsContent = useMemo(
    () => [
      <Representative
        key={ 1 }
        getFieldAddress={ getFieldAddress }
        setCurrentState={ setCurrentState }
        currentState={ currentState }
        disabled={ modeView }
        stateOptions={ stateOptions }
        formRef={ formRef }
      />,
      <Customer
        key={ 2 }
        disabled={ modeView }
        formRef={ formRef }
      />
    ],
    [currentState, getFieldAddress, modeView, stateOptions]
  )

  const getStateOptions = useCallback(
    async () => {
      const states = await searchStates()
      setStateOptions(states)
    },
    []
  )

  const onSuccessCallBack = useCallback(
    () => {
      history.push(routes.representatives.path)
    },
    [history, routes.representatives.path]
  )

  const formatPayload = useCallback(
    (values) => ({
      ...values,
      billingPhone: trimMask(values.billingPhone),
      cellphone: trimMask(values.cellphone),
      commercialPhone: trimMask(values.commercialPhone),
      cnpj: trimMask(values.cnpj),
      stateRegistration: trimMask(values.stateRegistration),
      bankData: {
        ...values.bankData,
        code: values.bankData.code?.code,
        name: values.bankData.code?.description
      },
      financial: {
        ...values.financial,
        clientGroupCode: Number(values?.financial?.clientGroup?.codeClientGroup),
        clientGroupDescription: values?.financial?.clientGroup?.nameClientGroup,
        issueBankSlip: !!values.financial.issueBankSlip,
        generatesDebitNotice: !!values.financial.generatesDebitNotice,
        calculatesFine: !!values.financial.calculatesFine,
        receivesSciInformation: !!values.financial.receivesSciInformation,
        simpleClient: !!values.financial.simpleClient,
        icmsTaxpayer: !!values.financial.icmsTaxpayer,
        buysPhilco: !!values.financial.buysPhilco,
        fullNonCumulative: !!values.financial.fullNonCumulative,
        receivesNfe: !!values.financial.receivesNfe,
        expirationDate: values.financial?.expirationDate ? formatFriendlyDateToBackFormat(values.financial?.expirationDate) : null
      },
      maintenance: {
        ...values.maintenance,
        representativeGroupCode: values.maintenance.representativeGroup?.code || null,
        representativeGroupName: values.maintenance.representativeGroup?.name || null,
        generationAdCarrier: Number(values.maintenance?.generationAdCarrier),
        commissionPercentage: Number(values.maintenance.commissionPercentage),
        commissionEmissionPercentage: Number(values.maintenance.commissionEmissionPercentage),
        minimumCommissionPercentage: Number(values.maintenance.minimumCommissionPercentage),
        maximumCommissionPercentage: Number(values.maintenance.maximumCommissionPercentage),
        manualCommission: Number(values.maintenance.manualCommission),
        representativeType: Number(values.maintenance.representativeType),
        intermediator: !!values.maintenance.intermediator
      },
      id
    }),
    [id]
  )

  const handleSaveSubmit = useCallback(
    async () => {
      setSaveLoader(true)

      formRef.current.setErrors({})
      await formRef.current.setFieldTouched('cnpj')
      const error = await formRef.current.validateField('cnpj')

      if (!error) {
        const values = formRef.current.getData()

        if (!error) {
          dispatch(RepresentativeActions.saveRepresentative(
            formatPayload(values),
            onSuccessCallBack,
            () => setSaveLoader(false)
          ))
        }
      } else {
        setSaveLoader(false)
      }
    },
    [dispatch, formatPayload, onSuccessCallBack]
  )

  const handleSubmit = useCallback(
    (values) => {
      setConcludeLoader(true)
      dispatch(RepresentativeActions.concludeRepresentative(
        formatPayload(values),
        onSuccessCallBack,
        () => setConcludeLoader(false)
      ))
    },
    [dispatch, onSuccessCallBack, formatPayload]
  )

  useFormEffect(() => {
    if (!isEmpty(representativeFromApi)) {
      formRef.current.setData({
        ...representativeFromApi,
        financial: {
          ...representativeFromApi.financial,
          issueBankSlip: representativeFromApi.financial.issueBankSlip,
          generatesDebitNotice: representativeFromApi.financial.generatesDebitNotice,
          calculatesFine: representativeFromApi.financial.calculatesFine,
          receivesSciInformation: representativeFromApi.financial.receivesSciInformation,
          simpleClient: representativeFromApi.financial.simpleClient,
          icmsTaxpayer: representativeFromApi.financial.icmsTaxpayer,
          buysPhilco: representativeFromApi.financial.buysPhilco,
          fullNonCumulative: representativeFromApi.financial.fullNonCumulative,
          receivesNfe: representativeFromApi.financial.receivesNfe,
          expirationDate: representativeFromApi?.financial?.expirationDate ? formatBackDateTimeToBackDateFormat(representativeFromApi.financial.expirationDate) : '',
          clientGroup: { codeClientGroup: representativeFromApi.financial?.clientGroupCode, nameClientGroup: representativeFromApi.financial?.clientGroupDescription }
        },
        maintenance: {
          ...representativeFromApi.maintenance,
          representativeGroup:
          representativeFromApi.maintenance?.representativeGroupCode ||
          representativeFromApi.maintenance?.representativeGroupName ? {
              code: representativeFromApi.maintenance?.representativeGroupCode,
              name: representativeFromApi.maintenance?.representativeGroupName
            } : null,
          intermediator: representativeFromApi.maintenance.intermediator,
          generationAdCarrier: representativeFromApi.maintenance.generationAdCarrier
        },
        bankData: {
          ...representativeFromApi.bankData,
          code: {
            code: representativeFromApi.bankData?.code || '',
            description: representativeFromApi.bankData?.name || '',
            label: `${ representativeFromApi.bankData?.code } - ${ representativeFromApi.bankData?.name }` || ''
          }
        }
      })
    }
  }, [representativeFromApi])

  useEffect(
    () => {
      if (!state?.params?.id && mode !== 'create') {
        history.replace(routes.representatives.path)
      }
    },
    [history, mode, routes, state]
  )

  useEffect(() => {
    getStateOptions()
  }, [getStateOptions])

  return (
    <Form
      ref={ formRef }
      onSubmit={ handleSubmit }
      schemaConstructor={ representativeSchema }
      defaultValues={ INITIAL_VALUES }
    >
      { loading && <CircularLoader /> }

      <Tabs
        tabs={ tabsOptions }
        tabsContent={ tabsContent }
      >
        <Grid container spacing={ 1 } className={ classes.buttons }>
          <Grid item xs={ 12 } sm={ 4 }>
            {!modeView && (
              <I18n
                as={ Button }
                className={ classes.resetBtn }
                disabled={ loading }
                variant="text"
                color="secondary"
                onClick={ () => formRef.current.reset() }
              >
              clean
              </I18n>
            )}
          </Grid>
          <Grid item xs={ 12 } sm={ 8 } style={ { display: 'flex', justifyContent: 'flex-end' } }>
            {mode !== 'view' ? (
              <>
                <I18n
                  as={ Button }
                  variant="outlined"
                  color="secondary"
                  disabled= { loading }
                  onClick={ () => history.push(routes.representatives.path) }
                >
                  cancel
                </I18n>
                <I18n as={ Button }
                  color="secondary"
                  variant="contained"
                  className={ classes.btnMargin }
                  disable={ loading }
                  isLoading={ saveLoader }
                  onClick={ handleSaveSubmit }
                >
                  save
                </I18n>
                <I18n as={ Button }
                  color="secondary"
                  variant="contained"
                  className={ classes.btnMargin }
                  disabled={ loading }
                  isLoading={ concludeLoader }
                  onClick={ () => formRef.current.submit() }
                >
                  finish registration
                </I18n>
              </>
            ) : (
              <>
                <I18n
                  as={ Button }
                  variant="outlined"
                  color="secondary"
                  disabled= { loading }
                  onClick={ () => history.push(routes.representatives.path) }
                >
                  turn back
                </I18n>
                <I18n as={ Button }
                  color="secondary"
                  variant="contained"
                  className={ classes.btnMargin }
                  disabled={ loading }
                  onClick={ () => history.push(routes.editRepresentative.path, {
                    params: {
                      mode: 'edit',
                      id: state?.params?.id
                    }
                  }) }
                >
                edit
                </I18n>
              </>
            )}
          </Grid>
        </Grid>
      </Tabs>
    </Form>
  )
}

export default MainForm
