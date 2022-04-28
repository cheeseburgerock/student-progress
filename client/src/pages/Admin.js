import React, { useContext, useState } from "react";
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

const Admin = () => {
  /* const [answers, setAnswers] = useState([false, false]); */

  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("");
  const [professor, setProfessor] = useState("");
  const [subjectRef, setSubjectRef] = useState();

  const addSubject = async () => {
    await addDoc(collection(firestore, "subject"), {
      name: subjectName,
      description: description,
      professor: professor,
    });
  };

  let curDoc;

  const deleteDocument = async (uRef) => {
    console.log(uRef);

    await deleteDoc(doc(firestore, "subject", uRef));
  };

  const [subjects] = useCollection(query(collection(firestore, "subject")));

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
                  Удалить учебный предмет
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card style={{ width: 1280 }} className="m-auto mt-2">
        <div>
          <div className="m-3">
            <h1>Тесты</h1>

            <h4>Добавить Тест</h4>

            <InputGroup>
              <FormControl placeholder="Название теста" />
              <FormControl placeholder="Описание" />
            </InputGroup>

            <div className="mt-3 justify-content-between">
              <InputGroup>
                <FormControl placeholder="Ответ" />
                <ToggleButton
                  style={{ width: 100 }}
                  className="align-self-end"
                  variant="outline-success"
                  type="checkbox"
                  checked={true}
                  value="1"
                  active={false}
                >
                  Верный ответ
                </ToggleButton>
              </InputGroup>
            </div>
            <div className="mt-3">
              <Button variant="outline-primary">Добавить вариант ответа</Button>
            </div>
            <div className="mt-3">
              <Button variant="outline-primary">Добавить тест</Button>
            </div>

            <div className="mt-5">
              <h4>Удалить тест</h4>
              <Form.Select aria-label="Default select example">
                <option>Выберите тест</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </Form.Select>

              <div className="mt-3">
                <Button variant="outline-danger">
                  Удалить учебный предмет
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default Admin;
