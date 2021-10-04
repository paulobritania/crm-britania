import styled from 'styled-components'

import ElevatedButtonImage from '@britania-crm/styles/assets/images/elevated_styled_button.png'
import colors from '@britania-crm/styles/colors'

export const Image = styled.img.attrs({ src: ElevatedButtonImage })`
  display: inline-flex;
  width: 300px;
`

export const Wrapper = styled.a`
  cursor: pointer;
  display: inline-flex;
  position: relative;
  width: 300px;

  &:hover span {
    color: ${ colors.britPrimary2.dark };
  }
`

export const IconPlace = styled.div`
  display: inline-flex;
  position: absolute;
  width: 85px;
  left: 47.28px;
  top: 31.89px;
  z-index: 2;

  svg {
    color: ${ colors.britPrimary2.base };
  }
`

export const Label = styled.span`
  color: ${ colors.britPrimary2.base };
  display: inline-flex;
  font-weight: 600;
  position: absolute;
  top: 35px;
  left: 105px;
  width: 200px; 
  transition: 0.3s;
  z-index: 2;
`
