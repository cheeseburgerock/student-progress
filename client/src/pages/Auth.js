import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { Card, Form, Button, Row } from 'react-bootstrap';
import {Context} from "../index";
import 'bootstrap/dist/css/bootstrap.css';
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE } from '../utils/consts';
import { firestore, auth } from '../api/firebase';
import {
    useCollection,
    useDocument,
    useDocumentData,
  } from 'react-firebase-hooks/firestore';
import {
    addDoc,
    collection,
    doc,
    documentId,
    getDoc,
    orderBy,
    query,
    where,
} from 'firebase/firestore';
import { createAuth, signIn, signOutUser } from '../api/auth';
import { useAuthState } from 'react-firebase-hooks/auth';

    


const Auth = () => {
    const location = useLocation()
    const isLogin = location.pathname === LOGIN_ROUTE

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const loginHandler = async () =>  {
        /* event.preventDefault(); */
         await signIn(login, password).then(v => window.open('/'));
        /* signInn.isComplete && window.open('/'); */
        
    };

    const registerHandler = async () => {
        /* event.preventDefault(); */
        await createAuth(login, password).then(v => loginHandler());
    };

    const [user] = useAuthState(auth)               //user.uid  ====>   Получить 
    

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
                            id="login"
                            onChange= {e => setLogin(e.target.value)}
                        />
                         <Form.Control
                            className="mt-3"
                            placeholder='Пароль'
                            type= 'password'
                            id="password"
                            onChange= {e => setPassword(e.target.value)}
                        />

                       {/*  {isLogin ?
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
                        } */}

                        
                        <div className='mt-3' >
                            {isLogin ? 
                                <div className='d-flex flex-column' >
                                    <Button onClick={e => loginHandler()}>
                                        Войти
                                    </Button>
                                </div>
                            :
                                <div className='d-flex flex-column'>
                                    <Button onClick={e => registerHandler()}>
                                        Зарегистрироваться
                                    </Button>
                                </div>
                            }
                        </div>


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