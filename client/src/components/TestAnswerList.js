import React, { useContext } from "react";
import { Context } from "../index";
import { NavLink } from "react-router-dom";
import { OVERVIEW_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Container, Row, Button, Nav, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import TestQuestionItem from "./TestQuestionItem";
import TestAnswerItem from "./TestAnswerItem";

import { firestore } from "../api/firebase";
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
  where,
} from "firebase/firestore";

const TestAnswerList = ({ question, handler }) => {
  const currentTestQuestionId = document.location.pathname.split("/")[2];
  const currentTestQuestionRef = doc(
    firestore,
    "testQuestion",
    currentTestQuestionId
  );
  const [curTestQuestion] = useDocument(currentTestQuestionRef);
  const [testAnswers] = useCollection(
    query(
      collection(firestore, "testAnswer"),
      where("testQuestionRef", "==", currentTestQuestionRef)
    )
  );

  const rightAnswerHandler = (index) => {
    const right = index === question.isRight;
    handler(right);
  };
  const ar = [1, 2, 3];

  return (
    <div >
      {/* <h1> eto testAnswerlist</h1> */}
  
      {console.log(question.data().answers)}
       {question?.data().answers?.map((testAnswer, index) =>                                     // что с answers
                 {return <div>
                    <TestAnswerItem key={index} testAnswerSnap={testAnswer} id={index} handler={rightAnswerHandler} /> 
                 </div>}
            )}
    </div>
  );
};

export default TestAnswerList;
