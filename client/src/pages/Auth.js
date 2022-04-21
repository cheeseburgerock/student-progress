import React from 'react';
import { Container } from 'react-bootstrap';
import { Card, Form, Button, Row } from 'react-bootstrap';
import {Context} from "../index";
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';



const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE



    return (
        <Container Container
        className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight - 54}}> 
              <Card style={{width: 550}} className="p-5">
                    <h2 className="m-auto">{isLogin ? 'Авторизация' : 'Регистрация'}</h2>
                    <Form className='d-flex flex-column'>
                        <Form.Control
                            className="mt-3"    
                            placeholder='Email'
                        />
                         <Form.Control
                            className="mt-3"
                            placeholder='Пароль'
                        />

                        {isLogin ?
                            <div></div>
                            :
                            <Form.Control
                            className="mt-3"
                            placeholder='ФИО'
                            /> 
                        }

                        {isLogin ?
                            <div></div>
                            :
                            <Form.Control
                            className="mt-3"
                            placeholder='Группа'
                            /> 
                        }


                        <Button className='mt-3'>
                            {isLogin ? 'Войти' : 'Зарегистрироваться'}
                        </Button>

                        <Row className="mt-3 align-self-end">
                            {isLogin ? 
                                <div>
                                Нет аккаунта? <NavLink to={REGISTRATION_ROUTE} >Зарегистрируйтесь</NavLink>
                                </div>
                            :
                                <div>
                                Есть аккаунт? <NavLink to={LOGIN_ROUTE} >Войдите</NavLink>
                                </div>
                            }
  
                        </Row>
                    </Form>
              </Card>
        </Container>
    );
};

export default Auth;