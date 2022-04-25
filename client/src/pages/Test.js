import React from 'react';
import { Container, Card, Button, Col } from 'react-bootstrap';
import grayBackground from '../assets/grayBackground.png'
import { SUBJECT_ROUTE } from '../utils/consts';
import { NavLink, useHistory } from 'react-router-dom';
import TestQuestionList from '../components/TestQuestionList';

const Test = () => {
    const history = useHistory() 

    const test = {
        id: 8,
        name: 'Тест: Раздел РП',
        description: 'Тест по разделу Речи Посполитой',
        subjectId: 11
    }

    return (
        <Container className='mt-2'> 
           <Card style={{ background: `url(${grayBackground})`, height: 150, width: 1280}} className='m-auto'>
                <div className='m-3'>
                    <Button variant="outline-light" onClick={() => history.back()}>Назад</Button>
                </div> 
                <div className='mt-1 p-2'>
                    <h1 style={{ color: 'white' }}>
                        {test.name}    
                    </h1>
                </div>
           </Card>
           <Card style={{width: 1280}} className='m-auto mt-2'>
                <div className='m-3' key={test.id}>
                    Описание: {test.description}
                </div>
            </Card>
            <Col style={{width: 1280}} className='m-auto mt-2'>
                <TestQuestionList/>
            </Col>
        </Container>
    );
};

export default Test;