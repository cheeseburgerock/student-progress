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
import TestAnswerList from "./TestAnswerList";

const TestQuestionItem = ({ testQuestionSnap, handler, index }) => {
  const { subject } = useContext(Context);
  const history = useHistory();

  const answerHandler = (right) => {
    handler(index, right);
  };

  return (
    <>
      <Card style={{ width: 720 }} className="m-auto mt-2 d-flex">
        <div className="m-3">
          <div>
            <h2> {testQuestionSnap.data().name}</h2>
          </div>

          <div className="d-flex justify-content-center align-items-center">
            <TestAnswerList
              question={testQuestionSnap}
              handler={answerHandler}
            />
          </div>
        </div>
      </Card>
      {/* <TestAnswerList question={testQuestion} handler={handler} />   */}
      {/* варианты ответа */}
    </>
  );
};

export default TestQuestionItem;
