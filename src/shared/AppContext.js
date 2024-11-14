import { Children, createContext, useEffect, useState } from "react";
import Cookies from 'js-cookie';

const AppContext = createContext({
    setAlert: () => {},
})


export const AppProvider = ({ children }) => {
    const [alertSeverity, setAlertSeverity] = useState('success')
    const [showAlert, setShowAlert] = useState(false)
    const [alertColor, setAlertColor] = useState('info')
    const [alertMessage, setAlertMessage] = useState(null)

    const setAlert = (alert) => {
        setAlertSeverity(alert.severity)
        setAlertColor(alert.color)
        setAlertMessage(alert.message)
        setShowAlert(alert.show)
    }    

    return (
        <AppContext.Provider value={{
            setAlert: setAlert,
            alertSeverity,
            showAlert,
            alertColor,
            alertMessage
        }}>

        </AppContext.Provider>
    )
};

export default AppContext;