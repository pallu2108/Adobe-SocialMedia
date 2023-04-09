import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const token = useSelector((state) => state.AuthReducer.token);
    const isAuth = useSelector((state) => state.AuthReducer.isAuth);
    console.log(token);
    console.log(isAuth);
    if (token) {
        return children;
    } else {
        return <Navigate to="/login" />;
    }
};

export default PrivateRoute;