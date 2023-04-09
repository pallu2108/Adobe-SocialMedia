import * as types from "./actionTypes";

const initalState = {
    topActiveUsers: [],
    topLikedPosts: [],
    posts: [],
    users: [],
    isLoading: false,
    isError: false,
    errmsg: "",
    successmsg: ""
};

const reducer = (state = initalState, action) => {
    const { type, payload } = action;
    switch (type) {

        //--------------------- USER
        case types.GET_USER_REQUEST:
            return { ...state, isLoading: true, isError: false };
        case types.GET_USER_SUCCESS:
            return { ...state, isLoading: false, isError: false, users: payload, successmsg: payload.msg };
        case types.GET_USER_FAILURE:
            return { ...state, isLoading: false, isError: true, users: [], errmsg: payload };

        case types.GET_TOP_ACTIVE_USER_REQUEST:
            return { ...state, isLoading: true, isError: false };
        case types.GET_TOP_ACTIVE_USER_SUCCESS:
            return { ...state, isLoading: false, isError: false, topActiveUsers: payload, successmsg: payload.msg };
        case types.GET_TOP_ACTIVE_USER_FAILURE:
            return { ...state, isLoading: false, isError: true, topActiveUsers: [], errmsg: payload };

        case types.POST_USER_REQUEST:
            return { ...state, isLoading: true, isError: false };
        case types.POST_USER_SUCCESS:
            return { ...state, isLoading: false, isError: false, users: payload, successmsg: payload.msg };
        case types.POST_USER_FAILURE:
            return { ...state, isLoading: false, isError: true, users: [], errmsg: payload };

        case types.DELETE_USER_REQUEST:
            return { ...state, isLoading: true, isError: false };
        case types.DELETE_USER_SUCCESS:
            return { ...state, isLoading: false, isError: false, users: payload, successmsg: payload.msg };
        case types.DELETE_USER_FAILURE:
            return { ...state, isLoading: false, isError: true, users: [], errmsg: payload };

        case types.PUT_USER_REQUEST:
            return { ...state, isLoading: true, isError: false };
        case types.PUT_USER_SUCCESS:
            return { ...state, isLoading: false, isError: false, users: payload, successmsg: payload.msg };
        case types.PUT_USER_FAILURE:
            return { ...state, isLoading: false, isError: true, users: [], errmsg: payload };


        //--------------------- POST
        case types.GET_POST_REQUEST:
            return { ...state, isLoading: true, isError: false };
        case types.GET_POST_SUCCESS:
            return { ...state, isLoading: false, isError: false, posts: payload, successmsg: payload.msg };
        case types.GET_POST_FAILURE:
            return { ...state, isLoading: false, isError: true, posts: [], errmsg: payload };


        case types.GET_TOP_POST_REQUEST:
            return { ...state, isLoading: true, isError: false };
        case types.GET_TOP_POST_SUCCESS:
            return { ...state, isLoading: false, isError: false, topLikedPosts: payload, successmsg: payload.msg };
        case types.GET_TOP_POST_FAILURE:
            return { ...state, isLoading: false, isError: true, topLikedPosts: [], errmsg: payload };


        case types.POST_POST_REQUEST:
            return { ...state, isLoading: true, isError: false };
        case types.POST_POST_SUCCESS:
            return { ...state, isLoading: false, isError: false, posts: payload, successmsg: payload.msg };
        case types.POST_POST_FAILURE:
            return { ...state, isLoading: false, isError: true, posts: [], errmsg: payload };

        case types.DELETE_POST_REQUEST:
            return { ...state, isLoading: true, isError: false };
        case types.DELETE_POST_SUCCESS:
            return { ...state, isLoading: false, isError: false, posts: payload, successmsg: payload.msg };
        case types.DELETE_POST_FAILURE:
            return { ...state, isLoading: false, isError: true, posts: [], errmsg: payload };

        case types.PUT_POST_REQUEST:
            return { ...state, isLoading: true, isError: false };
        case types.PUT_POST_SUCCESS:
            return { ...state, isLoading: false, isError: false, posts: payload, successmsg: payload.msg };
        case types.PUT_POST_FAILURE:
            return { ...state, isLoading: false, isError: true, posts: [], errmsg: payload };

        default:
            return state;
    }
};

export { reducer };
