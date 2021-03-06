import React, { useContext } from 'react';
import { Context } from '../index';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useHistory } from 'react-router-dom';
import { ADMIN_ROUTE, OVERVIEW_ROUTE } from '../utils/consts';
import { observer } from "mobx-react-lite";
import { Button } from 'react-bootstrap';
import { Container} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const NavBar =  observer(() => {
    const {user} = useContext(Context)
    const history = useHistory()
    return (
        <Navbar bg="primary" variant="dark">
            <Container>
                <NavLink style={{color:'white'}} to ={OVERVIEW_ROUTE}>StudentProgress</NavLink>      
                {user.isAuth ?
                    <Nav className="ml-auto" style={{color:'white'}}>
                        <Button 
                            variant= {"outline-light"} 
                            className="me-2" 
                            onClick={() => history.push(ADMIN_ROUTE)}
                            >
                                Управление
                            </Button>
                        <Button 
                            variant= {"outline-light"}
                            >
                                Выйти
                            </Button>  
                    </Nav>
                    :
                    <Nav className="ml-auto" style={{color:'white'}}>
                        <Button variant= {"outline-light"} onClick={() => user.setIsAuth(true)}>Авторизация</Button>
                    </Nav>
                    
                }
                    
            </Container>
           
        </Navbar>
    );
    
});

export default NavBar;

