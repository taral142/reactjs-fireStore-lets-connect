import {auth,firestore} from 'firebase'
import { authConstants } from './constants';


export const signup = (user) => {

    return async (dispatch) => {

        dispatch({
            type: `${authConstants.USER_LOGIN}_REQUEST`,
        })
        const db = firestore();

        auth()
        .createUserWithEmailAndPassword(user.email,user.password)
        .then( (data) => {
            console.log(data);
            
            const currentUser = auth().currentUser;
            const name = `${user.firstName} ${user.lastName}`;
            currentUser.updateProfile({
                displayName: name
            })
            .then( () => {
                db.collection('users')
                .doc(data.user.uid)
                .set({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    uid: data.user.uid,
                    createdAt: new Date(),
                    isOnline: true
                })
                .then( () => {
                    const loggedUser = {
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email,
                        uid: data.user.uid,
                    }
                    localStorage.setItem('user',JSON.stringify(loggedUser));
                    console.log("you are succesfully logged in !!!");

                    dispatch({
                        type: `${authConstants.USER_LOGIN}_SUCCESS`,
                        payload: { user: loggedUser }
                    })
                } )
                .catch( (error) => {
                    console.log(error);
                    dispatch({
                        type: `${authConstants.USER_LOGIN}_FAILIER`,
                        payload: { error } 
                    })
                })
            })
            .catch( (er) => {
                console.log(er);
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }
}

export const signIn = (user) => {

    return async (dispatch) => {

        dispatch({
            type: `${authConstants.USER_LOGIN}_REQUEST`,
        })
            auth()
            .signInWithEmailAndPassword(user.email,user.password)
            .then( (data) => {

                    const db = firestore();

                    db.collection('users')
                    .doc(data.user.uid)
                    .update({
                        isOnline: true
                    })
                    .then( () => {
                        //console.log(data);
                        
                        const name = data.user.displayName.split(" ");
                        const firstName = name[0];
                        const lastName = name[1];

                        const loggedUser = {
                            firstName,
                            lastName,
                            email: user.email,
                            uid: data.user.uid,
                        }

                        localStorage.setItem('user',JSON.stringify(loggedUser));

                        dispatch({
                            type : `${authConstants.USER_LOGIN}_SUCCESS`,
                            payload : { user: loggedUser}
                        })

                    })
                    .catch((error) => {
                            console.log(error);
                    })
                }) 
                .catch( (error) => {
                console.log(error);
                dispatch({
                    type : `${authConstants.USER_LOGIN}_FAILIER`,
                    payload : { error }
                })
            
        })
        

        
    }
}

export const isLoggedIn = () => {

    return async (dispatch) => {

        const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
        
        if(user){
            dispatch({
                type : `${authConstants.USER_LOGIN}_SUCCESS`,
                payload : { user }
            })
        }
        else{
            dispatch({
                type : `${authConstants.USER_LOGIN}_FAILIER`,
                payload : { error : "cannot find a user" }
             })
        }
    }
}

export const logOut = (uid) => {

    return async (dispatch) => {

        dispatch({
            type: `${authConstants.USER_LOGOUT}_REQUEST`,
        })

        const db = firestore();

        db.collection('users')
        .doc(uid)
        .update({
            isOnline: false
        })
        .then(()=> {
            auth()
            .signOut()
            .then( () => {

                localStorage.clear();
                dispatch({
                    type: `${authConstants.USER_LOGOUT}_SUCCESS`
                })
            })
            .catch( () => {
                dispatch({
                    type : `${authConstants.USER_LOGOUT}_FAILIER`,
                    payload : { error : "cannot loout" }
                })
            })
        })
        .catch((error) => { 
            console.log("error");
        })

    
    }
}