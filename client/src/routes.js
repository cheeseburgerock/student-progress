import Admin from "./pages/Admin";
import Auth from "./pages/Auth";
import Overview from "./pages/Overview";
import SubjectPage from "./pages/SubjectPage";
import Test from "./pages/Test";
import UserPage from "./pages/UserPage";
import { ADMIN_ROUTE, LOGIN_ROUTE, OVERVIEW_ROUTE, REGISTRATION_ROUTE, SUBJECT_ROUTE, TEST_ROUTE, USER_ROUTE } from "./utils/consts";

export const authRoutes = [
    {   
        path: ADMIN_ROUTE,
        Component: Admin
    },
   /*  {   
        path: TEST_ROUTE + '/:id',
        Component: Test
    }, */
]

export const publicRoutes = [
    {   
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {   
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
    {   
        path: OVERVIEW_ROUTE,
        Component: Overview
    },
    {   
        path: SUBJECT_ROUTE + '/:id',
        Component: SubjectPage
    },
    {   
        path: USER_ROUTE + '/:id',
        Component: UserPage
    },
    {   
        path: TEST_ROUTE + '/:id',
        Component: Test
    },

]