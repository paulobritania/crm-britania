import React, {
  useRef,
  useCallback,
  useMemo,
  useState
} from 'react'
import { useDispatch } from 'react-redux'
import {
  useHistory,
  useLocation
} from 'react-router-dom'

import { chain } from 'lodash'
import forEach from 'lodash/forEach'
import isEmpty from 'lodash/isEmpty'

import Grid from '@material-ui/core/Grid'
import Tab from '@material-ui/core/Tab'

import { useDialog } from '@britania-crm/dialog'
import { useFormEffect } from '@britania-crm/forms'
import vpcSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/vpc/vpc.schema'
import I18n, { useT } from '@britania-crm/i18n'
import { vpc as vpcRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { VpcActions } from '@britania-crm/stores/vpc'
import {
  formatBackDateTimeToBackDateFormat,
  formatBackDateToIsoFormat
} from '@britania-crm/utils/date'
import { trimMask } from '@britania-crm/utils/formatters'
import Button from '@britania-crm/web-components/Button'
import Form from '@britania-crm/web-components/Form'
import CircularLoader from '@britania-crm/web-components/Loader/CircularLoader'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'
import Tabs from '@britania-crm/web-components/Tabs'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import useStyles from './styles'
import VpcAttachments from './tabs/vpcAttachments/VpcAttachments'
import VpcData from './tabs/vpcData/VpcData'
import VpcNd from './tabs/vpcNd/VpcNd'
import VpcOrders from './tabs/vpcOrders/VpcOrders'
import VpcProducts from './tabs/vpcProducts/VpcProducts'

const Vpc = () => {
  const t = useT()
  const classes = useStyles()
  const {
    routes, currentRoute, currentRoutePermissions
  } = useRoutes()
  const history = useHistory()
  const { state } = useLocation()
  const dispatch = useDispatch()
  const { createDialog } = useDialog()
  const idVpc = useMemo(() => state?.params?.id, [state])

  const [deploymentDate, setDeploymentDate] = useState('')
  const [loader, setLoader] = useState(false)

  const formRef = useRef(null)

  const { data: vpcFromApi, loading: loadingVpcFromApi } = useCrmApi(state?.params?.id ? [vpcRoutes.getOne.replace(':vpcId', idVpc), state] : null, null, { revalidateOnFocus: false })

  const mode = useMemo(
    () => {
      switch (currentRoute.path) {
        case routes.viewVpc?.path: return 'view'
        case routes.newVpc?.path: return 'create'
        case routes.editVpc?.path: return 'edit'
        default: return 'view'
      }
    },
    [currentRoute, routes]
  )

  const disabled = useMemo(() => mode === 'view', [mode])

  const loading = useMemo(
    () => loadingVpcFromApi || loader,
    [loadingVpcFromApi, loader]
  )

  const tabs = useMemo(
    () => [
      <Tab key={ 1 } label={ t('vpc data') }/>,
      <Tab key={ 2 } label={ t('order', { howMany: 2 }) }/>,
      <Tab key={ 3 } label={ t('product', { howMany: 2 }) }/>,
      <Tab key={ 4 } label={ t('nd') } />,
      <Tab key={ 5 } label={ t('attachments', { howMany: 1 }) } />
    ],
    [t]
  )

  const tabsContent = useMemo(
    () => [
      <VpcData
        key={ 1 }
        disabled={ disabled || loading }
        formRef={ formRef }
        permissions={ currentRoutePermissions.INCLUIR || currentRoutePermissions.EDITAR }
        workflowTaskInProgress={ !isEmpty(vpcFromApi) && !isEmpty(vpcFromApi.workflowTaskInProgress) ? vpcFromApi.workflowTaskInProgress : null }
        id={ idVpc }
        deploymentDate={ deploymentDate }
      />,
      <VpcOrders key={ 2 } disabled={ disabled } formRef={ formRef } />,
      <VpcProducts key={ 3 } disabled={ disabled } formRef={ formRef } />,
      <VpcNd key={ 4 } disabled={ disabled } formRef={ formRef } />,
      <VpcAttachments key={ 5 } disabled={ disabled } formRef={ formRef } />
    ],
    [currentRoutePermissions.EDITAR, currentRoutePermissions.INCLUIR, deploymentDate, disabled, idVpc, loading, vpcFromApi]
  )

  const handleSetEdit = useCallback(
    () =>
      history.replace(routes.editVpc.path, { params: { id: idVpc } }),
    [history, idVpc, routes]
  )

  const formatterLinesFamilies = useCallback(
    (values) => {
      const linesFamilies = []

      forEach(values?.linesFamilies,
        ({
          family, lineCode, lineDescription
        }) =>
          forEach(family, (item) =>
            linesFamilies.push({
              lineCode, lineDescription, ...item
            }))
      )

      return linesFamilies
    }, [])

  const callBackOnSuccess = useCallback(
    () => {
      history.push(routes.vpc.path)
      setLoader(false)
    },
    [history, routes]
  )

  const callBackOnError = useCallback(
    (error) => {
      setLoader(false)
      formRef.current.setSubmitError(error)
    },
    []
  )

  const payload = useCallback((values) => ({
    ...values,
    bankCnpj: trimMask(values.bankCnpj),
    value: Number(values?.value),
    parentCompanyCode: values.parentCompany?.parentCompanyCode,
    parentCompanyName: values.parentCompany?.parentCompanyName,
    bank: values.label,
    linesFamilies: formatterLinesFamilies(values),
    startDate: formatBackDateToIsoFormat(values.period.from, 0),
    endDate: formatBackDateToIsoFormat(values.period.to, 0),
    approverCode: values.approverCode?.code ? values.approverCode?.code : '',
    approverDescription: values.approverCode?.description ? values.approverCode?.description : '',
    directorshipCode: values.directorshipCode ? values.directorshipCode : null
  }), [formatterLinesFamilies])

  const handleSubmit = useCallback(
    (values) => {
      if (mode === 'create') {
        dispatch(VpcActions.saveVpc(payload(values), true, callBackOnSuccess, callBackOnError))
      } else if (mode === 'edit') {
        dispatch(VpcActions.editVpc(idVpc, payload(values), true, callBackOnSuccess, callBackOnError))
      }
    },
    [callBackOnError, callBackOnSuccess, dispatch, idVpc, mode, payload]
  )

  const handleSave = useCallback(
    () => {
      setLoader(true)
      const values = formRef.current.getData()

      if (mode === 'create') {
        dispatch(VpcActions.saveVpc(payload(values), false, callBackOnSuccess, callBackOnError))
      } else if (mode === 'edit') {
        dispatch(VpcActions.editVpc(idVpc, payload(values), false, callBackOnSuccess, callBackOnError))
      }
    },
    [callBackOnError, callBackOnSuccess, dispatch, idVpc, mode, payload]
  )

  const handleConfirmCancel = useCallback(
    () => {
      createDialog({
        id: 'confirm-cancel',
        Component: ConfirmModal,
        props: {
          onConfirm: () => history.push(routes.vpc.path),
          text: mode === 'create'
            ? t('Do you want to cancel the registration?')
            : t('Do you want to cancel editing?')
        }
      })
    },
    [createDialog, history, mode, routes, t]
  )

  useFormEffect(
    () => {
      if (!isEmpty(vpcFromApi)) {
        formRef.current.setData({
          ...vpcFromApi,
          status: vpcFromApi?.active,
          approverCode: { code: vpcFromApi?.approverCode, description: vpcFromApi?.approverDescription },
          parentCompany: {
            parentCompanyCode: vpcFromApi?.parentCompanyCode,
            parentCompanyName: vpcFromApi?.parentCompanyName,
            cnpj: vpcFromApi.cnpj,
            companyName: vpcFromApi?.companyName
          },
          responsible: vpcFromApi?.userCreated?.username,
          parentCompanyCode: {
            parentCompanyCode: vpcFromApi?.parentCompanyCode,
            parentCompany: vpcFromApi?.parentCompanyName,
            cnpj: vpcFromApi.cnpj,
            companyName: vpcFromApi?.companyName
          },
          period: {
            from: formatBackDateTimeToBackDateFormat(vpcFromApi?.startDate),
            to: formatBackDateTimeToBackDateFormat(vpcFromApi?.endDate)
          },
          bank: { label: vpcFromApi.bank },
          linesFamilies: chain(vpcFromApi?.linesFamilies)
            .groupBy('lineCode')
            .map((value, key) => ({
              lineCode: Number(key), lineDescription: value[0].lineDescription, family: value
            }))
            .value()
        })
        setDeploymentDate(vpcFromApi?.deploymentDate ? formatBackDateTimeToBackDateFormat(vpcFromApi?.deploymentDate) : '')
      }
    },
    [vpcFromApi]
  )

  return (
    <Form
      ref={ formRef }
      schemaConstructor={ vpcSchema }
      defaultValues={ INITIAL_VALUES }
      onSubmit={ handleSubmit }
    >
      <Tabs
        tabs={ tabs }
        tabsContent={ tabsContent }
      >
        { loading && <CircularLoader/> }
        <Grid item xs={ 12 } className={ classes.buttons }>
          <Grid>
            {mode !== 'view' && (
              <I18n
                as={ Button }
                className={ classes.resetBtn }
                variant="text"
                color="secondary"
                type="reset"
                onClick={ () => formRef.current.reset() }
              >
                clean
              </I18n>
            )}
          </Grid>
          <Grid>
            <I18n as={ Button }
              color="secondary"
              variant="outlined"
              onClick={ handleConfirmCancel }
              className={ classes.btnCancel }
            >
            cancel
            </I18n>
            {mode !== 'view' ? (
              <>
                <I18n
                  as={ Button }
                  onClick={ handleSave }
                  color="secondary"
                  className={ classes.btnSave }
                >
                save
                </I18n>
                <I18n
                  as={ Button }
                  onClick={ () => formRef.current.submit() }
                  color="secondary"
                  className={ classes.btnSave }
                >
                  {mode === 'create' ? 'finish registration' : 'request update'}
                </I18n>
              </>
            ) : (
              <I18n
                as={ Button }
                onClick={ handleSetEdit }
                color="secondary"
                className={ classes.btnSave }
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

export default Vpc
