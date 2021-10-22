import React, { useCallback, useMemo, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { chain } from 'lodash'
import isEmpty from 'lodash/isEmpty'
import isNil from 'lodash/isNil'
import map from 'lodash/map'
import omitBy from 'lodash/omitBy'

import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord'

import { useT } from '@britania-crm/i18n'
import { buyers as buyersCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { FileActions } from '@britania-crm/stores/file'
import colors from '@britania-crm/styles/colors'
import Checkbox from '@britania-crm/web-components/Checkbox'
import DataTable from '@britania-crm/web-components/DataTable'
import PageFilter from '@britania-crm/web-components/PageFilter'
import Tooltip from '@britania-crm/web-components/Tooltip'
import { useRoutes } from '@britania-crm/web-src/routes/authenticated.routes'

import BuyerFormFilter from '../../components/BuyerFormFilter'
import { Container } from './styles'

const BuyerListScreen = () => {
  const t = useT()
  const { routes, currentRoutePermissions } = useRoutes()
  const history = useHistory()
  const dispatch = useCallback(useDispatch(), [])

  const [filters, setFilters] = useState({})

  const [downloadLoading, setDownloadLoading] = useState(false)

  const { data, loading, error } = useCrmApi(
    [buyersCrmRoutes.getAll, filters],
    { params: filters }
  )

  const columns = useMemo(
    () => [
      {
        title: t('name', { howMany: 1 }),
        field: 'name',
        width: 250
      },
      {
        title: t('matrix or company'),
        field: 'clientTotvsDescription'
      },
      {
        title: t('line', { howMany: 1 }),
        field: 'line',
        render(row) {
          if (!isEmpty(row?.buyerLinesFamilies)) {
            const newLinesFamilies = chain(row?.buyerLinesFamilies)
              .groupBy('lineCode')
              .map((value, key) => ({
                lineCode: Number(key),
                lineDescription: value[0].lineDescription,
                family: value
              }))
              .value()
            const listFamilyAndLine = map(
              newLinesFamilies,
              (lineFamily) => lineFamily.lineDescription
            ).join(', ')
            const newString = listFamilyAndLine.slice(0, 15)
            return (
              <div>
                <Tooltip title={listFamilyAndLine} arrow>
                  {listFamilyAndLine.length >= 15
                    ? newString.concat('...')
                    : newString}
                </Tooltip>
              </div>
            )
          }
          return '-'
        }
      },
      {
        title: t('regional', { howMany: 1 }),
        field: 'regionalManagerDescription'
      },
      {
        title: t('responsible', { howMany: 1 }),
        field: 'responsibleDescription'
      },
      {
        title: t('status'),
        field: 'active',
        render: (row) => (
          <Checkbox
            detached
            readOnly
            style={{ color: colors.black2 }}
            label={row.active ? t('active') : t('inactive')}
            value={row.active}
            icon={
              <FiberManualRecordIcon
                fontSize='small'
                htmlColor={colors.error.main}
              />
            }
            checkedIcon={
              <FiberManualRecordIcon
                fontSize='small'
                htmlColor={colors.success.main}
              />
            }
          />
        )
      }
    ],
    [t]
  )

  const onEditClick = useCallback(
    (event, row) => {
      history.push(routes.editBuyer.path, {
        params: {
          mode: 'edit',
          id: row.id
        }
      })
    },
    [history, routes.editBuyer.path]
  )

  const onRowClick = useCallback(
    (event, row) => {
      history.push(routes.viewBuyer.path, {
        params: {
          mode: 'view',
          id: row.id
        }
      })
    },
    [history, routes.viewBuyer.path]
  )

  const handleFilter = useCallback((values) => {
    setFilters(
      omitBy(
        {
          clientTotvsCode: values.codMatrix ? values.codMatrix : null,
          lineCodes: !isEmpty(values.lineDescription)
            ? values.lineDescription.join(',')
            : null,
          name: values.nameBuyer ? values.nameBuyer : null,
          active: values.status
        },
        isNil
      )
    )
  }, [])

  const handleDownload = useCallback(() => {
    setDownloadLoading(true)
    dispatch(
      FileActions.download(
        buyersCrmRoutes.download,
        'Relátorio.xlsx',
        setDownloadLoading
      )
    )
  }, [dispatch])

  const onCreateClick = useCallback(() => {
    history.push(routes.newBuyer.path, { params: { mode: 'create' } })
  }, [history, routes.newBuyer.path])

  return (
    <>
      <PageFilter handleFilter={handleFilter} Form={BuyerFormFilter} />
      <Container>
        <DataTable
          data={data}
          columns={columns}
          loading={loading || !!error || downloadLoading}
          title={t('buyer', { howMany: 2 })}
          addTitle={t('add new {this}', {
            gender: 'male',
            this: t('buyer', { howMany: 1 })
          })}
          onAddClick={currentRoutePermissions.INCLUIR && onCreateClick}
          onEditClick={currentRoutePermissions.EDITAR && onEditClick}
          onRowClick={onRowClick}
          addFilterTitle={t('filter data')}
          onExportClick={handleDownload}
          emptyMessage={t('{this} datagrid body empty data source message', {
            this: t('buyer', { howMany: 1 })
          })}
          searchFieldAlignment='left'
        />
      </Container>
    </>
  )
}

export default BuyerListScreen
