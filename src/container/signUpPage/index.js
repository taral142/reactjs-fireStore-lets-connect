import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { signup } from '../../action'
import Card from '../../component/card'
import LayOut from '../../component/layout'
import './style.css'

/**
* @author
* @function signUpPage
**/

const SignUpPage = (props) => {

  const [firstName,setFirstName] = useState('');
  const [lastName,setLastName] = useState('');
  const [email,setUserName] = useState('');
  const [password,setPassword] = useState('');
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);

  const registerUser = (e) => {

    e.preventDefault();

    const user = {
      firstName,lastName,email,password
    }
    dispatch(signup(user));
  }

  if(auth.isAuthenticated === true){
    return <Redirect to="/" />;
  }

  return(
    <LayOut>
      <div className="signUpContainer">
        <Card>
          <form onSubmit={registerUser} className="signUpForm">
            <div className="formHeader">Creat account</div>
            <div class="inputs">
              <input 
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First Name"
              />
              <input 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
              />
              <input 
              value={email}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Email"
              />
              <input 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <div className="signupBtn">
              <button>sign-up</button>
            </div>
          </form>
        </Card>
      </div>
    </LayOut>
   )

 }

export default SignUpPage