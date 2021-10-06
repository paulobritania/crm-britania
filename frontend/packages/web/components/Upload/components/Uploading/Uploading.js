import React from 'react'

import PropTypes from 'prop-types'

import Button from '@material-ui/core/Button'

import colors from '@britania-crm/styles/colors'

import { useFile } from '../../context/Files'
import Spinner from '../Spinner'

const Uploading = ({ uploadPercentage }) => {
  const { cancelUpload } = useFile()

  return (
    <>
      <Spinner value={ uploadPercentage } />

      <p style={ { color: `${ colors.britSupport1.light }`, fontSize: '16px' } }>Enviando imagem...</p>

      <Button
        variant="outlined"
        color="secondary"
        onClick={ () => cancelUpload() }
      >
        <p style={ {
          fontSize: '14px',
          fontWeight: 'normal'
        } }
        >
          Cancelar envio
        </p>
      </Button>
    </>
  )
}

Uploading.propTypes = { uploadPercentage: PropTypes.number.isRequired }

export default Uploading
