const { auth } = require("firebase");

export const authConstants = {
    USER_LOGIN: 'USER_LOGIN',
    USER_LOGOUT: 'USER_LOGOUT'
} 

export const userConstants = {
    GET_REALTIME_USERS: 'GET_REALTIME_USERS',
    GET_REALTIME_MSGES: 'GET_REALTIME_MSGES',
    GET_REALTIME_MSGES_FAILIER: 'GET_REALTIME_MSGES_FAILIER'
}