import * as types from "./actionTypes";
import axios from "axios";

const mainURL = "http://localhost:8080/users"

const loginUser = (body) => (dispatch) => {
    dispatch({ type: types.GET_LOGIN_USER_REQUEST });
    const url = mainURL + `/login`
    return axios
        .post(url, body)
        .then((r) => {
            if (r.data.msg) {
                localStorage.setItem("token", r.data.token);
                localStorage.setItem("user", JSON.stringify(r.data.user));
                return dispatch({
                    type: types.GET_LOGIN_USER_SUCCESS,
                    payload: r.data, successmsg: r.data.msg
                });
            } else {
                return dispatch({ type: types.GET_LOGIN_USER_FAILURE, errmsg: r.data.err })
            }
        })
        .catch((e) => {
            return dispatch({ type: types.GET_LOGIN_USER_FAILURE, msg: e });
        });
};

const signupUser = (body) => (dispatch) => {
    dispatch({ type: types.GET_SIGNUP_USER_REQUEST });
    const url = mainURL + `/`
    return axios
        .post(url, body)
        .then((r) => {
            if (r.data.msg) {
                return dispatch({
                    type: types.GET_SIGNUP_USER_SUCCESS, payload: r.data, successmsg: r.data.msg,
                });
            } else {
                return dispatch({ type: types.GET_SIGNUP_USER_FAILURE, errmsg: r.data.err })
            }
        })
        .catch((e) => {
            return dispatch({ type: types.GET_SIGNUP_USER_FAILURE });
        });
};
const logout = () => (dispatch) => {
    dispatch({ type: types.LOGOUT_USER });
}

export { loginUser, signupUser, logout };

