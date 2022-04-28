import React, { useContext, useState } from 'react';
import { Context } from '../index';
import { NavLink } from 'react-router-dom';
import { OVERVIEW_ROUTE } from '../utils/consts';
import { observer } from "mobx-react-lite";
import { Container, Row, Button, Nav, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TestQuestionItem from './TestQuestionItem';

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


const TestQuestionList =  observer(() => {
    const {subject} = useContext(Context)

    const currentTestId = document.location.pathname.split("/")[2];          
    const currentTestRef = doc(firestore,"test", currentTestId);
    const [curTest] = useDocument(currentTestRef);
    const [testQuestions] = useCollection(query(collection(firestore,"testQuestion"),where("testRef","==", currentTestRef)));

    /* testQuestions.data() */


    const [answers, setAnswers] = useState();

    const questionHandler = (id, right) => {
        setAnswers(answer => answer[id] = right)
    }

    return (
        <Row className="d-flex">
            {testQuestions?.docs.map(testQuestion => 
                 <div className="d-flex">
                    <TestQuestionItem key={testQuestion.id} testQuestionSnap={testQuestion} handler={questionHandler} /> 
                 </div>
            )}

        </Row>
    );
});

export default TestQuestionList;