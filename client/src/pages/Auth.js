import React, { useContext, useState } from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/consts'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { login, registration } from '../http/userAPI'
import { observer } from 'mobx-react-lite'
import { Context } from '../index'

const Auth = observer(() => {
    const {user} = useContext(Context)
    const location = useLocation()
    const navigate = useNavigate()
    const isLogin = location.pathname === LOGIN_ROUTE
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const click = async () => {
        try {
            const data = isLogin
                ? await login(email, password)
                : await registration(email, password)
            user.setUser(true)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)
        }catch (e) {
            alert(e.response.data.message)
        }
    }

    return (
        <Container
            className="d-flex justify-content-center align-items-center"
            style={{ height: window.innerHeight - 56 }}
        >
            <Card style={{ width: 600 }} className="p-5">
                <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                <Form className="d-flex flex-column">

                    <Form.Group controlId='authEmail'>
                        <Form.Control
                            type='email'
                            className="mt-3"
                            placeholder="Введите ваш email ..."
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId='authPassword'>
                        <Form.Control
                            type='password'
                            className="mt-3"
                            placeholder="Введите ваш пароль ..."
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </Form.Group>
                    <Row className="mt-3 align-items-center">
                        <Col
                            md='auto'
                            className="flex-grow-1 w-auto">
                            {isLogin
                                ? <>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся</NavLink></>
                                : <>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink></>
                            }                            </Col>
                        <Col className="text-end">
                            <Button
                                type='button' variant="outline-success"
                            onClick={click}
                            >
                                {isLogin ? 'Войти' : 'Регистрация'}
                            </Button>
                        </Col>
                    </Row>
                </Form>

            </Card>
        </Container>

    )
})

export default Auth