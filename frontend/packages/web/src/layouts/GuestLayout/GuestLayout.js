import React, { useMemo } from 'react'

import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'

import { administration } from '@britania-crm/services/apis/crmApi/resources/routes'
import useCrmApi from '@britania-crm/services/hooks/useCrmApi'
import guestBackground from '@britania-crm/styles/assets/images/default_login_bg.svg'
import { useImageLoaded } from '@britania-crm/utils/files'

import {
  Container,
  Banner,
  Border,
  Content,
  Box
} from './styles'

const GuestLayout = ({ children }) => {
  const { data } = useCrmApi(administration.loginImage, { responseType: 'blob' })

  const hasImage = useMemo(
    () => data ? data?.size > 0 : null,
    [data]
  )

  const imageUrl = useMemo(
    () => hasImage && URL.createObjectURL(data),
    [data, hasImage]
  )

  const imageLoaded = useImageLoaded({ src: imageUrl })

  const image = useMemo(
    () => {
      if (hasImage === null) {
        return undefined
      }

      if (imageUrl && imageLoaded) {
        return imageUrl
      }
      return guestBackground
    },
    [hasImage, imageLoaded, imageUrl]
  )

  return (
    <Container>

      <Grid item xs={ 12 } sm={ 12 } md={ 7 } lg={ 8 }>
        <Banner bgImage={ image }/>
      </Grid>

      <Grid item xs={ 12 } sm={ 12 } md={ 5 } lg={ 4 }>
        <Box>
          <Border />
          <Content>
            {children}
          </Content>
        </Box>
      </Grid>

    </Container>
  )
}

GuestLayout.propTypes = { children: PropTypes.any }

GuestLayout.defaultProps = { children: null }

export default GuestLayout
