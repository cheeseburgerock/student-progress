import React, { useContext } from 'react';
import { Context } from '../index';
import { NavLink, useHistory } from 'react-router-dom';
import { OVERVIEW_ROUTE } from '../utils/consts';
import { observer } from "mobx-react-lite";
import { Button, Card, Col, Container, Nav } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { SUBJECT_ROUTE } from '../utils/consts';
import cardpic from '../assets/cardpic.png';


const SubjectItem =  ({subjectSnap}) => {
    const history = useHistory();                                //для перехода на другие страницы
    
    return (
        <Col md={3} className={"mt-4"}>
            <Card style={{ height: 260, width: 280}}>
            <Card.Img variant="top" src={cardpic} />
            <Card.Body>
                
                <Card.Title> {subjectSnap.data().name} </Card.Title>
                <div class="text-secondary">
                    Преподаватель:
                </div>
                <div class="text-secondary">
                    {subjectSnap.data().professor} 

    
                </div>
                <Card.Text>
                
                </Card.Text>
                <Button variant="primary" onClick={() => history.push(SUBJECT_ROUTE + '/' + subjectSnap.id)}>Перейти</Button>
            </Card.Body>
            </Card>
        </Col>
    );
};

export default SubjectItem;