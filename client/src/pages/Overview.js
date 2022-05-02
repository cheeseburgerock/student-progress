import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Container } from 'react-bootstrap';
import { Card, Form, Button, Row } from 'react-bootstrap';
import SubjectList from '../components/SubjectList';

const Overview = () => {
    
    return (
        <Container> 
           <Row>
                <h1 className="pt-4">Добрый день!</h1>
                <h5 className="pt-4">Выберите доступный предмет: </h5> 
           </Row>
           <SubjectList/>
           
        </Container>
    );
};

export default Overview;