import React, { useContext, useState } from "react";
import { Context } from "../index";
import { NavLink } from "react-router-dom";
import { OVERVIEW_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Container, Row, Button, Nav, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import TestQuestionItem from "./TestQuestionItem";

import { firestore, auth } from "../api/firebase";
import {
  useCollection,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  addDoc,
  collection,
  doc,
  documentId,
  getDoc,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

const TestQuestionList = observer(() => {
  const { subject } = useContext(Context);

  const currentTestId = document.location.pathname.split("/")[2];
  const currentTestRef = doc(firestore, "test", currentTestId);
  const [curTest] = useDocument(currentTestRef);
  const [testQuestions] = useCollection(
    query(
      collection(firestore, "testQuestion"),
      where("testRef", "==", currentTestRef)
    )
  );

  /* testQuestions.data() */

  const [answers, setAnswers] = useState([false, false]);

  const questionHandler = (id, right) => {
    setAnswers((answer) => {
      answer[id] = right;
      return answer;
    });
    console.log(answers, right, id);
  };

  const [user] = useAuthState(auth);

  const currentUserRef = doc(firestore, "user", user.uid);
  const [curUser] = useDocument(currentUserRef);

  const addDocument = async () => {
    await addDoc(collection(firestore, "testResult"), {
      user: currentUserRef,
      test: currentTestRef,
      answers: answers,
      executionDate: serverTimestamp(),
    });
  };

  return (
    <Row className="d-flex">
      {testQuestions?.docs.map((testQuestion, index) => (
        <div className="d-flex">
          <TestQuestionItem
            key={testQuestion.id}
            testQuestionSnap={testQuestion}
            handler={questionHandler}
            index={index}
          />
        </div>
      ))}
      <Card style={{ width: 720 }} className="m-auto mt-2">
        <div className="d-flex justify-content-center align-items-center m-3">
          <Button style={{ width: 500 }} onClick={addDocument}>
            Принять ислам
          </Button>
        </div>
      </Card>
    </Row>
  );
});

export default TestQuestionList;
