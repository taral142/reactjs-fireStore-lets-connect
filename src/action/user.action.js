import { firestore } from "firebase"
import { userConstants } from "./constants"

export const getRealtimeData = (uid) => {

    return async (dispatch) => {

        dispatch({
            type: `${userConstants.GET_REALTIME_USERS}_REQUEST`,
        })

        const db = firestore();
        const unsubscribe = db.collection("users")
        //.where("state", "==", "CA")
        .onSnapshot((querySnapshot) => {
            const users = [];
            
                querySnapshot.forEach((doc) => {
                    if(doc.data().uid !== uid){
                        users.push(doc.data());
                    }
                });   
            
            // console.log(doc.data());
            dispatch({
                type: `${userConstants.GET_REALTIME_USERS}_SUCCESS`,
                payload: { users }
            })

        });

        return unsubscribe;
    }
}

export const updateMessages = (msgObj) => {

    return async (dispatch) => {

        const db = firestore();

        db.collection('conversation')
        .add({
            ...msgObj,
            isView: false,
            createdAt: new Date()
        })
        .then((data) => {
            console.log(data);
        })
        .catch((error) => {
            console.log(error);
        })
    }
} 

export const getRealtimeMsges = (user) => {

    return async (dispatch) => {

        const db = firestore();

        db.collection('conversation')
        .where('user_uid_1','in',[user.uid_1,user.uid_2])
        .orderBy('createdAt','asc')
        .onSnapshot((querySnapshot) => {
            
            const conversations = [];
            querySnapshot.forEach( (doc) => {

                if((doc.data().user_uid_1 == user.uid_1 && doc.data().user_uid_2 == user.uid_2)
                    ||
                    (doc.data().user_uid_1 == user.uid_2 && doc.data().user_uid_2 == user.uid_1))
                {
                    conversations.push(doc.data())
                }

                if(conversations.length>0)
                {
                    dispatch({
                        type: userConstants.GET_REALTIME_MSGES,
                        payload: { conversations }
                    })
                }
                else{

                    dispatch({
                        type: `${userConstants.GET_REALTIME_MSGES}_FAILIER`,
                        payload: {conversations: []}
                    })
                }
            })

            console.log(conversations);
        })
    }
}