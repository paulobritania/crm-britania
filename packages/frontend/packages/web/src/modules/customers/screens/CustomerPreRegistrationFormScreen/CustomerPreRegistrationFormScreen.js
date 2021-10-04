import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback
} from 'react'
import { useDispatch } from 'react-redux'
import {
  useHistory,
  useLocation
} from 'react-router-dom'

import moment from 'moment/moment'

import isEmpty from 'lodash/isEmpty'

import Grid from '@material-ui/core/Grid'
import Tab from '@material-ui/core/Tab'

import { useDialog } from '@britania-crm/dialog'
import { useFormEffect } from '@britania-crm/forms'
import customerPreRegistrationSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/customer/customerPreRegistration.schema'
import I18n, { useT } from '@britania-crm/i18n'
import {
  customer as customerCrmRoutes,
  documents as documentsCrmRoutes
} from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { AppActions } from '@britania-crm/stores/app'
import { CustomerActions } from '@britania-crm/stores/customer'
import defaultFile from '@britania-crm/styles/assets/images/default_login_bg.png'
import {
  formatBackDateToIsoFormat,
  formatBackDateTimeToBackDateFormat,
  dateBackFormat
} from '@britania-crm/utils/date'
import { trimMask } from '@britania-crm/utils/formatters'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import { CircularLoader } from '@britania-crm/web-components/Loader'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'
import Tabs from '@britania-crm/web-components/Tabs'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import DocumentationCustomerModal from '../../modals/DocumentationCustomerModal'
import {
  getPayloadFiscalParametrizationCfop,
  getFormFiscalParametrizationCfop
} from '../../utils'
import useStyles from './styles'
import Customer from './tabs/Customer/Customer'
import Documents from './tabs/Documents/Documents'
import Fiscal from './tabs/Fiscal/Fiscal'
import RegistrationParameters from './tabs/RegistrationParameters/RegistrationParameters'

const CustomerPreRegistrationFormScreen = () => {
  const t = useT()
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const { routes, currentRoute } = useRoutes()
  const { state } = useLocation()
  const { createDialog } = useDialog()

  const formRef = useRef(null)

  const [saveLoader, setSaveLoader] = useState(false)
  const [concludeLoader, setConcludeLoader] = useState(false)
  const [statusCustomer, setStatusCustomer] = useState('')

  const customerId = useMemo(() => state?.params?.id, [state])

  const { data: customerFromApi, loading: getLoading } = useCrmApi(
    customerId
      ? [customerCrmRoutes.getOnePreRegister.replace(':id', customerId), state]
      : null,
    null,
    {
      onErrorRetry (error, key, config, revalidate, { retryCount }) {
        if (error?.response?.status === 500 && retryCount < 5) {
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

  const loading = useMemo(
    () => getLoading || saveLoader || concludeLoader,
    [concludeLoader, getLoading, saveLoader]
  )

  const mode = useMemo(
    () => {
      switch (currentRoute.path) {
        case routes.newCustomerPreRegistration?.path : return 'create'
        case routes.editCustomerPreRegistration?.path : return 'edit'
        default: return 'view'
      }
    }, [currentRoute.path, routes]
  )

  const disabled = useMemo(() => mode === 'view', [mode])

  const tabs = useMemo(
    () => [
      <Tab key={ 1 } label={ t('registration parameters') }/>,
      <Tab key={ 2 } label={ t('customer', { howMany: 1 }) }/>,
      <Tab key={ 3 } label={ t('documents') } />,
      <Tab key={ 4 } label={ t('fiscal parameterization') }/>
    ],
    [t]
  )

  const handleDocumentation = useCallback(
    () => createDialog({
      id: 'new-user-modal',
      Component: DocumentationCustomerModal,
      props: { imagePreview }
    }),
    [createDialog, imagePreview]
  )

  const tabsContent = useMemo(
    () => [
      <RegistrationParameters key={ 1 } formRef={ formRef } disabled={ disabled } handleDocumentation={ handleDocumentation } />,
      <Customer key={ 2 } formRef={ formRef } disabled={ disabled } status={ statusCustomer } isEdit={ mode === 'edit' } handleDocumentation={ handleDocumentation }/>,
      <Documents key={ 3 } formRef={ formRef } disabled={ disabled } handleDocumentation={ handleDocumentation } />,
      <Fiscal key={ 4 } formRef={ formRef } disabled={ disabled } handleDocumentation={ handleDocumentation } />
    ],
    [disabled, handleDocumentation, mode, statusCustomer]
  )

  const formatPayload = useCallback(
    (values) => ({
      ...values,
      id: customerFromApi?.id,
      cnpj: trimMask(values.cnpj || ''),
      parentCompanyCnpj: trimMask(values.parentCompanyCnpj || ''),
      commercialPhone: trimMask(values.commercialPhone || ''),
      billingPhone: trimMask(values.billingPhone || ''),
      cellphone: trimMask(values.cellphone || ''),
      shoppingPhone: trimMask(values.shoppingPhone || ''),
      stateRegistration: trimMask(values.stateRegistration || ''),
      number: values.number || '',
      fiscalParametrizationCfop: getPayloadFiscalParametrizationCfop(values),
      parentCompanyName: values.parentCompanyName?.companyName || '',
      additionalInformation: {
        ...(values.additionalInformation || {}),
        counter: {
          ...(values.additionalInformation?.counter || {}),
          counterPhone: trimMask(values?.additionalInformation?.counter?.counterPhone || '')
        },
        numbersOfEmployes: values.additionalInformation?.numbersOfEmployes ? Number(values.additionalInformation.numbersOfEmployes) : null,
        suggestedLimit: values.additionalInformation?.suggestedLimit ? Number(values.additionalInformation.suggestedLimit) : null,
        shareCapital: values.additionalInformation?.shareCapital ? Number(values.additionalInformation.shareCapital) : null
      },
      financial: {
        issueBankSlip: values.financial?.issueBankSlip !== undefined ? !!values.financial?.issueBankSlip : null,
        gerenatesDebitNotice: values.financial?.gerenatesDebitNotice !== undefined ? !!values.financial?.gerenatesDebitNotice : null,
        calculatesFine: values.financial?.calculatesFine !== undefined ? !!values.financial?.calculatesFine : null,
        receives_nfe: values.financial?.receives_nfe !== undefined ? !!values.financial?.receives_nfe : null,
        simpleClient: values.financial?.simpleClient !== undefined ? !!values.financial?.simpleClient : null,
        receivesSciInformation: values.financial?.receivesSciInformation !== undefined ? !!values.financial?.receivesSciInformation : null,
        standardIncome: values.financial?.standardIncome,
        carrier: values.financial?.carrier,
        bankInstruction: values.financial?.bankInstruction
      },
      cadastralCheck: {
        cadastralCheck: values.cadastralCheck?.cadastralCheck,
        newClient: values.cadastralCheck?.newClient,
        riskClass: values.cadastralCheck?.riskClass
      },
      parametrization: {
        clientGroupCode: values.parametrization?.clientGroupCode ? Number(values.parametrization?.clientGroupCode) : null,
        shortName: values.parametrization?.shortName,
        parentCompanyCode: null, // TODO: Necessário validar com a Dani o funcionamento
        parentCompany: values.parametrization?.parentCompany,
        historic: values.parametrization?.historic,
        intermediary: values.parametrization?.intermediary !== undefined ? !!values.parametrization?.intermediary : null
      },
      priceList: {
        establishment128CdEsCode: values?.priceList?.establishment128CdEsCode?.codePriceList,
        establishment22Code: values?.priceList?.establishment22Code?.codePriceList,
        establishment15Code: values?.priceList?.establishment15Code?.codePriceList,
        establishment31ManausCode: values?.priceList?.establishment31ManausCode?.codePriceList,
        establishment31AgScCode: values?.priceList?.establishment31AgScCode?.codePriceList,
        establishment31AgSpCode: values?.priceList?.establishment31AgSpCode?.codePriceList,
        establishment305CdPe: values?.priceList?.establishment305CdPe?.codePriceList
      },
      registrationInformation: {
        representativeCode: values.responsibleCode?.code,
        representativeName: values.responsibleName?.name
      },
      fiscalParametrization: {
        ...(values.fiscalParametrization || {}),
        expirationDate: (values.fiscalParametrization?.expirationDate && moment(values.fiscalParametrization?.expirationDate, dateBackFormat).isValid())
          ? formatBackDateToIsoFormat(values.fiscalParametrization.expirationDate, 0)
          : null
      },
      fiscalInformation: {
        ...values.fiscalInformation,
        taxRegime: values.fiscalInformation.taxRegime !== '0' ? values.fiscalInformation.taxRegime : null
      }
    }),
    [customerFromApi]
  )

  const handleSaveSubmit = useCallback(
    async () => {
      setSaveLoader(true)

      const values = formRef.current.getData()

      dispatch(CustomerActions.saveCustomerPreRegistry(
        formatPayload(values),
        customerFromApi,
        () => {
          setSaveLoader(false)
          history.push(routes.customers.path)
        },
        (error) => {
          setSaveLoader(false)
          formRef.current.setSubmitError(error)
        }
      ))
    },
    [customerFromApi, dispatch, formatPayload, history, routes.customers.path]
  )

  const handleFinishSubmit = useCallback(
    (values) => {
      setConcludeLoader(true)

      dispatch(CustomerActions.finishCustomerPreRegistry(
        formatPayload(values),
        customerFromApi,
        () => {
          setConcludeLoader(false)
          history.push(routes.customers.path)
        },
        (error) => {
          setConcludeLoader(false)
          formRef.current.setSubmitError(error)
        }
      ))
    },
    [customerFromApi, dispatch, formatPayload, history, routes.customers.path]
  )

  useFormEffect(() => {
    if (!isEmpty(customerFromApi)) {
      formRef.current.setData({
        ...customerFromApi,
        parentCompanyName: {
          companyName: customerFromApi?.parentCompanyName,
          cnpj: customerFromApi?.parentCompanyCnpj
        },
        fiscalParametrizationCfop: getFormFiscalParametrizationCfop(customerFromApi),
        fiscalParametrization: {
          ...customerFromApi.fiscalParametrization,
          expirationDate: customerFromApi.fiscalParametrization?.expirationDate ? formatBackDateTimeToBackDateFormat(customerFromApi.fiscalParametrization?.expirationDate) : ''
        },
        responsibleCode: {
          id: customerFromApi?.registrationInformation?.id,
          code: customerFromApi?.registrationInformation?.representativeCode,
          name: customerFromApi?.registrationInformation?.representativeName
        },
        responsibleName: {
          id: customerFromApi?.registrationInformation?.id,
          code: customerFromApi?.registrationInformation?.representativeCode,
          name: customerFromApi?.registrationInformation?.representativeName
        },
        priceList: {
          establishment15Code: { codePriceList: customerFromApi?.priceList?.establishment15Code },
          establishment22Code: { codePriceList: customerFromApi?.priceList?.establishment22Code },
          establishment31AgScCode: { codePriceList: customerFromApi?.priceList?.establishment31AgScCode },
          establishment31AgSpCode: { codePriceList: customerFromApi?.priceList?.establishment31AgSpCode },
          establishment31ManausCode: { codePriceList: customerFromApi?.priceList?.establishment31ManausCode },
          establishment128CdEsCode: { codePriceList: customerFromApi?.priceList?.establishment128CdEsCode },
          establishment305CdPe: { codePriceList: customerFromApi?.priceList?.establishment305CdPe },
          id: customerFromApi?.priceList?.id
        }
      })
      setStatusCustomer(customerFromApi?.status)
    }
  }, [customerFromApi])

  useEffect(() => {
    if (!customerId && mode !== 'create') history.goBack()
  }, [history, mode, customerId])

  return (
    <Form
      ref={ formRef }
      onSubmit={ handleFinishSubmit }
      schemaConstructor={ customerPreRegistrationSchema }
      defaultValues={ INITIAL_VALUES }
    >
      { loading && <CircularLoader /> }
      <Tabs tabs={ tabs } tabsContent={ tabsContent }>
        <Grid container spacing={ 1 } className={ classes.buttons }>
          <Grid item xs={ 12 } sm={ 4 } >
            {mode !== 'view' ? (
              <I18n
                as={ Button }
                className={ classes.resetBtn }
                disabled={ loading }
                color="secondary"
                variant="text"
                onClick={ () => formRef.current.reset() }
              >
                clean
              </I18n>
            ) : (
              <I18n
                as={ Button }
                className={ classes.resetBtn }
                disabled={ loading }
                color="secondary"
                variant="text"
                onClick={ () => {
                  formRef.current.reset()
                  history.push(routes.customers.path)
                } }
              >
                back
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
                  onClick={ () => history.push(routes.customers.path) }
                >
                  cancel
                </I18n>
                <I18n as={ Button }
                  color="secondary"
                  variant="contained"
                  className={ classes.btnMargin }
                  disabled={ loading }
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
              <I18n as={ Button }
                color="secondary"
                variant="contained"
                className={ classes.btnMargin }
                disabled={ loading }
                onClick={ () => history.push(routes.editCustomerPreRegistration.path, {
                  params: {
                    mode: 'edit',
                    id: customerId
                  }
                }) }
              >
                edit
              </I18n>
            )}
          </Grid>
        </Grid>
      </Tabs>
    </Form>
  )
}

export default CustomerPreRegistrationFormScreen
