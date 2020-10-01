import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getRealtimeData, getRealtimeMsges, updateMessages } from '../../action';
import LayOut from '../../component/layout';

import './style.css';

const User = (props) => {

  const user = props.user;
  const onClick = props.onClick;
 
 



  return (
      <div onClick={() => onClick(user)} className="displayName" >
        <div className="displayPic">
            <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
        </div>
        <div  style={{margin: '0 10px',display: 'flex',justifyContent: 'space-between',flex: '1'}}>
            <span style={{fontWeight: 500,fontSize: '12px',textTransform:'capitalize'}}>{user.firstName} {user.lastName}</span>
            <span className={user.isOnline ? "onlineStatus" : "onlineStatus off"}></span> 
        </div>
      </div>
  )
}

const HomePage = (props) => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  const user = useSelector(state => state.user);
  const [chating,setChating] = useState(false);
  const [chatName,setChatName] = useState("");
  const [message,setMsg] = useState("");
  const [ruid,setRuid] = useState('');

  let unsubscribe;

  useEffect( () => {

    unsubscribe = dispatch(getRealtimeData(auth.uid))
    .then( unsubscribe => {
      return unsubscribe;
    })
    .catch(error => {
      console.log(error)
    });

  }, [] )

  useEffect( () => {
    
    return () => {
      unsubscribe.then(f => f()).catch((e) => console.log(e));
    }

  }, [] )

  const initChat = (user) => {
    setChating(true);
    setChatName(`${user.firstName} ${user.lastName}`);
    setRuid(user.uid)

    dispatch(getRealtimeMsges({uid_1:auth.uid,uid_2:user.uid}));

  }

  const submitMsg = (e) => {

    const msgObj = {
      user_uid_1: auth.uid,
      user_uid_2: ruid,
      message 
    }
    
    dispatch(updateMessages(msgObj))
    .then(() => {
      setMsg("");
    });
    console.log(msgObj);
  }

  return (
    <LayOut>
      <section className="container">
      <div className="listOfUsers">
            {
              user.users.length > 0 ? 
              user.users.map( (user) => {
                return (

                    <User onClick={initChat} key={user.uid} user={user} />
                       
                )
            
              }) : null
            }
        </div>
        
        <div className="chatArea">
               
                    <div className="chatHeader"> 
                    {
                      chating ? chatName : ""
                    }
                    </div>
                    <div className="messageSections">
                    {
                      chating ? 
                      user.conversations.map( (con) => 
                        <div style={{ textAlign: con.user_uid_1 == auth.uid ? 'right' : 'left'}}>
                          <p className="messageStyle" > {con.message}</p>
                        </div>  
                      )
                       : null
                    }
                    </div>
                
                    

              
                  <div className="chatControls">
                      <input type="text" value={message} onChange={(e) => setMsg(e.target.value)} className="textType" placeholder="Type message here" />
                      <button onClick={submitMsg}>Send</button>
                  </div>
                  
        </div>
      </section>
    </LayOut>
  );
}

export default HomePage;