import { createContext, useState } from "react";
export const showPopUpFormContext = createContext();
export function ShowPopUpFormProvider({children}) {
    const [showPopUpForm, setShowPopUpForm] = useState(false);
    return <showPopUpFormContext.Provider value={[showPopUpForm, setShowPopUpForm]} >
        {children}
    </showPopUpFormContext.Provider>
}