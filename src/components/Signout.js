// PrivateRoute.js
import Cookies from 'js-cookie';
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const Signout = () => {
    Cookies.remove("kvsrsUser");
    return <Navigate to="/login" />
};

export default Signout;
