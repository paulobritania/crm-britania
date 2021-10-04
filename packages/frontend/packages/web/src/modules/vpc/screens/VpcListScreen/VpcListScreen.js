import React, {
  useCallback,
  useMemo,
  useState
} from 'react'
// import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import identity from 'lodash/identity'
import pickBy from 'lodash/pickBy'

import SaveAlt from '@material-ui/icons/SaveAlt'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import { vpc as vpcCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
// import { FileActions } from '@britania-crm/stores/file'
import colors from '@britania-crm/styles/colors'
import {
  formatBackDateToFriendlyFormat,
  formatFriendlyDateToBackFormat
} from '@britania-crm/utils/date'
import {
  trimMask,
  formatMoney
} from '@britania-crm/utils/formatters'
import DataTable from '@britania-crm/web-components/DataTable'
import PageFilter from '@britania-crm/web-components/PageFilter'
import DownloadReportModal from '@britania-crm/web-src/modules/vpc/modals/DownloadReportModal'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import VpcFormFilter from '../../containers/VpcFormFilter/VpcFormFilter'
import {
  Container,
  ButtonDownload
} from './styles'

const VpcListScreen = () => {
  const t = useT()
  const { routes, currentRoutePermissions } = useRoutes()
  const history = useHistory()
  const { createDialog } = useDialog()

  const [filters, setFilters] = useState({})

  const columns = useMemo(() => [
    {
      title: t('request number'),
      field: 'requestNumber'
    },
    {
      title: t('matrix'),
      field: 'parentCompanyName'
    },
    {
      title: t('situation budget'),
      field: 'situation'
    },
    {
      title: t('line'),
      field: 'linesDescription'
    },
    {
      title: t('type of funds'),
      field: 'foundsType'
    },
    {
      title: t('implantation date'),
      field: 'deploymentDate',
      render: (row) => row.deploymentDate ? formatBackDateToFriendlyFormat(row.deploymentDate) : null
    },
    {
      title: t('value', { howMany: 1 }),
      field: 'value',
      render: (row) => row.value ? formatMoney(row.value) : null
    },
    {
      title: t('responsible task'),
      field: 'taskResponsible'
    },
    {
      title: t('task', { howMany: 1 }),
      field: 'taskTitle'
    },
    {
      title: t('workflow task profile/user'),
      field: 'taskProfile'
    },
    {
      title: 'SLA',
      field: 'sla',
      render: (row) => row.sla ? formatBackDateToFriendlyFormat(row.sla) : null
    }

  ], [t])

  const onEditClick = useCallback((event, row) => {
    history.push(routes.editVpc.path, { params: { id: row.id } })
  }, [history, routes])

  const onRowClick = useCallback((event, row) => {
    history.push(routes.viewVpc.path, { params: { id: row.id } })
  }, [history, routes])

  const handleFilter = useCallback(
    (values) => {
      const payload = {
        cnpj: values.cnpj ? trimMask(values.cnpj) : null,
        parentCompanyName: values.matrix?.parentCompanyName,
        parentCompanyCode: values.codMatrix?.parentCompanyCode,
        requestNumber: values.numberBudget,
        foundsType: values.typeBudget,
        startDate: values.date.from ? formatFriendlyDateToBackFormat(values.date.from) : null,
        endDate: values.date.to ? formatFriendlyDateToBackFormat(values.date.to) : null,
        pendingApproval: values.pendingApproval,
        lineCode: values.line,
        approverCode: values.regional,
        initialValue: values.minValue,
        finalValue: values.maxValue,
        workflowTaskId: values.taskWorkflow,
        workflowId: values.version,
        sla: values.sla ? formatFriendlyDateToBackFormat(values.sla) : null,
        foundsSituation: values.foundsSituation,
        responsible: values.responsible
      }

      setFilters(pickBy(payload, identity))
    },
    []
  )

  const onAddClick = useCallback(
    () => {
      history.push(routes.newVpc.path, { params: { mode: 'create' } })
    },
    [history, routes]
  )

  const onRedirectClick = useCallback(
    (event, row) => {
      history.push(routes.workflowPanelView.path, {
        workflowId: row.performed?.workflow?.id,
        goBackTo: routes.vpc.path
      })
    },
    [history, routes]
  )

  const handleDownload = useCallback(
    (data) => createDialog({
      id: 'modal-add-new-product',
      Component: DownloadReportModal,
      props: { selectedItens: data, filters }

    }),
    [createDialog, filters]
  )

  // TODO: ajustar para a prop de Situação da Verba se ela existir
  const getColor = useCallback(
    (rowData) => {
      let workflowTaskProfile = ''
      if (rowData?.workflowTaskProfile) {
        workflowTaskProfile = rowData?.workflowTaskProfile
      }
      switch (workflowTaskProfile) {
        case 'ADM':
          return colors.green.lightest
        case 'USER':
          return colors.blue.lightest
        case 'VPC':
          return colors.red.lightest
        default:
          return colors.white
      }
    },
    []
  )

  const options = useMemo(
    () => ({
      rowStyle: (rowData) => ({ backgroundColor: getColor(rowData) }),
      selection: true
    }),
    [getColor]
  )

  const conditionToRedirect = useCallback(
    (row) => row?.performed?.workflow?.id,
    []
  )

  return (
    <>
      <PageFilter
        handleFilter={ handleFilter }
        Form={ VpcFormFilter }
      />
      <Container>
        <DataTable
          data={ vpcCrmRoutes.getAll }
          columns={ columns }
          filters={ filters }
          // loading={ loading || downloadLoading }
          title={ t('{this} requests', { this: 'VPC' }) }
          addTitle={ t('add new {this}', { gender: 'male', this: t('budget', { howMany: 1 }) }) }
          onAddClick={ currentRoutePermissions.INCLUIR && onAddClick }
          onEditClick={ currentRoutePermissions.EDITAR && onEditClick }
          onRedirectClick={ onRedirectClick }
          conditionToRedirect={ conditionToRedirect }
          onRowClick={ onRowClick }
          onGoBack={ history.goBack }
          addFilterTitle={ t('filter data') }
          emptyMessage={ t('{this} datagrid body empty data source message', { this: 'VPCs' }) }
          options={ options }
          actions={ [
            {
              icon: () =>
                <ButtonDownload
                  size="small"
                  color="warning"
                  startIcon={ <SaveAlt /> }
                  variant="outlined"
                  disabled={ false }
                >
                  {t('datagrid toolbar export title')}
                </ButtonDownload>,
              onClick: (evt, data) => handleDownload(data)
            }
          ] }
        />
      </Container>
    </>
  )
}

export default VpcListScreen
