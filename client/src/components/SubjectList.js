import React, { useContext } from 'react';
import { Context } from '../index';
import { NavLink } from 'react-router-dom';
import { OVERVIEW_ROUTE } from '../utils/consts';
import { observer } from "mobx-react-lite";
import { Container, Row, Button, Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import SubjectItem from './SubjectItem';


const SubjectList =  observer(() => {
    const {subject} = useContext(Context)
    return (
        <Row className="d-flex">
            {subject.subjects.map(subject =>
                <SubjectItem key={subject.id} subject={subject} />  
            )}
        </Row>
    );
    
});

export default SubjectList;