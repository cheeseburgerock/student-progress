import React, { useContext } from 'react';
import { Context } from '../index';
import { NavLink, useHistory } from 'react-router-dom';
import { OVERVIEW_ROUTE } from '../utils/consts';
import { observer } from "mobx-react-lite";
import { Button, Card, Col, Container, Form, Nav, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SUBJECT_ROUTE } from '../utils/consts';
import { TEST_ROUTE } from '../utils/consts';
import TestQuestionList from './TestQuestionList';



const TestQuestionItem =  ({test}) => {
    const {subject} = useContext(Context)
    const history = useHistory()                     
    const testQuestion =
    {
        id: 10,
        name: 'В каком году произошел первый раздел Речи Посполитой?',
        testId: 8
    };

    return (
        
        <Card style={{width: 1280}} className='m-auto mt-2'>
                <div className='m-3 pt-auto'>
                    huhuh
                    <Row className="d-flex">
                    {subject.testQuestions.map(testQuestion => 
                    {/* <div className="d-flex">
                        <TestAnswerItem key={testQuestion.id} testQuestion={testQuestion} /> 
                        mnnm
                    </div> */}
                    )}
                    </Row>    


                    
                   
                
                </div>
        </Card>
    );
}

export default TestQuestionItem;