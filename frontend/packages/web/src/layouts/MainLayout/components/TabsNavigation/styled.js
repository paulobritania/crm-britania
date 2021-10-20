import styled, { css } from 'styled-components'

import colors from '@britania-crm/styles/colors'

export const Container = styled.div`
  width: 100%; 
  height: 32px;
  display: flex;
  align-items: center;
`

export const Tab = styled.div`
  width: 0px;
  height: 32px;
  background: ${ colors.britSecondary.lighter };
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  border-radius: 10px;
  position: relative;
  opacity: 0;
  pointer-events: none;
  box-shadow: 4px 2px 10px rgba(0, 0, 0, 0.1);


  ${ (props) => props.show && css`
    opacity: 1;
    pointer-events: auto;
    min-width: 118px;
    white-space: nowrap;
  ` }

  & + div {
    margin-left: 8px;
  }

  &:before {
    content: '';
    width: 6px;
    height: 100%;
    border-radius: 10px 0px 0px 10px;
    background: ${ colors.primary.main };
    position: absolute;
  }

  > div {
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: 8px;

    > svg {
      color: ${ colors.primary.main } !important;
      fill: ${ colors.primary.main } !important;
    }

    > span {
      font-size: 12px;
      margin-left: 5px;
      color: ${ colors.black2 };
    }
  }

  > button {
    background: transparent;
    border: none;
    font-weight: bold;
    cursor: pointer;
    font-size: 10px;
    outline: none;  

    > svg {
      font-size: 12px !important;
    }
  }
`

export const HeaderContainer = styled.div`
  width: 100%;
  background: ${ colors.britSecondary.lighter };
  border-radius: 10px 10px 0px 0px;
  padding: 11px 16px 6px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 25px 25px 0px 0px;
  margin-bottom: -2px;
  cursor: move;

  > span {
    color: ${ colors.black2 };
    font-size: 14px;
    margin-left: 16px;
  }

  > div button {
    background: transparent;
    border: none;
    outline: none;
    cursor: pointer;
    color: ${ colors.black2 };

    &:first-child {
      svg {
        padding-bottom: 5px;
      }
    }

    > svg {
      font-size: 17px !important;
      font-weight: bold;
    }
  }
`

export const InputContainer = styled.div`
  display: flex;
  padding: 0px 16px 34px 16px;
  align-items: center;
  width: 100%;
  background: ${ colors.britSecondary.lighter };
  pointer-events: none;
  border-radius: 0px 0px 25px 25px;


  > textarea {
    resize: none;
    width: 100%;
    pointer-events: auto;
    padding: 16px;
    border-radius: 25px 25px 25px 25px;
    border: none;
    outline: none;
    color: #272B30;
    font-size: 14px;
  }
`

export const Wrapper = styled.div`
  & + div {
    margin-left: 10px;
  }
`
