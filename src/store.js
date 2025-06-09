import {create} from 'zustand';
import { initialExpenseDataValue } from './helper';

const store = create((set, get) => ({
    'demoMode' : localStorage.getItem('demoMode'),
    'toggleDemoMode' : () => {
        const { demoMode } = get()
        if(demoMode) {
            set({demoMode: false})
            localStorage.setItem('demoMode', false);
        } 
        else {
            set({demoMode: true})
            localStorage.setItem('demoMode', true);
        } 
    },

    'expenseData' : initialExpenseDataValue(),
    setExpenseData : (data) => {
        set({expenseData: data});
    },

    'showPopUpForm': false,
    'setShowPopUpForm': (value) => {
        set({showPopUpForm: value})
    }
    
}))

export default store;