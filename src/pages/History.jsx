import React, { useContext, useState } from "react";
import HistoryItem from "../components/HistoryItem";
import { expenseDataContext } from "../contexts/expenseDatacontext";
import Heading from "../components/Heading";
import { showPopUpFormContext } from "../contexts/showPopUpFormContext.jsx";
import FilterPanel from "../components/FilterPanel";
import TotalExpense from "../components/TotalExpense";
import ContextMenu from "../components/ContextMenu";
import PopUpForm from "../components/PopUpForm";

const History = () => {
  const [expenseData] = useContext(expenseDataContext);
  const [showPopUpForm, setShowPopUpForm] = useContext(showPopUpFormContext);

  const [targetedExpense, setTargetedExpense] = useState({});
  const [contextMenuPosition, setContextMenuPosition] = useState({toShow : false, xPos : 0, yPos : 0, id : null });
  const hideContextMenu = () => {
    setContextMenuPosition({...contextMenuPosition, toShow : false});
  }
  const [filteredExpenseData, setFilteredExpenseData] = useState(expenseData);

  const [categoryApplyFilter, setCategoryApplyFilter] = useState('All');
  const [paymentApplyFilter, setPaymentApplyFilter] = useState('All');
  const [amountApplySort, setAmountApplySort] = useState('NA');
  const [dateApplySort, setDateApplySort] = useState('NA');

  
  return (
    <div className="bg-slate-800 w-full h-fit min-h-screen--70px flex items-center flex-col gap-4 pb-6" onClick={hideContextMenu}>
      <div className="mt-5"> <Heading headline={'Your Transections'}/> </div> 

      {showPopUpForm && <PopUpForm maxDiscriptionLimit={100} setShowPopUpForm={setShowPopUpForm} targetCategory ={targetedExpense.category} targetDiscription={targetedExpense.discription} targetAmount={targetedExpense.amount} targetMode={targetedExpense.mode} targetDate={targetedExpense.date} targetId={targetedExpense.id} />}

      <FilterPanel setFilteredExpenseData={setFilteredExpenseData} categoryApplyFilter={categoryApplyFilter} setCategoryApplyFilter={setCategoryApplyFilter} paymentApplyFilter={paymentApplyFilter} setPaymentApplyFilter={setPaymentApplyFilter} amountApplySort={amountApplySort} setAmountApplySort={setAmountApplySort} dateApplySort={dateApplySort} setDateApplySort={setDateApplySort} />


      <TotalExpense filteredExpenseData={filteredExpenseData} />


      <ContextMenu contextMenuPosition={contextMenuPosition} setContextMenuPosition={setContextMenuPosition} setShowPopUpForm={setShowPopUpForm} setTargetedExpense={setTargetedExpense} />

      {
        (filteredExpenseData.length !== 0) ?
          filteredExpenseData.map((elem) => {
          const changeFormAmount = (enterAmount) => {
            const [numValue, decValue] = enterAmount.split(".");
            let formattedNumValue = '';
            let n = numValue.length;
            let count = 0;
            let flag = true;
            for(let i=n-1; i>=0; i--) {
                count++;
                formattedNumValue = numValue[i] + formattedNumValue;
                if(flag && count == 3) {
                    flag = !flag;
                    count = 0;
                    formattedNumValue = ',' + formattedNumValue;
                } 
                else if(!flag && count == 2) {
                    count = 0;
                    formattedNumValue = ',' + formattedNumValue;
                }
            }
            n = formattedNumValue.length;
            if(formattedNumValue[0] == ',') {
                formattedNumValue = formattedNumValue.slice(1,n);
            }
            if(decValue == undefined) return formattedNumValue;
            return formattedNumValue + '.' + decValue;
          }
          const changeFormDate = (jsonDateString) => {
            const date = new Date(jsonDateString); 
            const optionsDate = { day: 'numeric', month: 'long', year: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-GB', optionsDate);
            const optionsTime = { hour: 'numeric', minute: 'numeric', hour12: true };
            const formattedTime = date.toLocaleTimeString('en-GB', optionsTime);
            return `${formattedDate}, ${formattedTime}`;
          }

         return <HistoryItem
          key={elem.id}
          category= {elem.category} 
          discription={elem.discription}
          amount= {changeFormAmount(elem.amount)}
          mode={elem.mode}
          date={changeFormDate(elem.date)}
          id={elem.id}
          setContextMenuPosition = {setContextMenuPosition}
        />
          })
          : 
          <div className="mt-5 font-bold text-white text-lg">No entry to display.</div>
        }
        {filteredExpenseData.length !== 0 && <div className=" font-bold text-white text-sm">End of List.</div>}
    </div>
  );
};

export default History;
