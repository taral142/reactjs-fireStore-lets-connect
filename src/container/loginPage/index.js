import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signIn } from '../../action'
import Card from '../../component/card'
import LayOut from '../../component/layout'
import './style.css'

/**
* @author
* @function loginPage
**/

const LoginPage = (props) => {

  const [email,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const loginUser = (e) => {

    e.preventDefault();
    if(email === ""){
      alert("username cannot be empty");
      return;
    }
    if(password === ""){
      alert("passwod cannot be empty");
      return;
    }

    dispatch(signIn({email,password}));
  }

  if(auth.isAuthenticated === true){
    return <Redirect to="/" />;
  }

  return(
    <LayOut>
      <div className="loginContainer">
        <Card>
          <form onSubmit={loginUser} className="loginForm">
            <div className="formHeader">log into account</div>
            <div className="inputs">
              <input className="inputContainer"
                value={email}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="User Name"
              />
              <input className="inputContainer"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            
            <div className="loginBtn">
              <button>login</button>
            </div>
          </form>
        </Card>
      </div>
    </LayOut>
    
   )

 }

export default LoginPage