import React, { useContext } from 'react';
import { Context } from '../index';
import { NavLink, useHistory } from 'react-router-dom';
import { OVERVIEW_ROUTE } from '../utils/consts';
import { observer } from "mobx-react-lite";
import { Button, Card, Col, Container, Form, Nav, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SUBJECT_ROUTE } from '../utils/consts';
import { TEST_ROUTE } from '../utils/consts';
import { TESTQUESTION_ROUTE } from '../utils/consts';
import TestQuestionList from './TestQuestionList';



const TestAnswerItem =  ({testAnswer}) => {
    
    const history = useHistory()                     

    return (           
        <div className='mt-3'>
            <Button
                style={{width: 600}}
                className='align-self-end' 
                variant="outline-secondary" 
                onClick={() => history.push(TESTQUESTION_ROUTE + '/' + testAnswer.id)}>{testAnswer.data().name} 
            </Button>
        </div>    
    );
}

export default TestAnswerItem;