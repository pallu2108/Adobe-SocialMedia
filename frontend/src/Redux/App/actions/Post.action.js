import * as types from "../actionTypes";
import axios from "axios";
const mainURL = 'https://adobe-social-z7da.onrender.com/'

//---------------------- POSTS
const getPost = (id) => (dispatch) => {
    dispatch({ type: types.GET_POST_REQUEST });
    const url = mainURL + `posts/${id}`
    return axios
        .get(url)
        .then((r) => {
            console.log("POSTS", r.data)
            return dispatch({
                type: types.GET_POST_SUCCESS,
                payload: r.data.post,
            });
        })
        .catch((e) => {
            return dispatch({ type: types.GET_POST_FAILURE, payload: e });
        });
};

const postPosts = (body) => (dispatch) => {
    console.log("body", body)

    dispatch({ type: types.POST_POST_REQUEST });
    const url = mainURL + `posts/`
    return axios
        .post(url, body)
        .then((r) => {
            console.log("working")
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
        .delete(url)
        .then((r) => {
            console.log("POSTs", r.data.POSTs)
            if (r.data.msg) {
                return dispatch({
                    type: types.DELETE_POST_SUCCESS,
                    payload: r.data.posts,
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
        .put(url, body)
        .then((r) => {
            console.log("POSTs", r.data.POSTs)
            if (r.data.msg) {
                return dispatch({
                    type: types.PUT_POST_SUCCESS,
                    payload: r.data.posts,
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
    const url = mainURL + `analytics/posts`
    return axios
        .get(url)
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
const getTopLikedPosts = () => (dispatch) => {
    dispatch({ type: types.GET_TOP_POST_REQUEST });
    const url = mainURL + `analytics/posts/top-liked`
    return axios
        .get(url)
        .then((r) => {
            console.log("most_liked_posts", r.data)
            return dispatch({
                type: types.GET_TOP_POST_SUCCESS,
                payload: r.data.most_liked_posts,
            });
        })
        .catch((e) => {
            return dispatch({ type: types.GET_TOP_POST_FAILURE, payload: e });
        });
};

export { getPost, postPosts, deletePost, updatePost, getAllPosts, getTopLikedPosts };

