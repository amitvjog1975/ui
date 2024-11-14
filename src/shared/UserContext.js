import { Children, createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';
import { masterService } from "../services";

const UserContext = createContext({
    userData: null,
    setUserData: () => { },
    token: null,
    setTokenValue: () => {},
    logout: () => {},
    getMasterData: () => {},
    shopList: null,
    setAlert: () => {},
})


export const UserProvider = ({ children }) => {
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
        <UserContext.Provider value={{
            userData,
            getMasterData,
            shopList,
        }}>

        </UserContext.Provider>
    )
};

export default UserContext;