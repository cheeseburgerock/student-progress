import React, { useContext } from 'react';
import { Context } from '../index';
import { NavLink } from 'react-router-dom';
import { OVERVIEW_ROUTE } from '../utils/consts';
import { observer } from "mobx-react-lite";
import { Container, Row, Button, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SubjectItem from './SubjectItem';
import { firestore } from '../api/firebase';
import {
<<<<<<< HEAD
        useCollection,
        useDocument,
        useDocumentData,
    } from 'react-firebase-hooks/firestore';
=======
    useCollection,
    useDocument,
    useDocumentData,
  } from 'react-firebase-hooks/firestore';
>>>>>>> 7cbd621faeccef4787972465728cb6ae39d1ff96
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
<<<<<<< HEAD
=======

>>>>>>> 7cbd621faeccef4787972465728cb6ae39d1ff96


    const SubjectList =  observer(() => {
    const {subject} = useContext(Context)
    const [subjects] = useCollection(query(collection(firestore,"subject")))
    return (
        <Row className="d-flex">
            {subjects?.docs.map(subject =>
                {console.log(subject.data())
                    
<<<<<<< HEAD
                return (<SubjectItem key={subject.id} subject={subject} /> )}
=======
                return (<SubjectItem key={subject.id} subject={subject} /> ) }
>>>>>>> 7cbd621faeccef4787972465728cb6ae39d1ff96
            )}
        </Row>
    );
});



export default SubjectList;