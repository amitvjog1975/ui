// EODContext.js
import React, { createContext, useState } from 'react';

const EODContext = createContext();

export function EODProvider ({ children }) {
    const [eodShopId, setEodShopId] = useState(null);
    const [eodAccountDate, setEodAccountDate] = useState(null);


    const UpdateEodShopID = (value) => {
        setEodShopId(value);
    }

    const UpdateEodAccountDate = (value) => {
        setEodAccountDate(value);
    }

    return (
        <EODContext.Provider value={{ eodShopId, UpdateEodShopID, eodAccountDate, UpdateEodAccountDate }}>
            {children}
        </EODContext.Provider>
    );
};

export default EODContext;