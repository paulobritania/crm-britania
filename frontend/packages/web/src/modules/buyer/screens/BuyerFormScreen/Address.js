import React, { useCallback } from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { useT } from '@britania-crm/i18n'
import InputCEP from '@britania-crm/web-components/InputCEP'
import InputNumber from '@britania-crm/web-components/InputNumber'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'
import Checkbox from '@britania-crm/web-components/Checkbox'

import { useStyles } from './styles'

const AddressBuyer = ({
  title,
  formRef,
  isDisabled,
  stateOptions,
  objFather,
  otherObj
}) => {
  const t = useT()
  const classes = useStyles()

  const handleChangeCheck = useCallback(
    (e) => {
      formRef.current.setFieldValue(
        `${objFather}.deliveryAddress`,
        !!e.target.value
      )
      formRef.current.setFieldValue(
        `${otherObj}.deliveryAddress`,
        !e.target.value
      )
    },
    [formRef]
  )

  const handleChangeCep = useCallback(
    (values) => {
      formRef.current.setData({
        [objFather]: {
          ...values,
          district: values.neighborhood,
          uf: values.state
        }
      })
    },
    [formRef, objFather]
  )

  return (
    <Grid container spacing={1} className={classes.containerMain}>
      <Grid item className={classes.header} sm={12}>
        <Typography className={classes.title}>{title}</Typography>
      </Grid>
      <Grid item sm={4}>
        <InputCEP
          name='cep'
          label='CEP'
          disabled={isDisabled}
          onAddressChange={handleChangeCep}
        />
      </Grid>
      <Grid item sm={8}>
        <InputText
          name='street'
          label={t('public place', { howMany: 1 })}
          disabled={isDisabled}
          maxLength={71}
        />
      </Grid>
      <Grid item sm={4}>
        <InputNumber
          name='number'
          label={t('number', { howMany: 1 })}
          disabled={isDisabled}
          maxLength={11}
        />
      </Grid>
      <Grid item sm={8}>
        <InputText
          name='complement'
          label={t('complement', { howMany: 1 })}
          disabled={isDisabled}
          maxLength={71}
        />
      </Grid>
      <Grid item sm={5}>
        <InputText
          name='city'
          label={t('city', { howMany: 1 })}
          disabled={isDisabled}
          maxLength={41}
        />
      </Grid>
      <Grid item sm={5}>
        <InputText
          name='district'
          label={t('district', { howMany: 1 })}
          disabled={isDisabled}
          maxLength={41}
        />
      </Grid>
      <Grid item sm={2}>
        <InputSelect
          name='state'
          label='UF'
          valueKey='sigla'
          idKey='sigla'
          options={stateOptions}
          disabled={isDisabled}
        />
      </Grid>
      <Grid item sm={12}>
        <Checkbox
          disabled={isDisabled}
          name='deliveryAddress'
          color='primary'
          label={t('use as delivery address')}
          onChange={(e) => handleChangeCheck(e)}
        />
      </Grid>
    </Grid>
  )
}

AddressBuyer.propTypes = {
  title: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  formRef: PropTypes.any.isRequired,
  stateOptions: PropTypes.array.isRequired,
  objFather: PropTypes.string.isRequired
}

export default AddressBuyer
