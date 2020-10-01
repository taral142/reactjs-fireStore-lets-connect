import { userConstants } from "../action/constants";

const initialState = {
    users: [],
    conversations:[]
}

export default (state = initialState,action) => {

    switch(action.type) {
        
        case `${userConstants.GET_REALTIME_USERS}_REQUEST`:
            break;
        
        case `${userConstants.GET_REALTIME_USERS}_SUCCESS`:
            state = {
                ...state,
                users: action.payload.users
            }
            break;

        case userConstants.GET_REALTIME_MSGES:
            state = {
                ...state,
                conversations: action.payload.conversations
            }
            break;
            
    }
    return state;
}