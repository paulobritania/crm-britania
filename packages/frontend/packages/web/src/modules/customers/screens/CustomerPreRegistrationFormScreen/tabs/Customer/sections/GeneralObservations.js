import React from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { Scope } from '@britania-crm/forms'
import { useT } from '@britania-crm/i18n'
import TextArea from '@britania-crm/web-components/TextArea'

import useStyles from '../styles'

const GeneralObservations = ({ disabled }) => {
  const t = useT()
  const classes = useStyles()

  return (
    <Scope path="additionalInformation">
      <Grid container spacing={ 1 } className={ classes.container }>
        <Grid item sm={ 12 } md={ 12 }>
          <TextArea
            name="observation"
            label={ t('observation', { howMany: 2 }) }
            readOnly={ disabled }
            rows={ 3 }
          />
        </Grid>
      </Grid>
    </Scope>
  )
}

GeneralObservations.propTypes = {
  // formRef: PropTypes.any.isRequired,
  disabled: PropTypes.bool.isRequired
}

export default GeneralObservations
