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

import moment from 'moment'

import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Add from '@material-ui/icons/Add'
import PrintIcon from '@material-ui/icons/Print'

import {
  useFormEffect,
  Scope
} from '@britania-crm/forms'
import fanSchema, { INITIAL_VALUES } from '@britania-crm/forms/schemas/fan/fan.schema'
import I18n, { useT } from '@britania-crm/i18n'
import {
  fan as fanCrmRoutes,
  linesMaster as lineMasterCrmRoutes
} from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { FanActions } from '@britania-crm/stores/fan'
import { formatBackDateTimeToBackDateFormat } from '@britania-crm/utils/date'
import Button from '@britania-crm/web-components/Button'
import CustomAccordion from '@britania-crm/web-components/CustomAccordion'
import Form from '@britania-crm/web-components/Form'
import IconButton from '@britania-crm/web-components/IconButton'
import InfoIcon from '@britania-crm/web-components/Icons/infoIcon'
import CircularLoader from '@britania-crm/web-components/Loader/CircularLoader'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import Attachments from '../../containers/Attachments'
import BudgetAchievement from '../../containers/BudgetAchievement'
import MainData from '../../containers/MainData'
import OtherNegotiatedFunds from '../../containers/OtherNegotiatedFunds'
import PercentageDescription from '../../containers/Percentages/Percentages'
import useStyles from './styles'

const BuyerListScreen = () => {
  const t = useT()
  const classes = useStyles()
  const { routes, currentRoute } = useRoutes()
  const dispatch = useCallback(useDispatch(), [])
  const history = useHistory()

  const { state } = useLocation()
  const formRef = useRef(null)

  const [id, setId] = useState('')
  const [isAdditive, setIsAdditive] = useState(false)
  const [loader, setLoader] = useState(false)
  const [lastFan, setLastFan] = useState([])
  const [workflowFanId, setWorkflowFanId] = useState(null)
  const [haveAWorkflow, setHaveAWorkflow] = useState(null)

  const { data: linesMasterFromApi, loading: loadingLinesMaster } = useCrmApi(lineMasterCrmRoutes.getAll)

  const { data: fanFromApi, loading } = useCrmApi(state?.params?.id ? [fanCrmRoutes.getOne.replace(':fanId', state?.params?.id), state] : null)

  const mode = useMemo(
    () => {
      switch (currentRoute.path) {
        case routes.viewFan?.path: return 'view'
        case routes.newFan?.path: return 'create'
        case routes.editFan?.path: return 'edit'
        default: return 'view'
      }
    },
    [currentRoute, routes]
  )
  const modeView = useMemo(() => mode === 'view', [mode])
  const modeEdit = useMemo(() => mode === 'edit', [mode])

  const CALCULATION_OPTIONS = useMemo(() => [
    { id: 'BRUTO/TOTAL DA NF', name: 'Bruto/Total da NF' },
    { id: 'BRUTO/TOTAL DA NF - ST', name: 'Bruto/Total da NF - ST' },
    { id: 'LIQUIDO - IPI - ST', name: 'Líquido - IPI - ST' },
    { id: 'NETNET - TODOS OS IMPOSTOS', name: 'NetNet - todos os impostos' },
    { id: 'BRUTO/TOTAL DA NF - IPI', name: 'Bruto/Total da NF - IPI' }
  ], [])

  const RANGE_OPTIONS = useMemo(() => [
    { id: 'ANUAL', name: 'Anual' },
    { id: 'MENSAL', name: 'Mensal' },
    { id: 'QUINZENAL', name: 'Quinzenal' },
    { id: 'SEMANAL', name: 'Semanal' },
    { id: 'SEMESTRAL', name: 'Semestral' },
    { id: 'TITULO A TITULO', name: 'Título a título' },
    { id: 'TRIMESTRAL', name: 'Trimestral' }
  ], [])

  const DESCONT_OPTIONS = useMemo(() => [
    { id: 'DEPÓSITO/BOLETO', name: 'Depósito/Boleto' },
    { id: 'DESCONTO EM DUPLICATA', name: 'Desconto em duplicata' },
    { id: 'NO PREÇO', name: 'No preço' },
    { id: 'PRODUTOS - PEDIDO BONIFICADO', name: 'Produtos - Pedido bonificado' },
    { id: 'APURACAO', name: 'Apuração' },
    { id: 'AUTOMATICO', name: 'Automático' }
  ], [])

  const BASIS_OF_CALCULATION_OPTIONS = useMemo(() => [
    { id: 'FATURAMENTO', name: 'Faturamento' },
    { id: 'FATURAMENTO ENTREGUE', name: 'Faturamento Entregue' }
  ], [])

  const SLAUGHTER_RETURN_OPTIONS = useMemo(() => [
    { id: true, name: 'Sim' },
    { id: false, name: 'Não' }
  ], [])

  const onSuccessCalback = useCallback(
    () => {
      setLoader(false)
      history.push(routes.fan.path)
    },
    [history, routes]
  )

  const payload = useCallback(
    (values) => ({
      company: values.company,
      parentCompanyCode: values.code?.parentCompanyCode,
      parentCompanyName: values.matrix?.parentCompany,
      responsible: values.responsible.name,
      regionalManager: values.regionalManager?.approverDescription,
      regionalManagerCode: values.regionalManager?.approverCode,
      startDate: moment(values.date.from).toISOString(),
      endDate: moment(values.date.to).toISOString(),
      directorship: find(linesMasterFromApi, ({ masterLineCode }) => masterLineCode === values.directorship).masterLineCode,
      directorshipDescription: find(linesMasterFromApi, ({ masterLineCode }) => masterLineCode === values.directorship).masterLineDescription,
      observation: values.observation,
      lines: values.linesFromBack,
      families: values.familiesFromBack,
      linesExceptions: values.linesExceptionsFromBack,
      familiesExceptions: values.familiesExceptionsFromBack,
      percentages: values.percentages,
      negotiatedFunds: values.negotiatedFunds,
      achivements: values.achivements,
      attachments: values.attachments,
      isAdditive: !!isAdditive
    })
    , [isAdditive, linesMasterFromApi])

  const handleSubmit = useCallback(
    (values) => {
      if (!id) {
        dispatch(
          FanActions.saveFan(
            {
              ...payload(values.fan),
              workflowFanId
            },
            (id) => {
              dispatch(FanActions.concludeFan(id))
              onSuccessCalback()
            },
            setLoader
          )
        )
      } else {
        dispatch(FanActions.updateFan(
          id,
          payload(values.fan),
          dispatch(FanActions.concludeFan(id, onSuccessCalback, setLoader)),
          setLoader
        ))
      }
    },
    [dispatch, id, onSuccessCalback, payload, workflowFanId]
  )

  const handleSaveSubmit = useCallback(
    () => {
      setLoader(true)
      const values = formRef.current.getData()
      if (!id) {
        dispatch(
          FanActions.saveFan(
            {
              ...payload(values.fan),
              workflowFanId
            },
            onSuccessCalback,
            setLoader
          )
        )
      } else {
        dispatch(FanActions.updateFan(id, payload(values.fan), onSuccessCalback, setLoader))
      }
    },
    [dispatch, id, onSuccessCalback, payload, workflowFanId]
  )

  const handleAddAdditive = useCallback(
    () => {
      history.push(routes.newFan.path, { params: { isAdditive: fanFromApi } })
    },
    [fanFromApi, history, routes]
  )

  const setValuesForm = useCallback(
    (values) => {
      formRef.current.setData({
        fan: {
          ...values.fan,
          matrix: { parentCompany: values.fan.parentCompanyName, parentCompanyCode: values.fan.parentCompanyCode },
          code: { parentCompanyCode: values.fan.parentCompanyCode, parentCompany: values.fan.parentCompanyName },
          responsible: { name: values.fan.responsible },
          regionalManager: {
            approverCode: values.fan?.regionalManagerCode,
            approverDescription: values.fan?.regionalManager
          },
          date: {
            from: formatBackDateTimeToBackDateFormat(values.fan?.startDate),
            to: formatBackDateTimeToBackDateFormat(values.fan?.endDate)
          },
          directorship: values.fan?.directorship,
          lines: map(values.fan?.lines, ({ code }) => code),
          linesFromBack: values.fan?.lines,
          families: map(values.fan?.families, ({ code }) => code),
          familiesFromBack: values.fan?.families,
          linesExceptions: map(values.fan?.linesExceptions, ({ code }) => code),
          familiesExceptions: map(values.fan?.familiesExceptions, ({ code }) => code),
          familiesExceptionsFromBack: values.fan?.familiesExceptions,
          linesExceptionsFromBack: values.fan?.linesExceptions,
          attachments: values.fan?.documents
        },
        lastFan: {
          ...values?.lastFan,
          matrix: values?.lastFan?.parentCompanyName,
          code: values?.lastFan?.parentCompanyCode,
          responsible: { name: values?.lastFan?.responsible },
          regionalManager: {
            approverCode: values?.lastFan?.regionalManagerCode,
            approverDescription: values?.lastFan?.regionalManager
          },
          date: {
            from: formatBackDateTimeToBackDateFormat(values?.lastFan?.startDate),
            to: formatBackDateTimeToBackDateFormat(values?.lastFan?.endDate)
          },
          directorship: values?.lastFan?.directorship,
          lines: map(values?.lastFan?.lines, ({ code }) => code),
          linesFromBack: values?.lastFan?.lines,
          families: map(values?.lastFan?.families, ({ code }) => code),
          familiesFromBack: values?.lastFan?.families,
          linesExceptions: map(values?.lastFan?.linesExceptions, ({ code }) => code),
          familiesExceptions: map(values?.lastFan?.familiesExceptions, ({ code }) => code),
          familiesExceptionsFromBack: values?.lastFan?.familiesExceptions,
          linesExceptionsFromBack: values?.lastFan?.linesExceptions,
          attachments: values.lastFan?.documents
        }
      })
    },
    []
  )

  useFormEffect(
    () => {
      if (!isEmpty(fanFromApi)) {
        setValuesForm(fanFromApi)
        setId(fanFromApi?.fan?.id)
        setLastFan(fanFromApi?.lastFan)
        setIsAdditive(fanFromApi?.fan?.isAdditive)
        setWorkflowFanId(fanFromApi?.fan?.workflowFanId)
        setHaveAWorkflow(fanFromApi?.fan?.workflowPerformedId)
      }
    }
    , [fanFromApi, linesMasterFromApi, setValuesForm]
  )

  useEffect(() => {
    if (!state?.params?.id && mode !== 'create') history.replace(routes.fan.path)
  },
  [history, mode, routes, state]
  )

  useFormEffect(
    () => {
      if (!isEmpty(state?.params?.isAdditive)) {
        setValuesForm(state?.params?.isAdditive)
        setId(state?.params?.id)
        setIsAdditive(state?.params?.isAdditive)
      }
    }
    , [fanFromApi, setValuesForm, state]
  )

  return (
    <Form
      ref={ formRef }
      onSubmit={ handleSubmit }
      schemaConstructor={ fanSchema }
      defaultValues={ INITIAL_VALUES }
    >
      { (loading || loadingLinesMaster || loader) && <CircularLoader/> }
      <Grid container spacing={ 2 } className={ classes.container } >
        <Grid item className={ classes.header } sm={ 12 } md={ 6 }>
          <I18n as={ Typography } className={ classes.title } variant="h4" gutterBottom >
          current fan
          </I18n>
          {isEmpty(lastFan) && (
            <IconButton color="care" >
              <InfoIcon />
              <I18n as={ Typography } variant="body2" gutterBottom >
             there is no previous FAN
              </I18n>
            </IconButton>
          )}

        </Grid>
        <Grid item sm={ 12 } md={ 6 } className={ classes.addAdditive }>
          { modeEdit && (
            <Button
              className={ classes.btnAdditive }
              disabled={ false }
              variant="outlined"
              color="secondary"
              startIcon={ <Add /> }
              onClick={ handleAddAdditive }
            >
              {t('add additive')}
            </Button>
          )}
        </Grid>
        <Grid item xs={ 12 }>
          <Scope path="fan">
            <CustomAccordion header={ t('main data') }>
              <MainData
                formRef={ formRef }
                isDisabled={ modeView }
                lineMasterOptions={ linesMasterFromApi }
                isEdit={ modeEdit }
              />
            </CustomAccordion>
            <CustomAccordion header={ t('percentage description') }>
              <PercentageDescription
                isDisabled={ modeView }
                formRef={ formRef }
                slaghterReturnOptions={ SLAUGHTER_RETURN_OPTIONS }
                rangeOptions={ RANGE_OPTIONS }
                calculationOptions={ CALCULATION_OPTIONS }
                basisOfCalculationOptions={ BASIS_OF_CALCULATION_OPTIONS }
                descontOptions={ DESCONT_OPTIONS }
              />
            </CustomAccordion>
            <CustomAccordion header={ t('other negotiated funds') }>
              <OtherNegotiatedFunds
                isDisabled={ modeView }
                formRef={ formRef }
                slaghterReturnOptions={ SLAUGHTER_RETURN_OPTIONS }
                rangeOptions={ RANGE_OPTIONS }
                calculationOptions={ CALCULATION_OPTIONS }
                basisOfCalculationOptions={ BASIS_OF_CALCULATION_OPTIONS }
              />
            </CustomAccordion>
            <CustomAccordion header={ t('budget for achievement of goal') }>
              <BudgetAchievement
                isDisabled={ modeView }
                formRef={ formRef }
                slaghterReturnOptions={ SLAUGHTER_RETURN_OPTIONS }
                rangeOptions={ RANGE_OPTIONS }
                calculationOptions={ CALCULATION_OPTIONS }
                basisOfCalculationOptions={ BASIS_OF_CALCULATION_OPTIONS }
                descontOptions={ DESCONT_OPTIONS }
              />
            </CustomAccordion>
            { (modeEdit || modeView) && (
              <CustomAccordion header={ t('attachments', { howMany: 1 }) }>
                <Attachments
                  isDisabled={ modeView }
                  formRef={ formRef }
                  idFan={ id }
                />
              </CustomAccordion>)}
          </Scope>
        </Grid>
        <Grid item xs={ 12 } className={ classes.buttons }>
          <Grid>
            {!modeView ? (
              <I18n
                as={ Button }
                className={ classes.resetBtn }
                disabled={ false }
                variant="text"
                color="secondary"
                type="reset"
                onClick={ () => formRef.current.reset() }
              >
                clean
              </I18n>
            ) : (
              <I18n
                as={ Button }
                className={ classes.generateReportBtn }
                disabled={ false }
                variant="outlined"
                color="secondary"
                startIcon={ <PrintIcon /> }
                onClick={ () => console.warn('chama rota para gerar arquivo') }
              >
                print out
              </I18n>
            )}
          </Grid>
          <Grid>
            <Button
              variant="outlined"
              color="secondary"
              disabled= { false }
              onClick={ () => history.push(routes.fan.path) }
            >
              { !modeView ? t('cancel') : t('turn back') }
            </Button>
            {!modeView && !haveAWorkflow && (
              <I18n as={ Button }
                color="secondary"
                variant="contained"
                className={ classes.btnSave }
                isLoading={ false }
                onClick={ handleSaveSubmit }
              >
              save
              </I18n>
            )
            }
            {!haveAWorkflow && (
              <Button
                color="secondary"
                variant="contained"
                className={ classes.btnConclude }
                isLoading={ false }
                onClick={ () => !modeView ? formRef.current.submit() : history.push(routes.editFan.path, { params: { id } }) }
              >
                { !modeView ? t('finish registration') : t('edit') }
              </Button>
            )}
          </Grid>
        </Grid>
      </Grid>
      {/* INICIO DO FROM DO ULTIMO FAN */}
      { !isEmpty(lastFan) && (
        <Grid container spacing={ 2 } className={ classes.container } >
          <Grid item className={ classes.header } sm={ 12 }>
            <I18n as={ Typography } className={ classes.title } variant="h4" gutterBottom >
         last fan
            </I18n>
          </Grid>
          <Grid item xs={ 12 }>
            <Scope path="lastFan">
              <CustomAccordion header={ t('main data') }>
                <MainData
                  formRef={ formRef }
                  isDisabled
                />
              </CustomAccordion>
              <CustomAccordion header={ t('percentage description') }>
                <PercentageDescription
                  isDisabled
                  formRef={ formRef }
                  slaghterReturnOptions={ SLAUGHTER_RETURN_OPTIONS }
                  rangeOptions={ RANGE_OPTIONS }
                  calculationOptions={ CALCULATION_OPTIONS }
                  basisOfCalculationOptions={ BASIS_OF_CALCULATION_OPTIONS }
                  descontOptions={ DESCONT_OPTIONS }
                />
              </CustomAccordion>
              <CustomAccordion header={ t('other negotiated funds') }>
                <OtherNegotiatedFunds
                  isDisabled
                  formRef={ formRef }
                  slaghterReturnOptions={ SLAUGHTER_RETURN_OPTIONS }
                  rangeOptions={ RANGE_OPTIONS }
                  calculationOptions={ CALCULATION_OPTIONS }
                  basisOfCalculationOptions={ BASIS_OF_CALCULATION_OPTIONS }
                />
              </CustomAccordion>
              <CustomAccordion header={ t('budget for achievement of goal') }>
                <BudgetAchievement
                  isDisabled
                  formRef={ formRef }
                  slaghterReturnOptions={ SLAUGHTER_RETURN_OPTIONS }
                  rangeOptions={ RANGE_OPTIONS }
                  calculationOptions={ CALCULATION_OPTIONS }
                  basisOfCalculationOptions={ BASIS_OF_CALCULATION_OPTIONS }
                  descontOptions={ DESCONT_OPTIONS }
                />
              </CustomAccordion>
              <CustomAccordion header={ t('attachments', { howMany: 1 }) }>
                <Attachments
                  isDisabled
                  formRef={ formRef }
                />
              </CustomAccordion>
            </Scope>
          </Grid>
        </Grid>
      )}
    </Form>
  )
}

export default BuyerListScreen
