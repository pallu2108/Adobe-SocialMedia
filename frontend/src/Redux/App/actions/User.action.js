import * as types from "../actionTypes";
import axios from "axios";
const mainURL = 'http://localhost:8080'

//---------------------- USERS
const getUsers = (id) => (dispatch) => {
    dispatch({ type: types.GET_USER_REQUEST });
    const url = mainURL + `/${id}`
    return axios
        .get(url)
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
    const url = mainURL + `/users/${id}`
    return axios
        .put(url, body)
        .then((r) => {
            console.log("User", r.data.user)
            if (r.data.msg) {
                return dispatch({
                    type: types.PUT_USER_SUCCESS,
                    payload: r.data.users,
                    successmsg: r.data.msg
                });
            } else {
                return dispatch({ type: types.PUT_USER_FAILURE, errmsg: r.data.err });
            }
        })
        .catch((e) => {
            return dispatch({ type: types.PUT_USER_FAILURE, errmsg: e });
        });
};

const deleteUsers = (id, body) => (dispatch) => {
    dispatch({ type: types.PUT_USER_REQUEST });
    console.log(id, body)
    const url = mainURL + `/users/${id}`
    return axios
        .delete(url, body)
        .then((r) => {
            console.log("User", r.data.users)
            if (r.data.msg) {
                localStorage.setItem("user", JSON.stringify(r.data.user));
                return dispatch({
                    type: types.PUT_USER_SUCCESS,
                    payload: r.data.users,
                    successmsg: r.data.msg
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
        .get(url)
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

const postUser = (body) => (dispatch) => {
    console.log("body", body)

    dispatch({ type: types.POST_USER_REQUEST });
    const url = mainURL + `/users/`
    return axios
        .post(url, body)
        .then((r) => {
            console.log("working")
            console.log("users post", r.data);
            if (r.data.msg) {
                return dispatch({
                    type: types.POST_USER_SUCCESS,
                    payload: r.data.users,
                    successmsg: r.data.msg
                });
            } else {
                return dispatch({ type: types.POST_USER_FAILURE, errmsg: r.data.err });
            }
        })
        .catch((e) => {
            return dispatch({ type: types.POST_USER_FAILURE, errmsg: e });
        });
};

const getTopActiveUsers = () => (dispatch) => {
    dispatch({ type: types.GET_TOP_ACTIVE_USER_REQUEST });
    const url = mainURL + `/analytics/users/top-active`
    return axios
        .get(url)
        .then((r) => {
            console.log("users", r.data)
            return dispatch({
                type: types.GET_TOP_ACTIVE_USER_SUCCESS,
                payload: r.data.users,
            });
        })
        .catch((e) => {
            return dispatch({ type: types.GET_TOP_ACTIVE_USER_FAILURE, payload: e });
        });
};

export { getUsers, postUser, updateUsers, getAllUsers, getTopActiveUsers, deleteUsers };

