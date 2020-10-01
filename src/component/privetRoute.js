import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'

/**
* @author
* @function PrivetRoute
**/

const PrivetRoute = ({component : Component, ...rest}) => {
  return(
    <Route {...rest} component = {(props) => {
      const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
      if(user){
        return <Component {...props}/>
      }
      else{
        return <Redirect to='/login' />
      }
    }}/>
   )

 }

export default PrivetRoute;