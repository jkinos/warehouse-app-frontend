import React from 'react'
import Nav from 'react-bootstrap/Nav'
import { Link } from "react-router-dom";
import styled from 'styled-components'

const StyledNavBar = styled.div`
background-color:#AA00FF;
box-shadow: 0 0 0 1px rgba(18,21,26,.04),0 16px 32px 0 rgba(18,21,26,.12);

.nav {
.nav-link {
  font-size: calc(10px + 2vmin);
  color:#FAFAFA;
  background-color:#AA00FF;
  font-weight: 600;
}
.nav-link.active {
    background-color:#ECEFF1  ;
    border-color: #ECEFF1;
    color:#212121;
    font-weight: 800;
    }

}
  

`
const NavBar = () =>  {
    return(
        <StyledNavBar>
            <Nav fill variant="pills">
                <Nav.Item>
                    <Nav.Link as={Link} eventKey="link-0" to='/'>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} eventKey="link-1" to='/jackets'>Jackets</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} eventKey="link-2" to='/shirts'>Shirts</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link as={Link} eventKey="link-3" to='/accessories'>Accessories</Nav.Link> 
                </Nav.Item>
            </Nav>
        </StyledNavBar>
    )
}
export default NavBar