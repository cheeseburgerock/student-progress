import React, { useContext } from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'


import { Context } from '../index';
import { authRoutes, publicRoutes } from '../routes';
import { OVERVIEW_ROUTE, LOGIN_ROUTE } from '../utils/consts';
import { useAuthState } from 'react-firebase-hooks/auth';
import { firestore, auth } from '../api/firebase';

const AppRouter = () => {
    // const {user} = useContext(Context)


    const [user] = useAuthState(auth)  
    // console.log(user.displayName)
    return (
        <Switch>
            {user && authRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
             {publicRoutes.map(({path , Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            {user && <Redirect to={OVERVIEW_ROUTE}/>}
        </Switch> 
    );
};

export default AppRouter;