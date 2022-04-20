import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './store/UserStore';
import SubjectStore from './store/SubjectStore';

export const Context = createContext(null)

//ReactDOM.render(
//  <Context.Provider value={{
//    user: new UserStore()
//  }}>
//    <App/>
    


  //</Context.Provider>,
  //document.getElementById('root')
//);








const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Context.Provider value={{
    user: new UserStore(),
    subject: new SubjectStore()
    }}>
    <App/>
    </Context.Provider>,
);



reportWebVitals();
