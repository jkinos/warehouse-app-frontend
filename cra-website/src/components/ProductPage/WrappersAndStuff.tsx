import styled from 'styled-components'

export const Container = styled.div`
padding: 3%;
`
export const Card = styled.div`
padding-bottom: 50px;
border-radius: 50px;
background-color:#fff;
box-shadow: 0 0 0 1px rgba(18,21,26,.04), 0 16px 32px 0 rgba(18,21,26,.12);
`
export const FilterSection = styled.div`
padding: 4vmin;
padding-bottom: 8vmin;
display: flex; 
flex-direction: column;
`
export const FilterInputsContainer = styled.div`
display: flex;
flex-flow: row wrap;
justify-content: space-around;
align-items: flex-end;
gap: .7rem;
padding-bottom: 5vmin;
padding-top: 5vmin;

`
export const ButtonContainer = styled.div`
display: flex;
flex-flow: row nowrap;
justify-content: center;
gap: 3%;
`
export const UpdateTime = styled.p`
color: #616161;
`
export const Heading = styled.h1`
font-size: calc(16px + 3vmin);
text-align: center;
padding-top: 8vmin;
span {
    color:  #AA00FF;
    font-size: calc(32px + 3vmin);
}
`