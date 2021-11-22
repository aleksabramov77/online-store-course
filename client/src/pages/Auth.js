import React from 'react'
import Container from 'react-bootstrap/cjs/Container'
import Card from 'react-bootstrap/cjs/Card'
import Form from 'react-bootstrap/cjs/Form'
import Button from 'react-bootstrap/cjs/Button'
import Row from 'react-bootstrap/cjs/Row'
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts'
import { NavLink, useLocation } from 'react-router-dom'
import Col from 'react-bootstrap/cjs/Col'

const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE
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
                        />
                    </Form.Group>

                    <Form.Group controlId='authPassword'>
                        <Form.Control
                            type='password'
                            className="mt-3"
                            placeholder="Введите ваш пароль ..."
                        />
                    </Form.Group>
                        <Row className="mt-3 align-items-center">
                            <Col md='auto' className="flex-grow-1 ">
                                {isLogin
                                ? <>Нет аккаунта? <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйся</NavLink></>
                                : <>Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите</NavLink></>
                                }                            </Col>
                            <Col className="text-end">
                                <Button type='button' variant="outline-success">
                                    {isLogin ? "Войти": "Регистрация"}
                                </Button>
                            </Col>
                        </Row>
                </Form>

            </Card>
        </Container>

    )
}

export default Auth