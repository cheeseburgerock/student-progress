import React from 'react';
import { Button, Card, Col, Container, Form, Nav, Row } from 'react-bootstrap';
import grayBackground from '../assets/grayBackground.png'

const Admin = () => {
    return (
        <Container> 
           <Card style={{ background: `url(${grayBackground})`, height: 150, width: 1280}} className='m-auto'>
                
                <div className='mt-5 p-4'>
                    <h1 style={{ color: 'white' }}>
                        Управление                                                            
                    </h1>
                </div>
            </Card>
            <Card style={{width: 1280}} className='m-auto mt-2'>
                <div>
                    <div>
                        <h1>
                            Предметы
                        </h1>
                        
                    </div>
                    dsa
                </div>
                <div>
                    dsa
                </div>
            </Card>
        </Container>
    );
};

export default Admin;