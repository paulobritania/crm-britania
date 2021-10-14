import React, { useMemo, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'

import filter from 'lodash/filter'
import find from 'lodash/find'
import first from 'lodash/first'
import isEmpty from 'lodash/isEmpty'
import map from 'lodash/map'

import Grid from '@material-ui/core/Grid'
import Add from '@material-ui/icons/Add'
import Typography from '@material-ui/core/Typography'

import { useDialog } from '@britania-crm/dialog'
import I18n, { useT } from '@britania-crm/i18n'
import {
  lines as linesCrmRoutes,
  customer as customerCrmRoutes
} from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import { useSnackbar } from '@britania-crm/snackbar'
import { AppActions } from '@britania-crm/stores/app'
import { getErrorMessage } from '@britania-crm/utils/error'
import Button from '@britania-crm/web-components/Button'
import IconButton from '@britania-crm/web-components/IconButton'
import DataTable from '@britania-crm/web-components/DataTable'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import InputCpfCnpj from '@britania-crm/web-components/InputCpfCnpj'
import InputDayMonth from '@britania-crm/web-components/InputDayMonth'
import InputHidden from '@britania-crm/web-components/InputHidden'
import InputPhone from '@britania-crm/web-components/InputPhone'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'
import ConfirmModal from '@britania-crm/web-components/Modal/ConfirmModal'
import StatusSwitch from '@britania-crm/web-components/StatusSwitch'
import Tooltip from '@britania-crm/web-components/Tooltip'
import RadioGroup from '@britania-crm/web-components/RadioGroup'

import { useStyles } from './styles'

const MainData = ({
  isEdit,
  isDisabled,
  formRef,
  setCpf,
  cpfAlreadyExists,
  isView
}) => {
  const t = useT()
  const classes = useStyles()
  const { createDialog } = useDialog()
  const dispatch = useCallback(useDispatch(), [])
  const snackbar = useSnackbar()

  const [teste, setTeste] = useState([])

  const [line, setLine] = useState('')
  const [family, setFamily] = useState([])
  const [listByLineOfFamily, setListByLineOfFamily] = useState([])
  const [matrixCode, setMatrixCode] = useState('')
  const [disabledButton, setDisabledButton] = useState(false)
  const mockVoltage = useMemo(
    () => [
      { id: '110', name: '110' },
      { id: '220', name: '220' }
    ],
    []
  )

  const familiesParams = useMemo(() => {
    if (line) {
      return {
        clientTotvsCode: matrixCode,
        lines: line
      }
    }
  }, [line, matrixCode])

  const { data: linesFromApi, loading: linesFromApiLoading } = useCrmApi(
    matrixCode ? [linesCrmRoutes.getAll, matrixCode] : null,
    { params: { clientTotvsCode: matrixCode } },
    {
      onErrorRetry(error, key, config, revalidate, { retryCount }) {
        if (error.response.status === 500 && retryCount < 5 && !isView) {
          createDialog({
            id: 'new-request-modal',
            Component: ConfirmModal,
            props: {
              onConfirm() {
                revalidate({ retryCount })
              },
              text: t('search error line')
            }
          })
        } else {
          dispatch(
            AppActions.addAlert({
              type: 'error',
              message: t('maximum number of attempts reached')
            })
          )
        }
      },
      revalidateOnFocus: false
    }
  )

  const { data: familiesFromApi, loading: familiesFromApiLoading } = useCrmApi(
    matrixCode && line ? [linesCrmRoutes.getFamilies, familiesParams] : null,
    { params: familiesParams },
    {
      onErrorRetry(error, key, config, revalidate, { retryCount }) {
        if (error.response.status === 500 && retryCount < 5 && !isView) {
          createDialog({
            id: 'new-request-family-modal',
            Component: ConfirmModal,
            props: {
              onConfirm() {
                revalidate({ retryCount })
              },
              text: t('search error family')
            }
          })
        } else {
          dispatch(
            AppActions.addAlert({
              type: 'error',
              message: t('maximum number of attempts reached')
            })
          )
        }
      },
      revalidateOnFocus: false
    }
  )

  const OPTIONS_LINE = useMemo(
    () =>
      filter(
        linesFromApi,
        (item) =>
          !find(
            listByLineOfFamily,
            ({ lineCode }) => lineCode === item.lineCode
          )
      ),
    [linesFromApi, listByLineOfFamily]
  )

  const columns = useMemo(
    () => [
      {
        title: t('line', { howMany: 1 }),
        field: 'lineDescription',
        width: '25%',
        render: () => (
          <InputSelect
            detached
            valueKey='lineDescription'
            idKey='lineCode'
            value={line}
            loading={linesFromApiLoading}
            onChange={({ target }) => {
              setLine(target.value)
              setFamily([])
            }}
            name='line'
            label={t('line', { howMany: 1 })}
            id='select-line'
            required
            options={teste}
            // disabled={isDisabled || !linesFromApi}
          />
        )
      },
      {
        title: t('family', { howMany: 1 }),
        field: 'family',
        width: '25%',
        render(row) {
          if (row?.family) {
            return (
              <InputSelect
                detached
                valueKey='familyDescription'
                idKey='familyCode'
                disabled={isDisabled || isEmpty(familiesFromApi)}
                value={family}
                onChange={({ target }) => setFamily(target.value)}
                name='family'
                label={t('family', { howMany: 1 })}
                id='select-family'
                loading={familiesFromApiLoading}
                required
                options={familiesFromApi}
              />
            )
          }
          return ''
        }
      },
      {
        title: t('responsible', { howMany: 1 }),
        field: 'responsible',
        width: '25%'
      },
      {
        title: t('regional manager', { howMany: 1 }),
        field: 'regionalManager',
        width: '25%'
      }
    ],
    [t]
  )

  const doAddItemTable = useCallback(() => {
    setTeste(linesFromApi)
    const arrayFamily = map(family, (item) =>
      find(familiesFromApi, ({ familyCode }) => familyCode === item)
    )

    const arrayLine = find(linesFromApi, ({ lineCode }) => lineCode === line)
    formRef.current.setFieldValue('linesFamilies', (old) => [
      ...old,
      {
        family: [...arrayFamily],
        ...arrayLine
      }
    ])
    // setFamily([])
    // setLine('')
  }, [familiesFromApi, family, formRef, line, linesFromApi])

  const handleLineFamily = useCallback(
    (value) => {
      setListByLineOfFamily(value)
      if (isEmpty(value)) {
        formRef.current.setFieldValue('responsible', {})
        formRef.current.setFieldValue('regionalManager', {})
      }
    },
    [formRef]
  )

  const clientParams = useMemo(
    () => ({
      page: 1,
      pageSize: 10,
      clientRegistrationType: 'REGISTER'
    }),
    []
  )

  const linesAndFamilies = useMemo(() => {
    const linesFamilies = []
    if (!isEmpty(family) && line) {
      map(family, (item) => {
        linesFamilies.push(`${line},${item}`)
      })
    }
    return linesFamilies
  }, [family, line])

  const regionalParams = useMemo(
    () => ({
      page: 1,
      pageSize: 10,
      linesAndFamilies
    }),
    [linesAndFamilies]
  )

  const respresentativeParams = useMemo(
    () => ({
      page: 1,
      pageSize: 10,
      linesAndFamilies
    }),
    [linesAndFamilies]
  )

  const { loading: regionalFromApiLoading } = useCrmApi(
    matrixCode && !isEmpty(linesAndFamilies)
      ? [
          customerCrmRoutes.getRegional.replace(
            ':clientCode',
            matrixCode,
            linesAndFamilies
          ),
          regionalParams
        ]
      : null,
    { params: regionalParams },
    {
      onSuccess(data) {
        const regional = formRef.current.getFieldValue('regionalManager')

        if (
          first(data)?.approverCode !== regional.approverCode &&
          !isEmpty(regional)
        ) {
          setDisabledButton(true)
          setFamily([])
          setLine('')
          snackbar.error(t('many managers found'))
        } else {
          setDisabledButton(false)
        }

        if (isEmpty(regional)) {
          formRef.current.setFieldValue('regionalManager', first(data))
        }
      },
      onErrorRetry(error) {
        if (error.response.status === 500) {
          snackbar.error(getErrorMessage(error))
        }
      },
      revalidateOnFocus: false
    }
  )

  const { loading: representativeFromApiLoading } = useCrmApi(
    matrixCode && !isEmpty(listByLineOfFamily)
      ? [
          customerCrmRoutes.getResponsible.replace(
            ':clientCode',
            matrixCode,
            listByLineOfFamily
          ),
          respresentativeParams
        ]
      : null,
    { params: respresentativeParams },
    {
      revalidateOnFocus: false,
      onSuccess(data) {
        const responsible = formRef.current.getFieldValue('responsible')
        if (isEmpty(responsible)) {
          formRef.current.setFieldValue('responsible', first(data))
        }
      },
      onErrorRetry(error) {
        if (error.response.status === 500) {
          snackbar.error(getErrorMessage(error))
        }
      }
    }
  )

  const isDisabledButton = useMemo(
    () =>
      // (isEmpty(family) && isEmpty(line)) ||
      isDisabled || disabledButton || regionalFromApiLoading,
    [disabledButton, isDisabled, regionalFromApiLoading]
  )

  const handleDeleteItem = useCallback(
    (event, row) =>
      formRef.current.setFieldValue(
        'linesFamilies',
        filter(
          listByLineOfFamily,
          (option, index) => index !== row.tableData.id
        )
      ),
    [formRef, listByLineOfFamily]
  )

  const setNameMatrix = useCallback(
    (value) => {
      setLine('')
      formRef.current.setFieldValue('clientTotvsDescription', value)
      setMatrixCode(value.parentCompanyCode)
    },
    [formRef]
  )

  const setCodeMatrix = useCallback(
    (value) => {
      setLine('')
      formRef.current.setFieldValue('clientTotvsCode', value)
      setMatrixCode(value.parentCompanyCode)
    },
    [formRef]
  )

  return (
    <>
      <Grid container spacing={1} className={classes.containerMain}>
        <Grid item className={classes.header} sm={12}>
          <Typography className={classes.title}>{t('main data')}</Typography>
        </Grid>
        <Grid item sm={12} md={4}>
          <InputCpfCnpj
            name='cpf'
            label='CPF'
            mode='cpf'
            disabled={isDisabled}
            onValueChange={setCpf}
            helperText={
              cpfAlreadyExists ? 'CPF já cadastrado em outra Matriz' : ''
            }
          />
        </Grid>
        <Grid item sm={12} md={4}>
          <InputText
            name='name'
            label={t('name', { howMany: 1 })}
            disabled={isDisabled}
            inputProps={{ maxLength: 200 }}
          />
        </Grid>
        <Grid item sm={12} md={4}>
          <InputText
            name='role'
            label={t('office', { howMany: 1 })}
            disabled={isDisabled}
            inputProps={{ maxLength: 50 }}
          />
        </Grid>
        <Grid item sm={12} md={4}>
          <InputDayMonth
            label={t('birthday', { howMany: 1 })}
            type='tel'
            mode='dd/mm'
            name='birthday'
            disabled={isDisabled}
          />
        </Grid>
        <Grid item sm={12} md={4}>
          <InputText
            name='email'
            label={t('email')}
            disabled={isDisabled}
            inputProps={{ maxLength: 40 }}
          />
        </Grid>
        <Grid item sm={12} md={4}>
          <InputPhone
            name='telephone'
            label={t('phone', { howMany: 1 })}
            disabled={isDisabled}
          />
        </Grid>
        <Grid item sm={12} md={5}>
          <InputSelect
            detached
            valueKey='lineDescription'
            idKey='lineCode'
            value={line}
            loading={linesFromApiLoading}
            onChange={({ target }) => {
              setLine(target.value)
              setFamily([])
            }}
            name='line'
            label={t('line', { howMany: 1 })}
            id='select-line'
            required
            options={OPTIONS_LINE}
            disabled={isDisabled || !linesFromApi}
          />
        </Grid>
        {/* <Grid item sm={12} md={5}>
          <InputSelect
            detached
            valueKey='familyDescription'
            idKey='familyCode'
            disabled={isDisabled || isEmpty(familiesFromApi)}
            value={family}
            onChange={({ target }) => setFamily(target.value)}
            name='family'
            label={t('family', { howMany: 1 })}
            id='select-family'
            loading={familiesFromApiLoading}
            required
            options={familiesFromApi}
            multiple
          />
        </Grid> */}
        {/* <Grid item sm={12} md={6}>
        <InputAutocomplete
          valueKey='approverDescription'
          name='responsible'
          label={t('responsible', { howMany: 1 })}
          disabled={true}
          loading={representativeFromApiLoading}
        />
      </Grid>
      <Grid item sm={12} md={6}>
        <InputAutocomplete
          loading={regionalFromApiLoading}
          valueKey='approverDescription'
          name='regionalManager'
          label={t('regional manager')}
          disabled={true}
        />
      </Grid> */}
        {isEdit && (
          <Grid item sm={12} md={2} className={classes.status}>
            <StatusSwitch name='active' disabled={isDisabled} />
          </Grid>
        )}
      </Grid>
      <Grid container spacing={1} className={classes.containerMain}>
        <Grid item className={classes.header} sm={12}>
          <Typography className={classes.title}>{t('matrix')}</Typography>
        </Grid>
        <Grid item sm={12} md={4}>
          <InputAutocomplete
            url={customerCrmRoutes.getInfoCustomer}
            params={clientParams}
            valueKey='parentCompanyCode'
            paramName='parentCompanyCode'
            name='clientTotvsCode'
            label={t('matrix code', { abbreviation: false })}
            disabled={isEdit || isDisabled}
            onValueChange={setNameMatrix}
          />
        </Grid>
        <Grid item sm={12} md={4}>
          <InputAutocomplete
            url={customerCrmRoutes.getInfoCustomer}
            params={clientParams}
            valueKey='parentCompanyName'
            paramName='parentCompany'
            name='clientTotvsDescription'
            label={t('matrix', { howMany: 1 })}
            disabled={isEdit || isDisabled}
            onValueChange={setCodeMatrix}
          />
        </Grid>
        <Grid item sm={12} md={4}>
          <InputText
            name='category'
            label={t('category', { howMany: 1 })}
            disabled={isDisabled}
            inputProps={{ maxLength: 200 }}
          />
        </Grid>
        <Grid item sm={12} md={10} className={classes.containerTable}>
          <div className={classes.table}>
            <DataTable
              data={listByLineOfFamily}
              columns={columns}
              loading={false}
              onDeleteClick={!isDisabled && handleDeleteItem}
              options={{ search: false }}
            />
            <InputHidden
              name='linesFamilies'
              onValueChange={handleLineFamily}
              showError
            />
          </div>
        </Grid>
        <Grid item sm={12} md={2} className={classes.containerRadio}>
          <RadioGroup
            name='voltage'
            label={t('voltage', { howMany: 1 })}
            readOnly={isDisabled}
            options={mockVoltage}
          />
        </Grid>
        <Grid item sm={12} md={2}>
          <IconButton
            onClick={doAddItemTable}
            as={Button}
            size='small'
            variant='text'
            // disabled={isDisabledButton}
            startIcon={<Add />}
          >
            Nova Linha
          </IconButton>
        </Grid>
      </Grid>
    </>
  )
}

MainData.propTypes = {
  isEdit: PropTypes.bool,
  isDisabled: PropTypes.bool.isRequired,
  formRef: PropTypes.any.isRequired,
  setCpf: PropTypes.func.isRequired,
  cpfAlreadyExists: PropTypes.bool,
  isView: PropTypes.bool
}

MainData.defaultProps = {
  isEdit: false,
  cpfAlreadyExists: false,
  isView: false
}

export default MainData
