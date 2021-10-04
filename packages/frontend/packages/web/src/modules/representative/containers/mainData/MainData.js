import React, { useCallback } from 'react'

import { Scope } from '@unform/core'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { useT } from '@britania-crm/i18n'
import InputCEP from '@britania-crm/web-components/InputCEP'
import InputCpfCnpj from '@britania-crm/web-components/InputCpfCnpj'
import InputNumber from '@britania-crm/web-components/InputNumber'
import InputPhone from '@britania-crm/web-components/InputPhone'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputStateRegistration from '@britania-crm/web-components/InputStateRegistration'
import InputText from '@britania-crm/web-components/InputText'

import useStyles from '../styles'

const MainData = ({
  getFieldAddress,
  state,
  setCurrentState,
  disabled,
  stateOptions,
  formRef
}) => {
  const t = useT()
  const classes = useStyles()

  const handleChangeState = useCallback(
    (newState, fieldMounted) => {
      setCurrentState(newState)
      if (fieldMounted) {
        formRef.current.validateField('stateRegistration')
      }
    },
    [formRef, setCurrentState]
  )

  return (
    <Grid container spacing={ 1 } className={ classes.containerMain }>
      <Grid item xs={ 12 } md={ 4 }>
        <InputText
          name="companyName"
          label={ t('company name') }
          disabled={ disabled }
          maxLength={ 71 }
        />
      </Grid>
      <Grid item xs={ 12 } md={ 4 }>
        <InputCpfCnpj
          name="cnpj"
          label="CNPJ"
          mode="cnpj"
          disabled={ disabled }
        />
      </Grid>
      <Grid item xs={ 12 } md={ 4 }>
        <InputText
          name="contactName"
          label={ t('name representative') }
          disabled={ disabled }
          maxLength={ 31 }
        />
      </Grid>
      <Grid item xs={ 12 } md={ 3 }>
        <InputStateRegistration
          name="stateRegistration"
          label={ t('state registration') }
          state={ state }
          disabled={ disabled }
          maxLength={ 15 }
        />
      </Grid>
      <Grid item xs={ 12 } md={ 3 }>
        <InputText
          name="suframa"
          label={ t('suframa') }
          disabled={ disabled }
          maxLength={ 14 }
        />
      </Grid>
      <Grid item xs={ 12 } md={ 3 }>
        <InputPhone
          name="commercialPhone"
          label={ t('commercial phone') }
          disabled={ disabled }
        />
      </Grid>
      <Grid item xs={ 12 } md={ 3 }>
        <InputPhone
          name="billingPhone"
          label={ t('billing phone') }
          disabled={ disabled }
        />
      </Grid>
      <Grid item xs={ 12 } md={ 3 }>
        <InputPhone
          name="cellphone"
          label={ t('cell {this}', { this: t('phone', { howMany: 1 }) }) }
          disabled={ disabled }
        />
      </Grid>
      <Grid item xs={ 12 } md={ 3 }>
        <InputText
          name="email"
          label={ t('email') }
          disabled={ disabled }
        />
      </Grid>
      <Grid item xs={ 12 } md={ 3 }>
        <InputText
          name="site"
          label="Site"
          disabled={ disabled }
          maxLength={ 41 }
        />
      </Grid>
      <Scope path="address">
        <Grid item sm={ 2 }>
          <InputText
            name="country"
            label={ t('country', { howMany: 1 }) }
            disabled={ disabled }
            maxLength={ 41 }
          />
        </Grid>
        <Grid item sm={ 2 }>
          <InputCEP
            name="cep"
            label="CEP"
            onAddressChange={ getFieldAddress }
            disabled={ disabled }
          />
        </Grid>
        <Grid item sm={ 2 }>
          <InputSelect
            name="state"
            label="UF"
            valueKey="sigla"
            idKey="sigla"
            options={ stateOptions }
            disabled={ disabled }
            onValueChange={ handleChangeState }
          />
        </Grid>
        <Grid item sm={ 6 }>
          <InputText
            name="city"
            label={ t('city', { howMany: 1 }) }
            disabled={ disabled }
            maxLength={ 41 }
          />
        </Grid>
        <Grid item sm={ 3 }>
          <InputText
            name="district"
            label={ t('district', { howMany: 1 }) }
            disabled={ disabled }
            maxLength={ 41 }
          />
        </Grid>
        <Grid item sm={ 4 } >
          <InputText
            name="street"
            label={ t('public place', { howMany: 1 }) }
            disabled={ disabled }
            maxLength={ 71 }
          />
        </Grid>
        <Grid item sm={ 2 } >
          <InputNumber
            name="number"
            label={ t('number', { howMany: 1 }) }
            disabled={ disabled }
            maxLength={ 11 }
          />
        </Grid>
        <Grid item sm={ 3 }>
          <InputText
            name="complement"
            label={ t('complement', { howMany: 1 }) }
            disabled={ disabled }
            maxLength={ 71 }
          />
        </Grid>
      </Scope>
    </Grid>
  )
}

MainData.propTypes = {
  state: PropTypes.string,
  setCurrentState: PropTypes.func,
  getFieldAddress: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  stateOptions: PropTypes.array.isRequired,
  formRef: PropTypes.any.isRequired
}

MainData.defaultProps = { state: '', setCurrentState () {} }

export default MainData
