import React from 'react'
import MultiSelect from "react-multi-select-component";
import styled from 'styled-components'
import {SelectOption} from '../../types'

const StyledSelect = styled.div`
/*multi-select*/
.go2646822163 {
    --rmsc-radius: 50px !important;
    --rmsc-bg:#ECEFF1 !important;
    --rmsc-border: none !important;
    --rmsc-main: #AA00FF !important;
}
/*multi-select textfield*/
.go2642161244 {
    --rmsc-p: 20px !important;
}
/*multi-select drop-down*/
.go3425554998 {
  --rmsc-radius: 5px !important;
}
`

interface Props {
    options: SelectOption[],
    value: SelectOption[],
    labelledBy: string,
    onChange: any,
    disabled: boolean | undefined
}

export const Select:React.FC<Props> =({options, value, labelledBy, onChange, disabled}) => {
    return (
        <StyledSelect>
        <MultiSelect 
        options={options}
        value={value}
        labelledBy={labelledBy}
        onChange={onChange}
        disabled={disabled}
        />
        </StyledSelect>
    )
}

export const TextInput = styled.input`
box-sizing: border-box;
padding: 20px;
border-radius: 50px;
border-style: none;
background-color: #ECEFF1;
height: 38px;
color: #424242;
display: block;
transition: all 0.2s ease;
width: 243px;
:focus {
      outline: none;
    }
:focus-within {
    box-shadow: #AA00FF 0 0 0 1px;
    border-color: #AA00FF;
    }
`
export const Label = styled.div`
color: #9E9E9E;
`