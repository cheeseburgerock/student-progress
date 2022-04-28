import React, { useContext } from "react";
import { Context } from "../index";
import { NavLink, useHistory } from "react-router-dom";
import { OVERVIEW_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Button, Card, Col, Container, Form, Nav, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import { SUBJECT_ROUTE } from "../utils/consts";
import { TEST_ROUTE } from "../utils/consts";
import { TESTQUESTION_ROUTE } from "../utils/consts";
import TestQuestionList from "./TestQuestionList";

const TestAnswerItem = ({ testAnswerSnap, handler, id }) => {
  const history = useHistory();

  return (
    <div className="mt-3">
      {/* <h1> eto testAnswerItem</h1> */}
      <Button
        style={{ width: 500 }}
        className="align-self-end"
        variant="outline-secondary"
        onClick={() => handler(id)}
      >
        {testAnswerSnap}
      </Button>
    </div>
  );
};

export default TestAnswerItem;
