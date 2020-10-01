import React from 'react'
import Header from '../header'

/**
* @author
* @function LayOut
**/

const LayOut = (props) => {
  return(
      <div>
        <Header />
        {props.children}
      </div>
   )

 }

export default LayOut