import React from 'react';
import { Container, Card, Button, Col, Row } from 'react-bootstrap';
import grayBackground from '../assets/grayBackground.png'
import { SUBJECT_ROUTE } from '../utils/consts';
import { NavLink, useHistory } from 'react-router-dom';
import TestQuestionList from '../components/TestQuestionList';
import TestAnswerList from '../components/TestAnswerList';

import { firestore } from '../api/firebase';
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



const TestQuestion = () => {

    const history = useHistory() 
    const currentTestQuestionId = document.location.pathname.split("/")[2];           //2 это номер отрезаемого элемента  http://localhost:3000/subject/      --->   zvJ5g6mrnbrSfMdmHYB7     <---
    const currentTestQuestionRef = doc(firestore,"testQuestion", currentTestQuestionId);
    const [testQuestion] = useDocument(currentTestQuestionRef);


    return (
        <Container 
        className='mt-2 d-flex justify-content-center align-items-center ' 
        > 
            <Card style={{width: 700}} className="p-5" >
                <Row>
                    <Col>
                        <Card style={{ background: `url(${grayBackground})`, height: 150, width: 600}} className='mt-auto mb-auto' >
                            <div className='m-3'>
                                <Button variant="outline-light" onClick={() => history.push(SUBJECT_ROUTE)}>Назад</Button>
                            </div> 
                            <div className='mt-1 p-2'>
                                <h1 style={{ color: 'white' }}>
                                    {testQuestion?.data().name}                              {/* НАЗВАНИЕ ТЕСТА */}                                 
                                </h1>
                            </div>
                        </Card>
                    </Col>
                    <div className=''>
                            <div><TestAnswerList/></div>
                       
                    </div>  
                </Row>
                
            </Card>          
                    
                    
                      
                    

                
                

            
            
               

            
        </Container>
    );
};

export default TestQuestion;