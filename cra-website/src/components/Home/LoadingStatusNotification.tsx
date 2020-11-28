import React from 'react'
import {ProductProps} from '../../types'
import Alert from 'react-bootstrap/Alert'
import styled from 'styled-components'

export const AlertContainer = styled.div`
display: flex;
flex-flow: column nowrap;
justify-content: center;
align-items: center;
padding: 20%;
padding-top:10%;
min-height:100vh;
.alert {
  width: 100%;
}
`
export const LoadingStatusAlert: React.FC<ProductProps> = ({content,category}) => {

    const errorHeading = `Error, could not load ${category}`
    const errorBody = `Refetching ${category} now...`
    const loadingHeading = `Loading category ${category}...`
    const loadingBody = 'This might take a moment'
    const successHeading = `Successfully updated category ${category}`
    const successBody = `You can now browse ${category} at page ${category}`
    const successFooter = `Updated: ${content.updateTime}`

    return (
    <>
    {content.error && 
    <Alert variant='warning'>
        <Alert.Heading>{errorHeading}</Alert.Heading>
        <p>{errorBody}</p>
    </Alert>}

    {content.loading && 
    <Alert variant='info'>
        <Alert.Heading>{loadingHeading}</Alert.Heading>
        <p>{loadingBody}</p>
    </Alert>}

    {content.response && 
    <Alert variant='success'>  
        <Alert.Heading>{successHeading}</Alert.Heading>
        <p>{successBody}</p>
        <hr />
        <p className="mb-0">{successFooter}</p>
    </Alert>}
</>)
}
