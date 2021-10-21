import React, { useCallback, useMemo, useState } from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import UploadImage from '@britania-crm/web-components/UploadImage'
import Button from '@britania-crm/web-components/Button'

import Attach from '@britania-crm/web-components/Icons/Attach'

import { useT } from '@britania-crm/i18n'

import { useStyles } from './styles'

const Lgpd = ({ formRef }) => {
  const t = useT()
  const classes = useStyles()
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState('')

  const handleRemoveFile = useCallback(() => {
    formRef.current.setFieldValue('imageFile', null)
    setFileName('')
    setFileSize('')
  }, [])

  const handleNameFile = useCallback(({ name, size }) => {
    setFileName(name)
    setFileSize(size)
  }, [])

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

        {fileName ? (
          <Grid item sm={12} md={6} className={classes.hasFile}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Attach size={24} />
              <p>{fileName}</p>
              <span>{fileSize} Kb</span>
            </div>
            <Button
              variant='text'
              onClick={handleRemoveFile}
              style={{ fontSize: 16, color: '#8492a6' }}
            >
              x
            </Button>
          </Grid>
        ) : (
          <Grid item sm={6} md={6} className={classes.upload}>
            <UploadImage
              style={{ marginTop: 30 }}
              name='imageFile'
              title={t('login image add new file message')}
              description={''}
              types={[
                'image/jpg',
                'image/jpeg',
                'application/pdf',
                '.doc',
                '.docx'
              ]}
              onValueChange={handleNameFile}
            />
          </Grid>
        )}
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
