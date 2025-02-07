import { createContext, useState } from "react";
export const expenseDataContext = createContext();
export function ExpenseDataProvider({children}) {
    const [expenseData, setExpenseData] = useState(JSON.parse(localStorage.getItem('expenseData')))
    if(expenseData === null) setExpenseData([])

    return <expenseDataContext.Provider value={[expenseData, setExpenseData]}>
        {children}
    </expenseDataContext.Provider>
}