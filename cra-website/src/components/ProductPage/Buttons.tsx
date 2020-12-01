import styled from 'styled-components'

export const Button =styled.button`
border-radius: 50px;
background-color: #AA00FF;
border-style: none;
padding-left: 20px;
padding-right:20px;
color:#FAFAFA;
white-space: nowrap;
line-height: 40px;
font-weight: 500;
font-size: calc(9px + 1vmin);
width: 10em;
`
export const ButtonOutlined = styled(Button)`
background-color: #fff;
border: solid 2px  #AA00FF;
color:#212121;
`
export const ClearButton = styled(ButtonOutlined)``

export const FilterButton = styled(Button)`
`