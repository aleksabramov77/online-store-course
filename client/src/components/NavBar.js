import React, { useContext } from 'react'
import { Context } from '../index'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { DEVICE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import Button from 'react-bootstrap/cjs/Button'
import { observer } from 'mobx-react-lite'
import Container from 'react-bootstrap/cjs/Container'
import { NavLink } from 'react-router-dom'
// import NavLink from 'react-bootstrap/NavLink'

const NavBar = observer(() => {
    const { user } = useContext(Context)
    return (
        <Navbar className="d-flex px-2" bg="dark" variant="dark">
            <Container>
                <NavLink
                    to={SHOP_ROUTE}
                    style={{color:'white', textDecoration:'none'}}
                >
                    КупиДевайс
                </NavLink>
                {user.isAuth ?
                    <Nav>
                        <Button
                            variant='outline-light'
                        >
                            Админ Панель
                        </Button>
                        <Button
                            variant='outline-light'
                            className='ms-2'
                            onClick={() => user.setAuth(false)}

                        >
                            Выйти
                        </Button>
                    </Nav>
                    :
                    <Nav>
                        <Button
                            variant='outline-light'
                            onClick={() => user.setAuth(true)}
                        >
                            Авторизация
                        </Button>
                    </Nav>
                }
            </Container>


            {/*<Nav.Link href={SHOP_ROUTE}>Shop</Nav.Link>*/}
            {/*<Nav.Link href={LOGIN_ROUTE}>Login</Nav.Link>*/}
            {/*<Nav.Link href={REGISTRATION_ROUTE}>Registration</Nav.Link>*/}
            {/*<Nav.Link*/}
            {/*    href={DEVICE_ROUTE}*/}
            {/*    className=""*/}

            {/*>Device</Nav.Link>*/}
        </Navbar>

    )
})

export default NavBar