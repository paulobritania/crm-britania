import React, { useMemo, useCallback, useState } from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Add from '@material-ui/icons/Add'

import { useT } from '@britania-crm/i18n'
import { customer as customerCrmRoutes } from '@britania-crm/services/apis/crmApi/resources/routes'
import { useLinesBuyers } from '@britania-crm/services/hooks/useLinesBuyers'
import Button from '@britania-crm/web-components/Button'
import IconButton from '@britania-crm/web-components/IconButton'
import InputAutocomplete from '@britania-crm/web-components/InputAutocomplete'
import InputCpfCnpj from '@britania-crm/web-components/InputCpfCnpj'
import InputDayMonth from '@britania-crm/web-components/InputDayMonth'
import InputHidden from '@britania-crm/web-components/InputHidden'
import InputPhone from '@britania-crm/web-components/InputPhone'
import InputText from '@britania-crm/web-components/InputText'
import RadioGroup from '@britania-crm/web-components/RadioGroup'
import StatusSwitch from '@britania-crm/web-components/StatusSwitch'

import LineInput from '../components/LineInput'
import FamilyInput from '../components/FamilyInput'
import ResponsibleInput from '../components/ResponsibleInput'
import RegionalInput from '../components/RegionalInput'

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
  const {
    linesBuyers,
    handleRemoveLine,
    handleAddLine,
    disableButton,
    setDisabledButton
  } = useLinesBuyers()
  const [matrixCode, setMatrixCode] = useState('')

  const mockVoltage = useMemo(
    () => [
      { id: '110', name: '110' },
      { id: '220', name: '220' }
    ],
    []
  )

  const clientParams = useMemo(
    () => ({
      page: 1,
      pageSize: 10,
      clientRegistrationType: 'REGISTER'
    }),
    []
  )

  const setNameMatrix = useCallback(
    (value) => {
      formRef.current.setFieldValue('clientTotvsDescription', value)
      setMatrixCode(value.parentCompanyCode)
      if (!!value?.parentCompanyCode) setDisabledButton(false)
    },
    [formRef]
  )

  const setCodeMatrix = useCallback(
    (value) => {
      formRef.current.setFieldValue('clientTotvsCode', value)
      setMatrixCode(value.parentCompanyCode)
      if (!!value?.parentCompanyCode) setDisabledButton(false)
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
            onValueChange={(e) => setNameMatrix(e)}
            maxLength="9"
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
            onValueChange={(e) => setCodeMatrix(e)}
            maxLength="84"
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
        <Grid item sm={12} md={9}>
          <table className={classes.containerTable}>
            <thead>
              <tr className={classes.titleTable}>
                <th style={{ textAlign: 'center', paddingTop: '10px' }}>Linha</th>
                <th style={{ textAlign: 'center', paddingTop: '10px' }}>Família</th>
                <th style={{ textAlign: 'center', paddingTop: '10px' }}>Responsável</th>
                <th style={{ textAlign: 'center', paddingTop: '10px' }}>Regional</th>
              </tr>
            </thead>
            <tbody>
              {linesBuyers.map((lines, idx) => (
                <tr style={{}} key={idx}>
                  <td style={{ paddingTop: '10px', maxWidth: '100px' }}>
                    <LineInput
                      index={idx}
                      matrixCode={matrixCode}
                      isView={isView}
                      formRef={formRef}
                    />
                  </td>

                  <td style={{ paddingTop: '10px', maxWidth: '100px' }}>
                    <FamilyInput
                      index={idx}
                      matrixCode={matrixCode}
                      isView={isView}
                      formRef={formRef}
                    />
                  </td>

                  <td style={{ paddingTop: '10px', maxWidth: '100px' }}>
                    <ResponsibleInput
                      index={idx}
                      matrixCode={matrixCode}
                      formRef={formRef}
                      isView={isView}
                    />
                  </td>

                  <td style={{ paddingTop: '10px', maxWidth: '100px' }}>
                    <RegionalInput
                      index={idx}
                      matrixCode={matrixCode}
                      formRef={formRef}
                      isView={isView}
                    />
                  </td>

                  <td>
                    {!isDisabled &&
                      <Button variant='text' onClick={() => handleRemoveLine(idx)}>
                        X
                      </Button>
                    }

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <IconButton
            onClick={() => handleAddLine()}
            as={Button}
            size='small'
            variant='text'
            disabled={disableButton}
            startIcon={<Add />}
          >
            Nova Linha
          </IconButton>
        </Grid>
        <InputHidden name='linesFamilies' />
        <Grid item sm={12} md={3} className={classes.containerRadio}>
          <RadioGroup
            name='voltage'
            label={t('voltage', { howMany: 1 })}
            disabled={isDisabled}
            options={mockVoltage}
          />
        </Grid>
      </Grid >
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
