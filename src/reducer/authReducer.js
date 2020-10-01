import { authConstants } from '../action/constants';

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    uid: '',
    isAuthenticated: false,
    isAuthenticating: false,
    error: null
}

export default (state = initialState,action) => {

    console.log(action);

    switch(action.type){
    
        case `${authConstants.USER_LOGIN}_REQUEST`:
            state = {
                ...state,
                isAuthenticating: true,
            }
            break;

        case `${authConstants.USER_LOGIN}_SUCCESS`:
            state = {
                ...state,
                ...action.payload.user,
                isAuthenticated: true,
                isAuthenticating:false
            }
            break;
        
        case `${authConstants.USER_LOGIN}_FAILIER`:
            state = {
                ...state,
                error: action.payload.error,
                isAuthenticating: false,
                isAuthenticated: false
            }
            break;
        
        case `${authConstants.USER_LOGOUT}_REQUEST`:
            break;
        
        case `${authConstants.USER_LOGOUT}_SUCCESS`:
            state = {
                ...initialState,
            }
            break;
       
        case `${authConstants.USER_LOGOUT}_FAILIER`:
            state = {
                ...state,
            }
            break;
    }

    return state;
}


