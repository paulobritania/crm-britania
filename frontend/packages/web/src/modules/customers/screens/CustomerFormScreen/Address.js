import React from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { useT } from '@britania-crm/i18n'
import CustomAccordion from '@britania-crm/web-components/CustomAccordion'
import InputCEP from '@britania-crm/web-components/InputCEP'
import InputNumber from '@britania-crm/web-components/InputNumber'
import InputPhone from '@britania-crm/web-components/InputPhone'
import InputSelect from '@britania-crm/web-components/InputSelect'
import InputText from '@britania-crm/web-components/InputText'

import useStyles from './styles'

const Address = ({
  title,
  isDisabled,
  getNewAddress,
  stateOptions,
  handleDocumentation,
  emailTitle,
  phoneTitle
}) => {
  const t = useT()
  const classes = useStyles()

  return (
    <CustomAccordion header={ title } handleInfo={ handleDocumentation } >
      <Grid container item spacing={ 1 } sm={ 12 } className={ classes.containerMain }>
        <Grid item sm={ 12 } md={ 4 }>
          <InputCEP
            name="zipCode"
            label="CEP"
            disabled={ isDisabled }
            onAddressChange={ getNewAddress }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputText
            name="publicPlace"
            label={ t('public place', { howMany: 1 }) }
            disabled={ isDisabled }
            maxLength={ 71 }
            touchOnChange
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputNumber
            name="number"
            label={ t('number', { howMany: 1 }) }
            disabled={ isDisabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputText
            name="district"
            label={ t('district', { howMany: 1 }) }
            disabled={ isDisabled }
            maxLength={ 41 }
            touchOnChange
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputText
            name="complement"
            label={ t('complement', { howMany: 1 }) }
            disabled={ isDisabled }
            maxLength={ 71 }
            touchOnChange
          />
        </Grid>
        <Grid item sm={ 12 } md={ 4 }>
          <InputText
            name="city"
            label={ t('city', { howMany: 1 }) }
            disabled={ isDisabled }
            maxLength={ 41 }
            touchOnChange
          />
        </Grid>
        <Grid item sm={ 12 } md={ 1 }>
          <InputSelect
            name="state"
            label="UF"
            valueKey="sigla"
            idKey="sigla"
            options={ stateOptions }
            disabled={ isDisabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <InputText
            name="country"
            label={ t('country', { howMany: 1 }) }
            disabled={ isDisabled }
            maxLength={ 41 }
            touchOnChange
          />
        </Grid>
        <Grid item sm={ 12 } md={ 3 }>
          <InputPhone
            name="phone"
            label={ phoneTitle }
            disabled={ isDisabled }
          />
        </Grid>
        <Grid item sm={ 12 } md={ 5 }>
          <InputText
            name="email"
            label={ emailTitle }
            disabled={ isDisabled }
          />
        </Grid>
      </Grid>
    </CustomAccordion>
  )
}

Address.propTypes = {
  title: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  getNewAddress: PropTypes.func.isRequired,
  stateOptions: PropTypes.array.isRequired,
  handleDocumentation: PropTypes.func,
  emailTitle: PropTypes.string.isRequired,
  phoneTitle: PropTypes.string.isRequired
}

Address.defaultProps = { handleDocumentation () {} }

export default Address
