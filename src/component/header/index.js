import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { logOut } from '../../action/auth.action'
import './style.css'

/**
* @author
* @function Header
**/

const Header = (props) => {

    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();

  return(
    <header className="header">
        <div className="leftMenu">
            <div className="logo">Web Messenger</div>

            {
                !auth.isAuthenticated ?
                <ul className="loginSignUpMenu">
                    <li><NavLink to={'/login'}>Login</NavLink></li>
                    <li><NavLink to={'/signup'}>sign-up</NavLink></li>
                </ul> 
                : null

            }

        </div>
        
        <div className="greatings">
        {
            auth.isAuthenticated ?
            `Hello ${auth.firstName} ${auth.lastName}`
            : ""
        }
        </div>

        {
            auth.isAuthenticated ?
            <ul className="rightMenu">
                <Link to={'#'} onClick={() => {
                    dispatch(logOut(auth.uid));
                }}>Logout</Link>
            </ul>
            : ""
        }

    </header>
   )

 }

export default Header
