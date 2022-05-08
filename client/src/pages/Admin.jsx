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
  getDocs,
} from "firebase/firestore";
import { async } from "@firebase/util";
import { useAuthState } from "react-firebase-hooks/auth";

const Admin = observer(() => {
  const [user] = useAuthState(auth);
  const [userDoc] = useDocument(doc(firestore, "user", user.uid));
  const isTeacher = userDoc?.data().role === "teacher";
  /* const [answers, setAnswers] = useState([false, false]); */
  
  const [subjectName, setSubjectName] = useState("");
  const [description, setDescription] = useState("");
  const [professor, setProfessor] = useState("");
  const [subjectRef, setSubjectRef] = useState();
  const [answersCount, setAnswersCount] = useState([
    ["", ""],
    ["", ""],
  ]);
  const [rightAnswerIndex, setRightAnswerIndex] = useState(0);
  const [testDescription, setTestDescription] = useState("");
  const [questionName, setQuestionName] = useState("");
  const [questionsCount, setQuestionsCount] = useState(["", ""]);
  const [testName, setTestName] = useState("");
  const [isRightArr, setIsRightArr] = useState([0, 0]);

  const [testRef, setTestRef] = useState("");

  

  const answerUpdate = (value, index, parentIndex) => {
    setAnswersCount((answer) => {
      answer[parentIndex][index] = value;
      return answer;
    });
  };
  const answerAdd = (value, parentIndex) => {
    setAnswersCount((answers) => {
      answers.push([]);
      answers[parentIndex].push(value);
      console.log(answers[parentIndex]);
      return answers;
    });
  };

  const questionUpdate = (value, index) => {
    setQuestionsCount((question) => {
      question[index] = value;
      answerUpdate("", 0, index);
      return question;
    });
  };
  const questionAdd = (value, index) => {
    setQuestionsCount((questions) => {
      questions.push(value);
      answerAdd("", questions.length - 1);
      return questions;
    });
    setIsRightArr((right) => {
      right.push(0);
      return right;
    });
  };

  useEffect(() => {
    window.document.dispatchEvent(new Event("DOMContentLoaded"));
  }, [answersCount, isRightArr]);

  const addSubject = async () => {
    await addDoc(collection(firestore, "subject"), {
      name: subjectName,
      description: description,
      professor: professor,
    });
  };

  const addTest = async () => {
    const selectedRef = await doc(firestore, "subject", subjectRef);
    const newTestRef = await addDoc(collection(firestore, "test"), {
      name: testName,
      description: testDescription,
      subjectRef: selectedRef,
    });
    questionsCount.map(async (question, index) => {
      await addDoc(collection(firestore, "testQuestion"), {
        testRef: newTestRef,
        name: question,
        isRight: isRightArr[index],
        answers: answersCount[index],
      });
    });
  };

  const deleteDocument = async (uRef) => {
    console.log(uRef);

    await deleteDoc(doc(firestore, "subject", uRef));
  };

  const deleteTestDocument = async (testId) => {
    if (testId === "") return;
    const uRef = doc(firestore, "test", testId);
    console.log(uRef);
    const questions = await getDocs(
      query(collection(firestore, "testQuestion"), where("testRef", "==", uRef))
    );

    const results = await getDocs(
      query(collection(firestore, "testResult"), where("test", "==", uRef))
    );

    await questions?.docs.map(async (question) => {
      const answers = await getDocs(
        query(
          collection(firestore, "testAnswer"),
          where("questionRef", "==", question.ref)
        )
      );
      await answers?.docs.map(async (answer) => {
        await deleteDoc(answer.ref);
      });
      await deleteDoc(question.ref);
    });

    await results?.docs.map(async (result) => {
      await deleteDoc(result.ref);
    });
    await deleteDoc(uRef);
  };

  const deleteSubject = async (testId) => {
    const uRef = doc(firestore, "test", testId);
    console.log(uRef);

    const tests = await getDocs(
      query(collection(firestore, "test"), where("subjectRef", "==", uRef))
    );

    await tests?.docs.map(async (test) => {
      await deleteTestDocument(test.ref);
    });
    await deleteDoc(doc(firestore, "subject", uRef));
  };

  const [subjects] = useCollection(query(collection(firestore, "subject")));
  const [tests] = useCollection(query(collection(firestore, "test")));

  return (
    isTeacher? 
    

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

            <InputGroup className="mt-3">
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
            {questionsCount.map((question, i) => {
              return (
                <Card className="mt-3">
                  <InputGroup>
                    <FormControl
                      className="m-3"
                      placeholder="Вопрос"
                      onChange={(e) => questionUpdate(e.target.value, i)}
                    />
                    {/* <FormControl placeholder="Описание" onChange={e => setTestDescription(e.target.value)}/> */}
                  </InputGroup>
                  <div className="m-3 justify-content-between">
                    {answersCount[i]?.map((answer, index) => {
                      return (
                        <InputGroup>
                          <FormControl
                            className="mt-2"
                            placeholder="Вариант ответа"
                            onChange={(e) =>
                              answerUpdate(e.target.value, index, i)
                            }
                          />
                          <ToggleButton
                            style={{ width: 100 }}
                            className="align-self-end mt-2"
                            variant="outline-success"
                            type="checkbox"
                            checked={index === isRightArr[i]}
                            value="1"
                            active={false}
                            onClick={(e) => {
                              setIsRightArr((right) => {
                                right[i] = index;
                                console.log(right);
                                return right;
                              });
                            }}
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
                        answerAdd("", i);
                        setRightAnswerIndex(answersCount[i].length); // Проста нада чтобы обновлялось. Костыли, они такие
                      }}
                    >
                      Добавить вариант ответа
                    </Button>
                  </div>
                </Card>
              );
            })}

            <div className="mt-3">
              <Button variant="outline-success " onClick={addTest}>
                Добавить тест
              </Button>
              <Button
                variant="outline-primary"
                className="m-2"
                onClick={(e) => {
                  questionAdd("", questionsCount.length);
                  setRightAnswerIndex(questionsCount.length);
                }}
              >
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
    </Container>
    :
    <div></div>
  );
});

export default Admin;
