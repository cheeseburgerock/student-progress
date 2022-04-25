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



const TestQuestionItem =  ({testQuestion}) => {
    const {subject} = useContext(Context)
    const history = useHistory()                     
   

    return (
        
        <Card style={{width: 1280}} className='m-auto mt-3'>
                <div className='m-3 justify-content-between d-flex'>
                        <div>
                            {testQuestion.data().name} 
                        </div>
                        <div>
                            <Button
                                className='align-self-end' 
                                variant="primary" 
                                onClick={() => history.push(TESTQUESTION_ROUTE + '/' + testQuestion.id)}>Ответить на вопрос
                            </Button>

                            
                        </div>
                </div>
        </Card>
    );
}

export default TestQuestionItem;