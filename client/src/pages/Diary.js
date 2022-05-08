import React, { useContext, useState, useEffect, useRef } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Nav,
  Row,
  InputGroup,
  FormControl,
  ToggleButton,
} from "react-bootstrap";
import grayBackground from "../assets/grayBackground.png";
import "bootstrap/dist/css/bootstrap.css";
import { observer } from "mobx-react-lite";

import { firestore, auth } from "../api/firebase";
import {
  useCollection,
  useCollectionData,
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
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import TestInfo from "../components/TestInfo";
import { async, stringify } from "@firebase/util";
import { useAuthState } from "react-firebase-hooks/auth";

const UserPage = () => {
  const [user] = useAuthState(auth);
  //   const [testName, setTestName] = useState([""]);
  const [results] = useCollection(
    query(
      collection(firestore, "testResult"),
      where("user", "==", doc(firestore, "user", user.uid))
    )
  );
  const [userDoc] = useDocument(doc(firestore, "user", user.uid));

  const getDocumentData = async (docRef) => {
    const docSnap = await getDoc(docRef);

    return docSnap.data();
  };

  const updateDocumentData = async (docRef, update) => {
    await updateDoc(docRef, update);
  };

  const isTeacher = userDoc?.data().role === "teacher";

  const [testResultStudent] = useCollection(
    query(
      collection(firestore, "testResult"),
      where("user", "==", doc(firestore, "user", user.uid))
    )
  );
  const [testResultTeacher] = useCollection(
    query(collection(firestore, "testResult"), orderBy("test"))
  );

  const testResult = isTeacher ? testResultTeacher : testResultStudent;
  //   const [teacherCourses, teacherLoading, teacherError] = useCollection(
  //     query(
  //       collection(firestore, 'courses'),
  //       where('teacher', '==', accountDoc),
  //       orderBy('createdAt'),
  //     ),
  //   );

  return (
    <Container>
      <Card
        style={{
          background: `url(${grayBackground})`,
          height: 150,
          width: 720,
        }}
        className="m-auto mt-3"
      >
        <div className="mt-5 p-4">
          <h1 style={{ color: "white" }}>Журнал результатов</h1>
        </div>
      </Card>
      <Card style={{ width: 720 }} className="m-auto mt-2">
        <div className="m-3">
          {testResult?.docs.map((result, index) => {
            const resultData = result.data();
            const answersLength = resultData.answers.length;
            const scoreLength = resultData.answers.filter((value) => {
              return value === true;
            }).length;
            const score = Math.round(scoreLength / (answersLength / 10));
            getDocumentData(result.data().test)
              .then((value) => {
                // setTestName((testName) => {
                //   testName[index] = value.name;
                //   return testName;
                // });
                updateDocumentData(result.ref, { testName: value.name });
                return value;
              })
              .catch((err) => {
                return "sorry";
              });

            getDocumentData(result.data().user)
              .then((value) => {
                // setTestName((testName) => {
                //   testName[index] = value.name;
                //   return testName;
                // });
                updateDocumentData(result.ref, { userName: value.name });
                return value;
              })
              .catch((err) => {
                return "sorry";
              });

            return (
              <Card className="mt-2">
                <div className="m-2">
                  <div>Имя пользователя: {result.data().userName} </div>
                  <div>Название теста: {result.data().testName}</div>
                  <div>Оценка: {score}</div>
                  <div>
                    Дата аттестации:{" "}
                    {stringify(
                      result.data().executionDate?.toDate().toDateString()
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </Card>
    </Container>
  );
};

export default UserPage;
