import { Children, createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { masterService } from "../services";

const AuthContext = createContext({
    userData: null,
    setUserData: () => { },
    token: null,
    setTokenValue: () => {},
    logout: () => {},
    getMasterData: () => {},
    shopList: null,
    setAlert: () => {},
})


export const AuthProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [shopList, setShopList] = useState(null);
    const [token, setToken] = useState(null);
    const [alertSeverity, setAlertSeverity] = useState('success')
    const [showAlert, setShowAlert] = useState(false)
    const [alertColor, setAlertColor] = useState('info')
    const [alertMessage, setAlertMessage] = useState(null)

    useEffect(() => {
        let cookieDataStr = Cookies.get("kvsrsUser");
        if (cookieDataStr !== null && cookieDataStr !== undefined && cookieDataStr !== "") {
            let userData = JSON.parse(cookieDataStr);
            setUserData(userData);
            getMasterData(userData.userID);
        }
    }, []);

    const setTokenValue = (value) => {
        setToken(value);
    }

    const handleLogin = (userData) => {
        setUserData(userData);
    }

    const handleLogout = () => {
        setUserData(null);
        setToken(null);
    }

    const setAlert = (alert) => {
        setAlertSeverity(alert.severity)
        setAlertColor(alert.color)
        setAlertMessage(alert.message)
        setShowAlert(alert.show)
    }    

    const getMasterData = (userID) => {
        let postData = { 'userID': userID }
        masterService.getMasterData(postData).then(result => {
            if (result) {
                setShopList(result.shopMasterList);
            }
        }).catch(err => {

        })
    }


    return (
        <AuthContext.Provider value={{
            userData,
            setUserData: handleLogin,
            token,
            setTokenValue,
            logout: handleLogout,
            getMasterData,
            shopList,
            setAlert: setAlert,
            alertSeverity,
            showAlert,
            alertColor,
            alertMessage
        }}>

        </AuthContext.Provider>
    )
};

export default AuthContext;