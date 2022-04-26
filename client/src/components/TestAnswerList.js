import React, { useContext } from 'react';
import { Context } from '../index';
import { NavLink } from 'react-router-dom';
import { OVERVIEW_ROUTE } from '../utils/consts';
import { observer } from "mobx-react-lite";
import { Container, Row, Button, Nav, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TestQuestionItem from './TestQuestionItem';
import TestAnswerItem from './TestAnswerItem';


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


const TestAnswerList =  observer(() => {
    
    const currentTestQuestionId = document.location.pathname.split("/")[2];          
    const currentTestQuestionRef = doc(firestore,"testQuestion", currentTestQuestionId);
    const [curTestQuestion] = useDocument(currentTestQuestionRef);
    const [testAnswers] = useCollection(query(collection(firestore,"testAnswer"),where("testQuestionRef","==", currentTestQuestionRef)));


    return (
        <Row className="d-flex">
            {testAnswers?.docs.map(testAnswer => 
                 <div className="d-flex">
                    <TestAnswerItem key={testAnswer.id} testAnswer={testAnswer} /> 
                 </div>
            )}
        </Row>
    );
});

export default TestAnswerList;