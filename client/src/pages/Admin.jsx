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
} from "firebase/firestore";
import { async } from "@firebase/util";

const Admin = observer(() => {
  /* const [answers, setAnswers] = useState([false, false]); */

  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("");
  const [professor, setProfessor] = useState("");
  const [subjectRef, setSubjectRef] = useState();
  const [answersCount, setAnswersCount] = useState(["", ""]);
  const [rightAnswerIndex, setRightAnswerIndex] = useState(-1);
  const [testDescription, setTestDescription] = useState("");
  const [testName, setTestName] = useState("");

  const [testRef, setTestRef] = useState();

  const answerUpdate = (value, index) => {
    setAnswersCount((answer) => {
      answer[index] = value;
      return answer;
    });

    console.log(answersCount);
  };

  useEffect(() => {
    window.document.dispatchEvent(new Event("DOMContentLoaded"));
  }, [answersCount]);

  const addSubject = async () => {
    await addDoc(collection(firestore, "subject"), {
      name: subjectName,
      description: description,
      professor: professor,
    });
  };

  const addTest = async () => {
    await addDoc(collection(firestore, "test"), {
      name: testName,
      description: testDescription,
    });
  };

  const deleteDocument = async (uRef) => {
    console.log(uRef);

    await deleteDoc(doc(firestore, "subject", uRef));
  };

  const deleteTestDocument = async (uRef) => {
    console.log(uRef);

    await deleteDoc(doc(firestore, "test", uRef));
  };

  const [subjects] = useCollection(query(collection(firestore, "subject")));
  const [tests] = useCollection(query(collection(firestore, "test")));

  return (
    <Container>
      <Card
        style={{
          background: `url(${grayBackground})`,
          height: 150,
          width: 1280,
        }}
        className="m-auto"
      >
        <div className="mt-5 p-4">
          <h1 style={{ color: "white" }}>Управление</h1>
        </div>
      </Card>
      <Card style={{ width: 1280 }} className="m-auto mt-2">
        {/* ________ПРЕДМЕТ_________ */}
        <div>
          <div className="m-3">
            <h1>Предметы</h1>

            <h4>Добавить предмет</h4>

            <InputGroup>
              <FormControl
                placeholder="Наименование предмета"
                onChange={(e) => setSubjectName(e.target.value)}
              />
              <FormControl
                placeholder="Описание"
                onChange={(e) => setDescription(e.target.value)}
              />
              <FormControl
                placeholder="Преподаватель"
                onChange={(e) => setProfessor(e.target.value)}
              />
            </InputGroup>
            <div className="mt-3">
              <Button variant="outline-primary" onClick={(e) => addSubject()}>
                Добавить учебный предмет
              </Button>
            </div>

            <div className="mt-5">
              <h4>Удалить предмет</h4>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  console.log(e.target.value);
                  setSubjectRef(e.target.value);
                }}
              >
                <option>Выберите учебный предмет</option>
                {subjects?.docs.map((subject, index) => {
                  return (
                    <option
                      value={subject.ref.id}
                      key={index}
                      onChange={(e) => console.log("click")}
                    >
                      {subject.data().name}
                    </option>
                  );
                })}
              </Form.Select>
              <div className="mt-3">
                <Button
                  variant="outline-danger"
                  onClick={(e) => deleteDocument(subjectRef)}
                >
                  Удалить выбранный учебный предмет
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card style={{ width: 1280 }} className="m-auto mt-2">
        {" "}
        {/* ____________ТЕСТЫ_____________ */}
        <div>
          <div className="m-3">
            <h1>Тест</h1>

            <h4>Добавить тест</h4>

            <InputGroup>
              <FormControl
                placeholder="Название теста"
                onChange={(e) => setTestName(e.target.value)}
              />
              {
                <FormControl
                  placeholder="Описание теста"
                  onChange={(e) => setTestDescription(e.target.value)}
                />
              }
            </InputGroup>
            <h4 className="mt-3">Добавить вопрос</h4>

            {/* __________КАРТА ВОПРОСА___________*/}
            <Card className="mt-3">
              <InputGroup>
                <FormControl
                  className="m-3"
                  placeholder="Вопрос"
                  onChange={(e) => setTestName(e.target.value)}
                />
                {/* <FormControl placeholder="Описание" onChange={e => setTestDescription(e.target.value)}/> */}
              </InputGroup>
              <div className="m-3 justify-content-between">
                {answersCount.map((answer, index) => {
                  return (
                    <InputGroup>
                      <FormControl
                        className="mt-2"
                        placeholder="Вариант ответа"
                        onChange={(e) => answerUpdate(e.target.value, index)}
                      />
                      <ToggleButton
                        style={{ width: 100 }}
                        className="align-self-end mt-2"
                        variant="outline-success"
                        type="checkbox"
                        checked={index === rightAnswerIndex}
                        value="1"
                        active={false}
                        onClick={(e) => setRightAnswerIndex(index)}
                      >
                        Верный ответ
                      </ToggleButton>
                    </InputGroup>
                  );
                })}
              </div>
              <div className="mt-3 mb-4 d-flex justify-content-center align-items-center">
                <Button
                  style={{ width: 1200 }}
                  variant="outline-primary"
                  onClick={(e) => {
                    answerUpdate("", answersCount.length);
                    setRightAnswerIndex(answersCount.length);
                  }}
                >
                  Добавить вариант ответа
                </Button>
              </div>
            </Card>

            <div className="mt-3">
              <Button variant="outline-success ">Добавить тест</Button>
              <Button variant="outline-primary" className="m-2">
                Добавить вопрос
              </Button>
            </div>

            <div className="mt-5">
              <h4>Удалить тест</h4>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  console.log(e.target.value);
                  setTestRef(e.target.value);
                }}
              >
                {tests?.docs.map((test, index) => {
                  return (
                    <option
                      value={test.ref.id}
                      key={index}
                      onChange={(e) => console.log("click")}
                    >
                      {test.data().name}
                    </option>
                  );
                })}
              </Form.Select>

              <div className="mt-3">
                <Button
                  variant="outline-danger"
                  onClick={(e) => deleteTestDocument(testRef)}
                >
                  Удалить выбранный тест
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Card
        style={{
          background: `url(${grayBackground})`,
          height: 150,
          width: 1280,
        }}
        className="m-auto mt-3"
      >
        <div className="mt-5 p-4">
          <h1 style={{ color: "white" }}>результаты тестов</h1>
        </div>
      </Card>
      <Card style={{ width: 1280 }} className="m-auto mt-2">
        <div className="m-3">
          <Form.Select aria-label="Default select example">
            <option>Выберите учебный предмет</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
          <Form.Select aria-label="Default select example" className="mt-2">
            <option>Выберите тест</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
          </Form.Select>
        </div>
      </Card>
    </Container>
  );
});

export default Admin;
