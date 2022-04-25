import React, { useContext } from 'react';
import { Context } from '../index';
import { NavLink, useHistory } from 'react-router-dom';
import { OVERVIEW_ROUTE } from '../utils/consts';
import { observer } from "mobx-react-lite";
import { Button, Card, Col, Container, Nav, Row } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SUBJECT_ROUTE } from '../utils/consts';
import { TEST_ROUTE } from '../utils/consts';



const TestItem =  ({test}) => {
    const history = useHistory();                     
    
    return (
        <Card style={{width: 1280}} className='m-auto mt-2'>
                <div className='m-3 pt-auto d-flex justify-content-between'>
                    <div> {test.data().name} </div>
                    <Button className='align-self-end' variant="primary" onClick={() => history.push(TEST_ROUTE + '/' + test.id)}>Перейти</Button>
                </div>
            </Card>
    );
}

export default TestItem;