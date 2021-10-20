import React, { useCallback } from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { useT } from '@britania-crm/i18n'
import CustomAccordion from '@britania-crm/web-components/CustomAccordion'
import InputCEP from '@britania-crm/web-components/InputCEP'
import InputNumber from '@britania-crm/web-components/InputNumber'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'

import useStyles from './styles'

const AddressBuyer = ({
  title,
  formRef,
  isDisabled,
  stateOptions,
  objFather
}) => {
  const t = useT()
  const classes = useStyles()

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
    <CustomAccordion header={ title }>
      <Grid container spacing={ 1 } className={ classes.containerMain }>
        <Grid item sm={ 2 }>
          <InputCEP
            name="cep"
            label="CEP"
            disabled={ isDisabled }
            onAddressChange={ handleChangeCep }
          />
        </Grid>
        <Grid item sm={ 2 }>
          <InputSelect
            name="uf"
            label="UF"
            valueKey="sigla"
            idKey="sigla"
            options={ stateOptions }
            disabled={ isDisabled }
          />
        </Grid>
        <Grid item sm={ 4 }>
          <InputText
            name="city"
            label={ t('city', { howMany: 1 }) }
            disabled={ isDisabled }
            maxLength={ 41 }
          />
        </Grid>
        <Grid item sm={ 4 }>
          <InputText
            name="district"
            label={ t('district', { howMany: 1 }) }
            disabled={ isDisabled }
            maxLength={ 41 }
          />
        </Grid>
        <Grid item sm={ 4 } >
          <InputText
            name="street"
            label={ t('public place', { howMany: 1 }) }
            disabled={ isDisabled }
            maxLength={ 71 }
          />
        </Grid>
        <Grid item sm={ 4 } >
          <InputNumber
            name="number"
            label={ t('number', { howMany: 1 }) }
            disabled={ isDisabled }
            maxLength={ 11 }
          />
        </Grid>
        <Grid item sm={ 4 } >
          <InputText
            name="complement"
            label={ t('complement', { howMany: 1 }) }
            disabled={ isDisabled }
            maxLength={ 71 }
          />
        </Grid>
      </Grid>
    </CustomAccordion>
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
