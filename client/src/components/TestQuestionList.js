import React, { useContext } from 'react';
import { Context } from '../index';
import { NavLink } from 'react-router-dom';
import { OVERVIEW_ROUTE } from '../utils/consts';
import { observer } from "mobx-react-lite";
import { Container, Row, Button, Nav, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TestQuestionItem from './TestQuestionItem';


const TestQuestionList =  observer(() => {
    const {subject} = useContext(Context)
    return (
        <Row className="d-flex">
            {subject.testQuestions.map(testQuestion => 
                 <div className="d-flex">
                    <TestQuestionItem key={testQuestion.id} testQuestion={testQuestion} /> 
                    
                 </div>
            )}
        </Row>
    );
});

export default TestQuestionList;