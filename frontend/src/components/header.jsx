import React from 'react'
import {useSelector} from 'react-redux'
import {Badge,Navbar,Nav,Container, NavbarBrand, NavbarToggle, NavbarCollapse, NavLink} from 'react-bootstrap'
import {FaShoppingCart,FaUser} from 'react-icons/fa'

import logo from '../assets/logov3.png'
import {LinkContainer} from 'react-router-bootstrap'



const Header = () => {

  const {cartItems} = useSelector((state) => state.cart)
  
  return (
    
    <header>

      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to = '/'>
        <NavbarBrand>
        <img src={logo} alt='Apple-Shop' height={100} width={100}></img>
        Apple-Shop</NavbarBrand>
        </LinkContainer>
        <NavbarToggle aria-controls="basic-navbar-nav"></NavbarToggle>
        <NavbarCollapse id="basic-navbar-nav">
          <Nav className='ms-auto'>
            <LinkContainer to ='/cart'> 
            <NavLink >
              <FaShoppingCart />Cart
              {cartItems.length > 0 && (
                <Badge pill bg='success' style={{marginLeft:'5px'}}>
                  {cartItems.reduce((acc,item) => acc + item.qty,0)}
                </Badge>
              )}
              </NavLink>
            </LinkContainer>

            <LinkContainer to = '/login'>
            <NavLink ><FaUser/>Sign In</NavLink>
            </LinkContainer>
           
      
          </Nav>
        </NavbarCollapse>
        </Container>

      </Navbar>
    </header>
  )
}

export default Header