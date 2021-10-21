import React, {
  useMemo,
  useCallback,
  useEffect,
  useState
} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { useDialog } from '@britania-crm/dialog'
import I18n, { useT } from '@britania-crm/i18n'
import { putRankings } from '@britania-crm/services/apis/crmApi/resources/rankink.service'
import { ranking } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { AppActions } from '@britania-crm/stores/app/app.actions'
import Button from '@britania-crm/web-components/Button'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'

import LastChangeInfo from '../../components/LastChangeInfo/LastChangeInfo'
import Table from '../../components/Table/Table.js'
import {
  mapperIndicatorToColums,
  mountPutPayload
} from '../../utils'
import getColumsConfigs from '../../utils/columnsConfig.js'
import useStyles, {
  Container,
  Footer,
  CancelButton
} from './styles'

const CustomerRanking = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const {
    data: rankingFromApi,
    loading,
    mutate
  } = useCrmApi(ranking.get)
  const [data, setData] = useState(null)
  const [originalData, setOriginalData] = useState(null)
  const [lastInfos, setLastInfos] = useState(null)
  const [columnEditable, setColumnEditable] = useState(null)
  const { createDialog } = useDialog()
  const t = useT()
  const classes = useStyles()

  const columns = useMemo(() => getColumsConfigs(), [])

  useEffect(() => {
    if (loading || !rankingFromApi) return
    const mappedColumns = mapperIndicatorToColums(rankingFromApi?.indicators)
    setData(mappedColumns)
    setOriginalData(mappedColumns)
    setLastInfos({
      user: rankingFromApi.updatedBy,
      date: rankingFromApi.updatedAt
    })
  }, [loading, rankingFromApi])

  const updateMyData = useCallback((rowIndex, columnId, value) => {
    setData((old) =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value
          }
        }
        return row
      })
    )
  }, []
  )

  const handleColumnEditable = useCallback((column) => {
    setColumnEditable(column)
  }, [])

  const onPutRanking = useCallback(async (payload) => {
    try {
      await putRankings(payload)
      mutate()
      dispatch(AppActions.addAlert({ type: 'success', message: t('change saved successfully') }))
    } catch (error) {
      dispatch(AppActions.addAlert({ type: 'error', message: t('an error occurred while updating ranking') }))
    }
  }, [dispatch, mutate, t])

  const handleSave = useCallback(
    () => createDialog({
      id: 'confirm-changes',
      Component: ConfirmModal,
      props: {
        textButtonOnConfirm: t('yes'),
        textButtonOnNegative: t('no'),
        text: t('Do you want to change the Customer Ranking Goals Register?'),
        onConfirm () {
          const payload = mountPutPayload(data)
          onPutRanking(payload)
          setColumnEditable(null)
        }
      }
    }),
    [createDialog, data, onPutRanking, t]
  )
  const handleCancel = useCallback(() => {
    setData(originalData)
    setColumnEditable(null)
  }, [originalData])

  if (!data) return null

  return (
    <Container>
      <Grid item xs={ 12 } className={ classes.header }>
        <I18n as={ Button } color="secondary" variant="outlined" onClick={ history.goBack } >
          back
        </I18n>
        <I18n as={ Typography } variant="h4" className={ classes.title } >
          Customer Ranking
        </I18n>
      </Grid>
      <Table
        columns={ columns }
        data={ data }
        updateMyData={ updateMyData }
        handleColumnEditable ={ handleColumnEditable }
        columnEditable = { columnEditable }
      />
      <LastChangeInfo
        user={ lastInfos?.user }
        date={ lastInfos?.date }
      />
      <Footer>
        <Box>
          <CancelButton
            onClick={ handleCancel }
            color="secondary"
            variant="outlined"
          >{t('cancel')}
          </CancelButton>
          <Button
            onClick={ handleSave }
            variant="contained"
            color="secondary"
          >{t('save')}
          </Button>
        </Box>
      </Footer>
    </Container>
  )
}

export default CustomerRanking
