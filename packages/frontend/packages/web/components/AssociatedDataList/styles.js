import styled from 'styled-components'

import colors from '@britania-crm/styles/colors'

export const Container = styled.div`
  background: ${ colors.white };
  border: 1px solid ${ ({ error }) => error ? colors.error.main : colors.britSupport1.light };
  border-radius: 16px;
  width: ${ (props) => props.width ? `${ props.width }px` : '100%' };
  position: relative;
  margin: 16px 8px;

  > label {
    font-size: 10px;
    padding: 6px; 
    background: ${ colors.white };
    position: absolute;
    margin-top: -14px;
    margin-left: 10px;
    color: ${ ({ error }) => error ? colors.error.main : colors.text };
  }
  
  > p {
    margin-left: 10px;
    color: ${ ({ error }) => error ? colors.error.main : colors.text };
  }
`
export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 14px 0px 14px 16px;
  grid-row-gap: 14px;

  > span {
    color: ${ colors.grey3 };
    border-bottom: 1px solid ${ colors.britSupport2.light };
    padding-bottom: 4px;
    width: 192px;
    padding-left: 20px;
  }
`
