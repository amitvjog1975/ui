import { createContext, useState } from "react";
const LoaderContext = createContext();


export function LoaderProvider({ children }) {
    const [loading, setLoading] = useState(false);

    return (
        <LoaderContext.Provider value={{
            loading,
            setLoading
        }}>
            {children}
        </LoaderContext.Provider>
    )
};
export default LoaderContext;