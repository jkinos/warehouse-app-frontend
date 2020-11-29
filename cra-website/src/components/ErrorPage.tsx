import React from 'react'
import styled from 'styled-components'
import image404 from  '../assets/undraw_not_found_60pq.svg'
import {Link} from 'react-router-dom'

const Img = styled.img`
width: 70vmin;
padding: 3%;
padding-top: 0;
`
const Wrapper = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
height: 100vh;
background-color: #fff;
`
const LinksWrapper = styled.div`
display: flex;
flex-direction: row;
justify-content: space-around;
align-items: center;
width: 70vmin;
`
const StyledLink = styled(Link)`
color: #AA00FF;
`

const ErrorPage = () => {
    return (
        <>
        <Wrapper>
            <Img src={image404} alt=''/>
            <h1>Oops!</h1>
            <h2>Page not Found</h2>
            <p>Did you want:
            </p>
            <LinksWrapper>
            <StyledLink to="/">Home</StyledLink>
            <StyledLink to="/jackets">Jackets</StyledLink>
            <StyledLink to="/shirts">Shirts</StyledLink>
            <StyledLink to="/accessories">Accessories</StyledLink>
            </LinksWrapper>
        </Wrapper>
        </>
    )
}

export default ErrorPage