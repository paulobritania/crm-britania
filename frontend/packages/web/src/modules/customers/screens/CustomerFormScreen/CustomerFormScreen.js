import React, {
  useCallback,
  useMemo,
  useEffect,
  useRef,
  useState
} from 'react'
import { useDispatch } from 'react-redux'
import {
  useHistory,
  useLocation
} from 'react-router-dom'

import trimMask from '@meta-awesome/functions/src/trimMask'
import { Scope } from '@unform/core'

import capitalize from 'lodash/capitalize'
import isEmpty from 'lodash/isEmpty'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { useDialog } from '@britania-crm/dialog'
import { useFormEffect } from '@britania-crm/forms'
import customerSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/customer/customer.schema'
import I18n, { useT } from '@britania-crm/i18n'
import {
  customer as customerCrmRoutes,
  documents as documentsCrmRoutes
} from '@britania-crm/services/apis/crmApi/resources/routes'
import { searchStates } from '@britania-crm/services/apis/ibgeApi'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { AppActions } from '@britania-crm/stores/app'
import { CustomerActions } from '@britania-crm/stores/customer'
import defaultFile from '@britania-crm/styles/assets/images/default_login_bg.png'
import colors from '@britania-crm/styles/colors'
import Button from '@britania-crm/web-components/Button'
import CheckboxStatus from '@britania-crm/web-components/CheckboxStatus'
import Form from '@britania-crm/web-components/Form'
import { CircularLoader } from '@britania-crm/web-components/Loader'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import DocumentationCustomerModal from '../../modals/DocumentationCustomerModal'
import Address from './Address'
import ContractPercentage from './ContractPercentage'
import MainData from './MainData'
import Ranking from './Ranking'
import useStyles from './styles'

const CustomerFormScreen = () => {
  const t = useT()
  const classes = useStyles()
  const { routes, currentRoutePermissions } = useRoutes()
  const dispatch = useCallback(useDispatch(), [])
  const history = useHistory()
  const { createDialog } = useDialog()
  const { state } = useLocation()
  const formRef = useRef(null)

  const [contractPercentage, setContractPercentage] = useState([])
  const [indicators, setIndicators] = useState([])
  const [currentRanking, setCurrentRanking] = useState('')
  const [oldRanking, setOldRanking] = useState('')
  const [nameCustomer, setNameCustomer] = useState('')
  const [stateOptions, setStateOptions] = useState([])
  const [loader, setLoader] = useState(false)

  const { data: customerFromApi, loading } = useCrmApi(
    state?.params?.id
      ? [`${ customerCrmRoutes.getOne }/${ state?.params?.id }`, state]
      : null,
    null,
    {
      onErrorRetry (error, key, config, revalidate, { retryCount }) {
        if (error.response.status === 500 && retryCount < 5) {
          createDialog({
            id: 'new-request-modal',
            Component: ConfirmModal,
            props: {
              onConfirm () {
                revalidate({ retryCount })
              },
              onNegative () {
                history.goBack()
              },
              text: t('search error customer')
            }
          })
        } else {
          dispatch(AppActions.addAlert({ type: 'error', message: t('maximum number of attempts reached') }))
          history.goBack()
        }
      },
      revalidateOnFocus: false
    }
  )

  const { data: documentFromApi } = useCrmApi([`${ documentsCrmRoutes.getOne }/PRE_CAD_CLIENTE_DOCUMENTACAO`])

  const imagePreview = useMemo(() => {
    if (!isEmpty(documentFromApi)) {
      return {
        ...documentFromApi.file,
        type: documentFromApi.file.contentType
      }
    }
    return defaultFile
  }
  , [documentFromApi])

  const mode = useMemo(() => state?.params?.mode, [state])
  const modeView = useMemo(() => mode === 'view', [mode])
  const idCustomer = useMemo(() => state?.params?.id, [state])

  const title = useMemo(() => {
    switch (mode) {
      case 'create':
        return t('new {this}', { gender: 'male', this: t('customer', { howMany: 1 }) })
      default:
        return nameCustomer
    }
  }, [mode, nameCustomer, t])

  const onSuccessCallBack = useCallback(
    () => {
      history.push(routes.customers.path)
      setLoader(false)
    },
    [history, routes.customers.path]
  )

  const statusCustomer = useMemo(
    () => {
      let status, color

      if (customerFromApi?.mainData?.status === 'ACTIVE') {
        status = t('active')
      } else if (customerFromApi?.mainData?.status === 'INACTIVE') {
        status = t('inactive')
        color = colors.error.main
      } else {
        status = t('registration in process of change')
        color = colors.warning.main
      }

      return (
        <CheckboxStatus
          detached
          readOnly
          value={ customerFromApi?.mainData.status !== 'INACTIVE' }
          style={ { color: colors.black2 } }
          activeStatus={ status }
          activeColor={ color }
          notFistLabel
        />
      )
    }, [customerFromApi, t])

  const handleSubmit = useCallback(
    (values) => {
      setLoader(true)
      const customer = {
        commercialPhone: trimMask(values.mainData.commercialPhone),
        cellPhone: trimMask(values.mainData.cellPhone),
        logisticsInformation: values.mainData.logisticsInformation,
        creditSituation: String(values.mainData.creditSituation),
        regimeLetter: String(values.mainData.regimeLetter),
        daysWithoutBilling: Number(values?.mainData?.daysWithoutBilling),
        deliveryAddress: {
          ...values.deliveryAddress,
          zipCode: values.deliveryAddress.zipCode.toString(),
          phone: values.deliveryAddress?.phone ? trimMask(values.deliveryAddress?.phone) : '',
          number: values.deliveryAddress?.number ? Number(values.deliveryAddress?.number) : 0
        },
        billingAddress: {
          ...values.billingAddress,
          zipCode: values.billingAddress.zipCode.toString(),
          phone: values.billingAddress?.phone ? trimMask(values.billingAddress?.phone) : '',
          number: values.billingAddress?.number ? Number(values.billingAddress?.number) : 0
        }
      }

      if (mode === 'edit') {
        dispatch(CustomerActions.updateCustomer(
          customer,
          customerFromApi.mainData.clientTotvsCode,
          onSuccessCallBack,
          () => setLoader(false)
        ))
      }
    },
    [customerFromApi, dispatch, mode, onSuccessCallBack]
  )

  const getFieldAddressDelivery = useCallback(
    (address) => {
      formRef.current.setData((data) => ({
        ...data,
        deliveryAddress: {
          ...data.deliveryAddress,
          publicPlace: address.street,
          district: address.neighborhood || '',
          city: address.city,
          state: address.state,
          address: address.street || ''
        }
      }))
    },
    []
  )

  const getFieldAddressBilling = useCallback(
    (address) => {
      formRef.current.setData((data) => ({
        ...data,
        billingAddress: {
          ...data.billingAddress,
          publicPlace: address.street,
          district: address.neighborhood || '',
          city: address.city,
          state: address.state,
          address: address.street || ''
        }
      }))
    },
    []
  )

  const formatterString = useCallback(
    (str) =>
      str ? capitalize(str.toLowerCase()) : ''
    ,
    []
  )

  const getStateOptions = useCallback(
    async () => {
      const states = await searchStates()
      setStateOptions(states)
    },
    []
  )

  const handleSetEdit = useCallback(
    () => {
      history.push(routes.editCustomer.path, {
        params: {
          mode: 'edit',
          id: state?.params?.id
        }
      })
    },
    [history, routes, state]
  )

  const handleDocumentation = useCallback(
    () => createDialog({
      id: 'new-user-modal',
      Component: DocumentationCustomerModal,
      props: { imagePreview }
    }),
    [createDialog, imagePreview]
  )

  useEffect(() => {
    getStateOptions()
  }, [getStateOptions])

  useFormEffect(() => {
    if (!isEmpty(customerFromApi)) {
      formRef.current.setData({
        ...customerFromApi,
        deliveryAddress: {
          ...customerFromApi.deliveryAddress,
          number: customerFromApi.deliveryAddress.number > 0 ? customerFromApi.deliveryAddress.number : ''
        },
        billingAddress: {
          ...customerFromApi.billingAddress,
          number: customerFromApi.billingAddress.number > 0 ? customerFromApi.billingAddress.number : ''
        }
      })
      setContractPercentage(customerFromApi.contractPercentage)
      setIndicators(customerFromApi.rankingDetails.indicators)
      setCurrentRanking(customerFromApi.rankingDetails.currentRanking?.alias)
      setOldRanking(customerFromApi.rankingDetails.oldRanking?.alias)
      setNameCustomer(customerFromApi.mainData.socialReason || '')
    }
  }, [customerFromApi, formatterString])

  useEffect(() => {
    if (!state?.params?.id && mode !== 'create') history.goBack()
  }, [history, mode, state])

  return (
    <Form
      ref={ formRef }
      onSubmit={ handleSubmit }
      schemaConstructor={ customerSchema }
      defaultValues={ INITIAL_VALUES }
    >
      { (loading || loader) && <CircularLoader /> }

      <Grid container spacing={ 1 } className={ classes.container } >
        <Grid item className={ classes.header } sm={ 12 }>
          <Typography className={ classes.title } variant="h4" gutterBottom >
            {title}
          </Typography>
        </Grid>
        <Grid item xs={ 12 }>

          <Scope path="mainData">
            <MainData
              isDisabled={ modeView || loading || loader }
              handleDocumentation={ handleDocumentation }
              hasPermission={ currentRoutePermissions.INCLUIR || currentRoutePermissions.EDITAR }
              workflowTaskInProgress={ customerFromApi?.workflowTaskInProgress }
              id={ idCustomer }
              status={ statusCustomer }
            />
          </Scope>

          <ContractPercentage
            data={ contractPercentage }
            handleDocumentation={ handleDocumentation }
          />

          <Scope path="deliveryAddress">
            <Address
              title={ t('address of {this}', { gender: 'male', this: t('delivery', { howMany: 1 }) }) }
              phoneTitle={ t('phone shopping') }
              emailTitle={ t('email invoice sending') }
              isDisabled={ modeView || loader }
              getNewAddress={ getFieldAddressDelivery }
              stateOptions={ stateOptions }
              handleDocumentation={ handleDocumentation }
            />
          </Scope>

          <Scope path="billingAddress">
            <Address
              title={ t('address of {this}', { gender: 'male', this: t('charge', { howMany: 1 }) }) }
              phoneTitle={ t('billing phone') }
              emailTitle={ t('billing email') }
              isDisabled={ modeView || loading || loader }
              getNewAddress={ getFieldAddressBilling }
              stateOptions={ stateOptions }
              handleDocumentation={ handleDocumentation }
            />
          </Scope>

          <Ranking
            matrixCode={ customerFromApi?.mainData?.clientTotvsCode }
            data={ indicators }
            currentRanking={ currentRanking }
            oldRanking={ oldRanking }
            isDisabled={ modeView || loading || loader }
            viewMode={ modeView && !loading && !loader }
            handleDocumentation={ handleDocumentation }
            hasPermission={ currentRoutePermissions.INCLUIR || currentRoutePermissions.EDITAR }
            workflowTaskInProgress={ customerFromApi?.rankingDetails?.workflowTaskInProgress }
            workflowInProgress={ customerFromApi?.rankingDetails?.workflowInProgress }
            id={ idCustomer }
          />

        </Grid>
        <Grid item xs={ 12 } className={ classes.buttons }>
          <Grid >
            {!modeView && (
              <I18n
                as={ Button }
                className={ classes.resetBtn }
                disabled={ loader }
                variant="text"
                color="secondary"
                onClick={ () => formRef.current.reset() }
              >
              clean
              </I18n>
            )}
          </Grid>
          <Grid >
            <I18n as={ Button }
              variant="outlined"
              color="secondary"
              disabled= { loader }
              onClick={ () => history.push(routes.customers.path) }
            >
              { modeView ? 'turn back' : 'cancel' }
            </I18n>
            <I18n as={ Button }
              color="secondary"
              variant="contained"
              className={ classes.btnSave }
              isLoading={ loader }
              onClick={ () => modeView ? handleSetEdit() : formRef.current.submit() }
            >
              { modeView ? 'datagrid body edit all' : 'request change' }
            </I18n>
          </Grid>
        </Grid>
      </Grid>
    </Form>
  )
}

export default CustomerFormScreen
