import React, { useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import homePage from './container/homePage';
import loginPage from './container/loginPage';
import signUpPage from './container/signUpPage';
import PrivetRoute from './component/privetRoute';
import { useDispatch, useSelector } from 'react-redux';
import { isLoggedIn } from './action';


function App() {

  const dispatch = useDispatch();
  const auth = useSelector( state => state.auth);
  
  useEffect( () => {
    
    console.log(auth.isAuthenticated);
    if(!auth.isAuthenticated){
      dispatch(isLoggedIn());
    }
  
  }, [] )

  return (
    <div className="App">
    <Router>
      <PrivetRoute path='/' exact component={homePage} />
      <Route path='/login' component={loginPage}/>
      <Route path='/signup' component={signUpPage}/>
    </Router>
    </div>
  );
}

export default App;
