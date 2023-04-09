import * as types from "../actionTypes";
import axios from "axios";
const mainURL = 'http://localhost:8080'

//---------------------- POSTS
const getPost = (id) => (dispatch) => {
    dispatch({ type: types.GET_POST_REQUEST });
    const url = mainURL + `posts/${id}`
    return axios
        .get(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((r) => {
            console.log("POSTS", r.data)
            return dispatch({
                type: types.GET_POST_SUCCESS,
                payload: r.data.POSTs,
            });
        })
        .catch((e) => {
            return dispatch({ type: types.GET_POST_FAILURE, payload: e });
        });
};

const postPosts = (body) => (dispatch) => {
    dispatch({ type: types.POST_POST_REQUEST });
    const url = mainURL + `posts/`
    return axios
        .post(url, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((r) => {
            console.log("posts post", r.data);
            if (r.data.msg) {
                return dispatch({
                    type: types.POST_POST_SUCCESS,
                    payload: r.data.posts,
                    successmsg: r.data.msg
                });
            } else {
                return dispatch({ type: types.POST_POST_FAILURE, errmsg: r.data.err });
            }
        })
        .catch((e) => {
            return dispatch({ type: types.POST_POST_FAILURE, errmsg: e });
        });
};


const deletePost = (id) => (dispatch) => {
    dispatch({ type: types.DELETE_POST_REQUEST });
    console.log(id)
    const url = mainURL + `posts/${id}`
    return axios
        .delete(url, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((r) => {
            console.log("POSTs", r.data.POSTs)
            if (r.data.msg) {
                return dispatch({
                    type: types.DELETE_POST_SUCCESS,
                    payload: r.data.POSTs,
                    successmsg: r.data.msg
                });
            } else {
                return dispatch({ type: types.DELETE_POST_FAILURE, errmsg: r.data.err });
            }
        })
        .catch((e) => {
            return dispatch({ type: types.DELETE_POST_FAILURE, errmsg: e });
        });
};

const updatePost = (id, body) => (dispatch) => {
    dispatch({ type: types.PUT_POST_REQUEST });
    console.log(id)
    const url = mainURL + `posts/${id}`
    return axios
        .put(url, body, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        })
        .then((r) => {
            console.log("POSTs", r.data.POSTs)
            if (r.data.msg) {
                return dispatch({
                    type: types.PUT_POST_SUCCESS,
                    payload: r.data.POSTs,
                    successmsg: r.data.msg
                });
            } else {
                return dispatch({ type: types.PUT_POST_FAILURE, errmsg: r.data.err });
            }
        })
        .catch((e) => {
            return dispatch({ type: types.PUT_POST_FAILURE, errmsg: e });
        });
};

const getAllPosts = () => (dispatch) => {
    dispatch({ type: types.GET_POST_REQUEST });
    const url = mainURL + `/analytics/posts`
    return axios
        .get(url,
            {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBAZ21haWwuY29tIiwiaWF0IjoxNjgwOTg5Nzc3fQ.tVgMKAIQ8liK4UIFCastYGvp_tqrNdUsVi7V7J2QmY4`,
                },
            }
        )
        .then((r) => {
            console.log("POSTS", r.data)
            return dispatch({
                type: types.GET_POST_SUCCESS,
                payload: r.data.posts,
            });
        })
        .catch((e) => {
            return dispatch({ type: types.GET_POST_FAILURE, payload: e });
        });
};

export { getPost, postPosts, deletePost, updatePost, getAllPosts };

