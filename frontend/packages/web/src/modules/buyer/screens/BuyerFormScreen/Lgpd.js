import React, { useCallback, useMemo, useState } from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import UploadImage from '@britania-crm/web-components/UploadImage'
import InputHidden from '@britania-crm/web-components/InputHidden'

import { useT } from '@britania-crm/i18n'

import { useStyles } from './styles'

const Lgpd = () => {
  const t = useT()
  const classes = useStyles()

  return (
    <Grid container spacing={1} className={classes.containerMain}>
      <Grid item className={classes.header} sm={12}>
        <Typography className={classes.title}>LGPD</Typography>
      </Grid>
      <Grid item sm={12} className={classes.flexContainer}>
        <Grid item sm={8} className={classes.lgpdTitle}>
          Você só poderá seguir com o cadastro se adicionar o documento de
          consentimento do Comprador.
          <ul className={classes.lgpdText}>
            <li>
              Recomendação: Use arquivos .jpg de alta qualidade, PDF ou .docx.
            </li>
            <li>Tamanho máximo: 20MB</li>
          </ul>
        </Grid>
        <Grid item sm={4} className={classes.upload}>
          <UploadImage
            detached
            name='file'
            title={t('login image add new file message')}
            description={''}
            types={[
              'image/jpg',
              'image/jpeg',
              'application/pdf',
              '.doc',
              '.docx'
            ]}
          />
          <InputHidden name='path' />
        </Grid>
      </Grid>
    </Grid>
  )
}

Lgpd.propTypes = {
  modeView: PropTypes.bool.isRequired,
  isEdit: PropTypes.bool.isRequired,
  isView: PropTypes.bool.isRequired,
  formRef: PropTypes.any.isRequired
}

export default Lgpd
