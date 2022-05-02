import React, { useContext, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import { Context } from "../index";
import { authRoutes, privateRoutes, publicRoutes } from "../routes";
import { OVERVIEW_ROUTE, LOGIN_ROUTE } from "../utils/consts";
import { useAuthState } from "react-firebase-hooks/auth";
import { firestore, auth } from "../api/firebase";
import { useDocument } from "react-firebase-hooks/firestore";
import { doc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";

const AppRouter = () => {
  // const {user} = useContext(Context)

  // console.log(user.displayName)
  const [user] = useAuthState(auth);
  /* const [isTeacher, setIsTeacher] = useState(false); */
 /* const accountDoc = doc(firestore, "user", auth?.currentUser.uid)
  const [userDoc] = useDocument(accountDoc); */ 
 /*  const docSnap = async () => {
    const b1 = await getDoc(doc(firestore, "user", user?.uid));
    setIsTeacher(b1.data().role === "teacher");
  }; */
  /* const isTeacher = userDoc?.data().role === "teacher"; */


  return (
    <Switch>
      {user &&
        authRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route key={path} path={path} component={Component} exact />
      ))}
      {user &&
        /* isTeacher && */
        privateRoutes.map(({ path, Component }) => (
          <Route key={path} path={path} component={Component} exact />
        ))}
      {user && <Redirect to={OVERVIEW_ROUTE} />}
    </Switch>
  );
};

export default AppRouter;
