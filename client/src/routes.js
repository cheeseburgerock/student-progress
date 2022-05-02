import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Overview from "./pages/Overview";
import SubjectPage from "./pages/SubjectPage";
import Test from "./pages/Test";
import TestQuestion from "./pages/TestQuestion";
import UserPage from "./pages/UserPage";
import Diary from "./pages/Diary";

import {
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  OVERVIEW_ROUTE,
  REGISTRATION_ROUTE,
  SUBJECT_ROUTE,
  TEST_ROUTE,
  USER_ROUTE,
  TESTQUESTION_ROUTE,
  DIARY_ROUTE,
} from "./utils/consts";

export const privateRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
];

export const authRoutes = [
  /*  {   
        path: TEST_ROUTE + '/:id',
        Component: Test
    }, */

  {
    path: OVERVIEW_ROUTE,
    Component: Overview,
  },
  {
    path: SUBJECT_ROUTE + "/:id",
    Component: SubjectPage,
  },
  {
    path: USER_ROUTE + "/:id",
    Component: UserPage,
  },
  {
    path: TEST_ROUTE + "/:id",
    Component: Test,
  },

  {
    path: TESTQUESTION_ROUTE + "/:id",
    Component: TestQuestion,
  },
  {
    path: DIARY_ROUTE,
    Component: Diary,
  },
];

export const publicRoutes = [
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },
  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
];
