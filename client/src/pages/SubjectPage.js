import React from 'react';
import { Card, Container, Image, Button, Col } from 'react-bootstrap';
import cardpic from '../assets/cardpic.png'
import 'bootstrap/dist/css/bootstrap.css';
import { SUBJECT_ROUTE } from '../utils/consts';
import { OVERVIEW_ROUTE } from '../utils/consts';
import { NavLink, useHistory } from 'react-router-dom';
import TestList from '../components/TestList'
import Test from './Test';
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

const SubjectPage = () => {
    const history = useHistory()        

    const currentCourseId = document.location.pathname.split("/")[2];           //2 это номер отрезаемого элемента  http://localhost:3000/subject/      --->   zvJ5g6mrnbrSfMdmHYB7     <---
    const currentCourseRef = doc(firestore,"subject", currentCourseId);
    const [subject] = useDocument(currentCourseRef);
    const [tests] = useCollection(query(collection(firestore,"test"),where("subjectRef","==", currentCourseRef)));
    
   



    return (
        <Container className='mt-2'> 
            <Card style={{ background: `url(${cardpic})`, height: 200, width: 1280}} className='m-auto' >
                <div className='m-3'>
                    <Button variant="outline-light" onClick={() => history.push(OVERVIEW_ROUTE)}>Назад</Button>
                </div>      
                <div className='mt-5 p-3'>
                    <div>
                        <h1 style={{ color: 'white' }}>
                            {subject?.data().name}    
                        </h1>
                    </div>  
                </div>
            </Card>
            <Card style={{width: 1280}} className='m-auto mt-2'>
                <div className='m-3' key={subject?.ref.id}>
                    Описание: {subject?.data().description}
                </div>
    
            </Card>


            <Col style={{width: 1280}} className='m-auto mt-2'>
                <TestList/>
            </Col>
                        
        </Container>
    );
};

export default SubjectPage;