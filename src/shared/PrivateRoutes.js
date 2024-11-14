// PrivateRoute.js
import dayjs from 'dayjs';
import Cookies from 'js-cookie';
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const PrivateRoutes = () => {
    let cookieDataStr = Cookies.get("kvsrsUser");    
    if (cookieDataStr == null || cookieDataStr == undefined || cookieDataStr == "") {
        return <Navigate to="/login" />
    }
    let cookieData = JSON.parse(cookieDataStr);
    if (cookieData.token) {
        //const expirationDate = cookieData.expires;
        //const isExpired = expirationDate < Date.now();
        if (cookieData.expires){
            let expiry = dayjs(cookieData.expires);
            let curDate = dayjs();
            if(expiry < curDate){
                return <Navigate to="/login" />
            } else {
                return (<Outlet />)
            }
        } else {
            return <Navigate to="/login" />
        }
        
    } else {
        return <Navigate to="/login" />
    } 

    //return (user ? <Outlet /> : <Navigate to="/login" />);
};

export default PrivateRoutes;
