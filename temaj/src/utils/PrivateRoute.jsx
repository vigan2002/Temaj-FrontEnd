import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function PrivateRoute({ element: Component, ...rest }) {
    const { loggedIn } = useContext(AuthContext);
    return (
        <Route
            {...rest}
            element={loggedIn ? Component : <Navigate to="/login" />}
        />
    );
}

export default PrivateRoute;
