import styled from 'styled-components'

import colors from '@britania-crm/styles/colors'

export const Container = styled.div`
  width: ${ (props) => props.full ? '1000px' : '444px' };
  height: 100%;
  /* background-color: red;  */

  background: ${ colors.white };
  border-radius: 16px;

  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
`

export const ColoredBar = styled.div`
  position: absolute;
  height: 35px;
  display: flex;
  align-items: center;
  margin: 12px 0;

  ::before {
    width: 4px;
    height: 35px;

    display: block;
    content: "";

    margin-right: 10px;

    background: ${ (props) => props.color };
    border-radius: 0px 4px 4px 0px;
  }
`

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: ${ (props) => props.align };

  padding: 5px 0 5px 50px;

  width: 100%;
`

export const Title = styled.span`
  font-weight: 400;
  font-size: 12px;
  color: ${ (props) => props.color };
  margin-bottom: 5px;
`
