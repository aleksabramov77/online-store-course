import React, { useContext } from 'react'
import { Context } from '../index'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/consts'
import Button from 'react-bootstrap/cjs/Button'
import { observer } from 'mobx-react-lite'
import Container from 'react-bootstrap/Container'
import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const NavBar = observer(() => {
    const { user } = useContext(Context)
    const navigate = useNavigate()
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
                            onClick={()=>navigate(ADMIN_ROUTE)}
                            variant='outline-light'
                        >
                            Админ Панель
                        </Button>
                        <Button
                            onClick={()=>navigate(LOGIN_ROUTE)}
                            variant='outline-light'
                            className='ms-2'
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