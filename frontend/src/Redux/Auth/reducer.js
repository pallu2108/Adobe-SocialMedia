import * as types from "./actionTypes";
import * as user_types from "../App/actionTypes";

const initalState = {
    isAuth: false,
    user: JSON.parse(localStorage.getItem('user')) || {},
    token: localStorage.getItem('token') || '',
    isLoading: false,
    isError: false,
    errmsg: "",
    successmsg: ""
};

const reducer = (state = initalState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.GET_LOGIN_USER_REQUEST:
            return { ...state, isLoading: true, isError: false };
        case types.GET_LOGIN_USER_SUCCESS:
            return { ...state, isLoading: false, isError: false, user: payload, isAuth: true, token: localStorage.getItem('token'), user: JSON.parse(localStorage.getItem("user")), successmsg: payload.msg };
        case types.GET_LOGIN_USER_FAILURE:
            return { ...state, isLoading: false, isError: true, user: {}, isAuth: false, token: '', errmsg: payload };

        case types.GET_SIGNUP_USER_REQUEST:
            return { ...state, isLoading: true, isError: false };
        case types.GET_SIGNUP_USER_SUCCESS:
            return { ...state, isLoading: false, isError: false, successmsg: payload.msg };
        case types.GET_SIGNUP_USER_FAILURE:
            return { ...state, isLoading: false, isError: true, errmsg: payload };

        case user_types.PUT_USER_REQUEST:
            return { ...state, isLoading: true, isError: false };
        case user_types.PUT_USER_SUCCESS:
            return { ...state, isLoading: false, isError: false, user: payload, user: JSON.parse(localStorage.getItem("user")), successmsg: payload.msg };
        case user_types.PUT_USER_FAILURE:
            return { ...state, isLoading: false, isError: true, errmsg: payload };



        case types.LOGOUT_USER:
            localStorage.clear();
            return { ...state, isLoading: false, isError: false, isAuth: false, token: '' };

        default:
            return state;
    }
};

export { reducer };
