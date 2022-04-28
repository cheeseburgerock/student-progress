import React, { useContext } from 'react';
import { Context } from '../index';
import { NavLink } from 'react-router-dom';
import { OVERVIEW_ROUTE } from '../utils/consts';
import { observer } from "mobx-react-lite";
import { Container, Row, Button, Nav, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TestItem from './TestItem';
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


    const TestList =  observer(() => {
    const currentCourseId = document.location.pathname.split("/")[2];           //2 это номер отрезаемого элемента  http://localhost:3000/subject/      --->   zvJ5g6mrnbrSfMdmHYB7     <---
    const currentCourseRef = doc(firestore,"subject", currentCourseId);
    const [curCourse] = useDocument(currentCourseRef);
    const [tests] = useCollection(query(collection(firestore,"test"),where("subjectRef","==", currentCourseRef)));
    
    return (
        <Row className="d-flex">
            {tests?.docs.map(test => 
                 <div className="d-flex">
                    <TestItem key={test.id} testSnap={test} /> 
                 </div>
            )}
        </Row>
    );
});

export default TestList;