import React, { useContext, useState, useEffect, useRef } from "react";
import { Context } from "../index";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useHistory } from "react-router-dom";
import { ADMIN_ROUTE, DIARY_ROUTE, LOGIN_ROUTE, OVERVIEW_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { Button } from "react-bootstrap";
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { signOutUser } from "../api/auth";
import { auth, firestore } from "../api/firebase";
import { signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
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




const NavBar = () => {
    /* const [user] = useAuthState(auth);
    const [userDoc] = useDocument(doc(firestore, "user", user.uid)); //я хз чего он на uid ругается
    const isTeacher = userDoc?.data().role === "teacher"; */
    
    


  /* const { user } = useContext(Context); */
  const history = useHistory();
  const signOutHandler = async () => {
    /* event.preventDefault(); */
    /*  await signOutUser().then(window.open('/login')); */
    await signOutUser().then(history.push(LOGIN_ROUTE));
  };

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <NavLink style={{ color: "white" }} to={OVERVIEW_ROUTE}>
          StudentProgress
        </NavLink>

        <Nav className="ml-auto" style={{ color: "white" }}>
          <Button
            variant={"outline-light"}
            className="me-2"
            onClick={() => history.push(ADMIN_ROUTE)}
          >
            Управление
          </Button>
          <Button
            variant={"outline-light"}
            className="me-2"
            onClick={() => history.push(DIARY_ROUTE)}
          >
            Журнал
          </Button>
          <Button variant={"outline-light"} onClick={(e) => signOutHandler()}>
            Выйти
          </Button>
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
