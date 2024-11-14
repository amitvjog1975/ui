// PrivateRoute.js
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useUserContext } from './UserContext';

const PublicRoutes = () => {
    return (<Outlet />);
};

export default PublicRoutes;
