import { createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { shopService } from "../services";

const UserContext = createContext();


export function UserProvider({ children }) {
    const [userData, setUserData] = useState(null);
    const [shopList, setShopList] = useState(null);
    const [token, setToken] = useState(null);
    const [eodShopId, setEodShopId] = useState(sessionStorage.getItem('eodShopId') || null);
    const [eodAccountDate, setEodAccountDate] = useState(sessionStorage.getItem('eodAccountDate') || null);
    const [isAuthenticated, setIsAuthenticated] = useState(null);

    useEffect(() => {
        let cookieDataStr = Cookies.get("kvsrsUser");
        if (cookieDataStr !== null && cookieDataStr !== undefined && cookieDataStr !== "") {
            let userData = JSON.parse(cookieDataStr);
            setUserData(userData);
            setIsAuthenticated(true);

        }
    }, []);

    useEffect(() => {
        if (userData !== null && userData !== undefined) {
            shopService.getShopMasterList().then(result => {
                setShopList(result.data);
            }).catch(error => {
                console.log(error);
            });
        }
    }, [userData]);

    useEffect(() => {
        console.log('isAuthenticated - ' + isAuthenticated);
    }, [isAuthenticated]);

    const UpdateEodShopID = (value) => {
        sessionStorage.setItem('eodShopId', value);
        setEodShopId(value);
    }

    const UpdateEodAccountDate = (value) => {
        sessionStorage.setItem('eodAccountDate', value);
        setEodAccountDate(value);
    }

    const setTokenValue = (value) => {
        setToken(value);
    }

    const updateIsAuthenticated = (value) => {
        setIsAuthenticated(value);
    }

    const updateUserData = (userData) => {
        setIsAuthenticated(true);
        setUserData(userData);
    }

    const handleLogout = () => {
        setUserData(null);
        setToken(null);
        setIsAuthenticated(false);
    }
    const updateShopList = (list) => {
        setShopList(list);
    }

    return (
        <UserContext.Provider value={{
            userData,
            updateUserData,
            token,
            setTokenValue,
            handleLogout,
            shopList,
            updateShopList,
            eodShopId,
            UpdateEodShopID,
            eodAccountDate,
            UpdateEodAccountDate,
            isAuthenticated,
            updateIsAuthenticated
        }}>
            {children}
        </UserContext.Provider>
    )
};

export default UserContext;
