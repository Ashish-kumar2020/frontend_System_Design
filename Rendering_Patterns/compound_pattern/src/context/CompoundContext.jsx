import { createContext, useState } from "react";


const CompoundContext = createContext();


const CompoundProvider = ({children}) => {
    const [value, setValues] = useState("Hello, world");
    return (
        <CompoundContext.Provider value={{value, setValues}}>
            {children}
        </CompoundContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export {CompoundContext, CompoundProvider};