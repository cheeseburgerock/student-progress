import React, { useContext } from "react";
import { Context } from "../index";
import { NavLink, useHistory } from "react-router-dom";
import { OVERVIEW_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Button, ButtonGroup, Card, Col, Container, Form, Nav, Row, ToggleButton } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { SUBJECT_ROUTE } from "../utils/consts";
import { TEST_ROUTE } from "../utils/consts";
import { TESTQUESTION_ROUTE } from "../utils/consts";
import TestQuestionList from "./TestQuestionList";





const TestAnswerItem = ({ testAnswerSnap, handler, id, radioValue }) => {
  const history = useHistory();

  return (
    <div className="mt-3">
      
      <ToggleButton
        style={{ width: 500 }}
        className="align-self-end"
        variant="outline-secondary"
        onClick={() => handler(id)}
        type= "radio"
        active={radioValue === id}
      >

        {testAnswerSnap}
      </ToggleButton>
       
    </div>
  );
};

export default TestAnswerItem;
