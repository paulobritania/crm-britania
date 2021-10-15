import React, { useMemo, useCallback, useState, useContext } from 'react'
import { useDispatch } from 'react-redux'

import PropTypes from 'prop-types'

import filter from 'lodash/filter'
import find from 'lodash/find'
import first from 'lodash/first'
import isEmpty from 'lodash/isEmpty'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Add from '@material-ui/icons/Add'

import { useDialog } from '@britania-crm/dialog'
import { useT } from '@britania-crm/i18n'
import { customer as customerCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import { useLinesBuyers } from '@britania-crm/services/hooks/useLinesBuyers'
import { useSnackbar } from '@britania-crm/snackbar'
import Button from '@britania-crm/web-components/Button'
import IconButton from '@britania-crm/web-components/IconButton'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import InputCpfCnpj from '@britania-crm/web-components/InputCpfCnpj'
import InputDayMonth from '@britania-crm/web-components/InputDayMonth'
import InputHidden from '@britania-crm/web-components/InputHidden'
import InputPhone from '@britania-crm/web-components/InputPhone'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'
import RadioGroup from '@britania-crm/web-components/RadioGroup'
import StatusSwitch from '@britania-crm/web-components/StatusSwitch'
import Tooltip from '@britania-crm/web-components/Tooltip'

import LineInput from '../components/LineInput'
import FamilyInput from '../components/FamilyInput'
import RegionalInput from '../components/RegionalInput'
import ResponsibleInput from '../components/ResponsibleInput'

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

  const [line, setLine] = useState('')
  const [listByLineOfFamily, setListByLineOfFamily] = useState([])
  const [matrixCode, setMatrixCode] = useState('')
  const [disabledButton, setDisabledButton] = useState(false)

  const { linesBuyers, handleLineChange, handleRemoveLine, handleAddLine } =
    useLinesBuyers()

  const mockVoltage = useMemo(
    () => [
      { id: '110', name: '110' },
      { id: '220', name: '220' }
    ],
    []
  )

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

  // const { loading: regionalFromApiLoading } = useCrmApi(
  //   matrixCode && !isEmpty(linesAndFamilies)
  //     ? [
  //         customerCrmRoutes.getRegional.replace(
  //           ':clientCode',
  //           matrixCode,
  //           linesAndFamilies
  //         ),
  //         regionalParams
  //       ]
  //     : null,
  //   { params: regionalParams },
  //   {
  //     onSuccess(data) {
  //       const regional = formRef.current.getFieldValue('regionalManager')

  //       if (
  //         first(data)?.approverCode !== regional.approverCode &&
  //         !isEmpty(regional)
  //       ) {
  //         setDisabledButton(true)
  //         setFamily([])
  //         setLine('')
  //         snackbar.error(t('many managers found'))
  //       } else {
  //         setDisabledButton(false)
  //       }

  //       if (isEmpty(regional)) {
  //         formRef.current.setFieldValue('regionalManager', first(data))
  //       }
  //     },
  //     onErrorRetry(error) {
  //       if (error.response.status === 500) {
  //         snackbar.error(getErrorMessage(error))
  //       }
  //     },
  //     revalidateOnFocus: false
  //   }
  // )

  // const { loading: representativeFromApiLoading } = useCrmApi(
  //   matrixCode && !isEmpty(listByLineOfFamily)
  //     ? [
  //         customerCrmRoutes.getResponsible.replace(
  //           ':clientCode',
  //           matrixCode,
  //           listByLineOfFamily
  //         ),
  //         respresentativeParams
  //       ]
  //     : null,
  //   { params: respresentativeParams },
  //   {
  //     revalidateOnFocus: false,
  //     onSuccess(data) {
  //       const responsible = formRef.current.getFieldValue('responsible')
  //       if (isEmpty(responsible)) {
  //         formRef.current.setFieldValue('responsible', first(data))
  //       }
  //     },
  //     onErrorRetry(error) {
  //       if (error.response.status === 500) {
  //         snackbar.error(getErrorMessage(error))
  //       }
  //     }
  //   }
  // )

  const isDisabledButton = useMemo(
    () => isDisabled || disabledButton[(disabledButton, isDisabled)]
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
        <Grid item sm={12} md={5}>
          <InputText
            name='name'
            label={t('name', { howMany: 1 })}
            disabled={isDisabled}
            inputProps={{ maxLength: 200 }}
          />
        </Grid>
        <Grid item sm={12} md={3}>
          <InputText
            name='role'
            label={t('office', { howMany: 1 })}
            disabled={isDisabled}
            inputProps={{ maxLength: 50 }}
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
          <InputText
            name='email'
            label={t('email')}
            disabled={isDisabled}
            inputProps={{ maxLength: 40 }}
          />
        </Grid>
        <Grid item sm={12} md={3}>
          <InputDayMonth
            label={t('birthday', { howMany: 1 })}
            type='tel'
            mode='dd/mm'
            name='birthday'
            disabled={isDisabled}
          />
        </Grid>
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
        <Grid item sm={12} md={3}>
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
        <Grid item sm={12} md={6}>
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
        <Grid item sm={12} md={3}>
          <InputText
            name='category'
            label={t('category', { howMany: 1 })}
            disabled={isDisabled}
            inputProps={{ maxLength: 200 }}
          />
        </Grid>
        <Grid item sm={12} md={9} className={classes.containerTable}>
          <Grid item sm={11}>
            <ul className={classes.tableHeader}>
              <li>{t('line', { howMany: 1 })}</li>
              <li>{t('family', { howMany: 1 })}</li>
              <li>{t('responsible', { howMany: 1 })}</li>
              <li>{t('regional manager')}</li>
            </ul>
          </Grid>
          <Grid item sm={12} className={classes.table}>
            {linesBuyers.map((lines, idx) => (
              <Grid item key={idx} className={classes.flexContainer}>
                <Grid item sm={3}>
                  <LineInput index={idx} matrixCode={matrixCode} />
                </Grid>
                <Grid item sm={3}>
                  <FamilyInput index={idx} matrixCode={matrixCode} />
                </Grid>
                {/* <Grid item sm={3}>
                    <InputAutocomplete
                      valueKey='approverDescription'
                      name='responsible'
                      label={t('responsible', { howMany: 1 })}
                      disabled={true}
                      loading={representativeFromApiLoading}
                      onChange={(e) => handleLineChange(idx, e)}
                    />
                  </Grid>
                  <Grid item sm={3}>
                    <InputAutocomplete
                      loading={regionalFromApiLoading}
                      valueKey='approverDescription'
                      name='regionalManager'
                      label={t('regional manager')}
                      disabled={true}
                      onChange={(e) => handleLineChange(idx, e)}
                    />
                  </Grid> */}
                <Button variant='text' onClick={(e) => handleRemoveLine(e)}>
                  X
                </Button>
              </Grid>
            ))}
          </Grid>
          <InputHidden
            name='linesFamilies'
            onValueChange={handleLineFamily}
            showError
          />
        </Grid>
        <Grid item sm={12} md={3} className={classes.containerRadio}>
          <RadioGroup
            name='voltage'
            label={t('voltage', { howMany: 1 })}
            readOnly={isDisabled}
            options={mockVoltage}
          />
        </Grid>
        <Grid item sm={12} md={2}>
          <IconButton
            onClick={() => handleAddLine()}
            // onClick={doAddItemTable}
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
