import * as types from "../actionTypes";
import axios from "axios";
const mainURL = 'http://localhost:8080'

//---------------------- USERS
const getUsers = (id) => (dispatch) => {
    dispatch({ type: types.GET_USER_REQUEST });
    const url = mainURL + `/${id}`
    return axios
        .get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((r) => {
            console.log("users", r.data)
            return dispatch({
                type: types.GET_USER_SUCCESS,
                payload: r.data.users,
            });
        })
        .catch((e) => {
            return dispatch({ type: types.GET_USER_FAILURE, payload: e });
        });
};

const updateUsers = (id, body) => (dispatch) => {
    dispatch({ type: types.PUT_USER_REQUEST });
    console.log(id, body)
    const url = mainURL + `/update-user/${id}`
    return axios
        .put(url, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((r) => {
            console.log("User", r.data.user)
            if (r.data.msg) {
                localStorage.setItem("user", JSON.stringify(r.data.user));
                return dispatch({
                    type: types.PUT_USER_SUCCESS,
                    payload: r.data, successmsg: r.data.msg
                });
            } else {
                return dispatch({ type: types.PUT_USER_FAILURE, errmsg: r.data.err });
            }
        })
        .catch((e) => {
            return dispatch({ type: types.PUT_USER_FAILURE, errmsg: e });
        });
};
const getAllUsers = () => (dispatch) => {
    dispatch({ type: types.GET_USER_REQUEST });
    const url = mainURL + `/analytics/users`
    return axios
        .get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((r) => {
            console.log("users", r.data)
            return dispatch({
                type: types.GET_USER_SUCCESS,
                payload: r.data.users,
            });
        })
        .catch((e) => {
            return dispatch({ type: types.GET_USER_FAILURE, payload: e });
        });
};

export { getUsers, updateUsers, getAllUsers };

