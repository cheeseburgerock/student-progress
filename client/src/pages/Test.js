import React from 'react';
import { Container, Card, Button, Col } from 'react-bootstrap';
import grayBackground from '../assets/grayBackground.png'
import { SUBJECT_ROUTE } from '../utils/consts';
import { NavLink, useHistory } from 'react-router-dom';
import TestQuestionList from '../components/TestQuestionList';
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

import getCurrentCourseId from '../pages/SubjectPage'
import TestAnswerList from '../components/TestAnswerList';


const Test = () => {
    const history = useHistory() 
    const currentTestId = document.location.pathname.split("/")[2];           //2 это номер отрезаемого элемента  http://localhost:3000/subject/      --->   zvJ5g6mrnbrSfMdmHYB7     <---
    const currentTestRef = doc(firestore,"test", currentTestId);
    const [test] = useDocument(currentTestRef);

    return (
        <Container className='mt-2'> 
            <Card style={{ background: `url(${grayBackground})`, height: 150, width: 1280}} className='m-auto'>
                <div className='m-3'>
                    <Button variant="outline-light" onClick={() => history.push(SUBJECT_ROUTE + "/" + getCurrentCourseId())}>Назад</Button>
                </div> 
                <div className='mt-1 p-2'>
                    <h1 style={{ color: 'white' }}>
                        {test?.data().name}                                                               
                    </h1>
                </div>
            </Card>
            <Card style={{width: 1280}} className='m-auto mt-2'>
                <div className='m-3' key={test?.data().id}>
                    Описание: {test?.data().description}
                </div>
            </Card>
            <Col style={{width: 1280}} className='m-auto mt-2'>
                <TestQuestionList/>
            </Col>
        </Container>
    );
};

export default Test;