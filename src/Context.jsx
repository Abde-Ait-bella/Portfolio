import { useContext, createContext, useState } from "react"; 

export const ModeContext = createContext();

export const ModeProvider = ({children}) => {

    const [mode, setMode] = useState('dark');

    const toggleMode = () => { 
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
     }

     return (
        <>
            <ModeContext.Provider value={{toggleMode, mode}}>
                {children}
            </ModeContext.Provider>
        </>
     )
}

export const UseMode = () => {
    return useContext(ModeContext);
};