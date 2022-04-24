import React, { useContext } from 'react';
import { Context } from '../index';
import { NavLink } from 'react-router-dom';
import { OVERVIEW_ROUTE } from '../utils/consts';
import { observer } from "mobx-react-lite";
import { Container, Row, Button, Nav, Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import TestItem from './TestItem';


const TestList =  observer(() => {
    const {subject} = useContext(Context)
    return (
        <Row className="d-flex">
            {subject.tests.map(test => 
                 <div className="d-flex">
                    <TestItem key={test.id} test={test} /> 
                 </div>
            )}
        </Row>
    );
});

export default TestList;