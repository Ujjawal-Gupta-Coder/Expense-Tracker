import React, { useState } from "react";
import HistoryItem from "../components/HistoryItem";
import Heading from "../components/Heading";
import FilterPanel from "../components/FilterPanel";
import TotalExpense from "../components/TotalExpense";
import ContextMenu from "../components/ContextMenu";
import PopUpForm from "../components/PopUpForm";
import UserGuide from "../components/UserGuide.jsx";
import Joyride from "react-joyride";
import store from "../store.js";

const History = () => {
  const {expenseData} = store();
  const {showPopUpForm, setShowPopUpForm} = store();

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
  const [runTour, setRunTour] = useState(localStorage.getItem("historyPageTourCompleted") !== "true");

  const steps = [
    {
      target: ".step-1",
      content: "Welcome to the History Page! Here, you can view all your past expenses in one place. Use the filters to navigate through your spending history effortlessly. Let's take a quick tour!",
      disableBeacon: true
    },
    {
      target: ".step-2",
      content: "Easily find specific expenses by selecting a category from the filter dropdown. This helps you track where your money is going with just a few clicks!",
      disableBeacon: true
    },
    {
      target: ".step-3",
      content: "Choose between online and offline transactions to see how you spend your money. This makes it easier to analyze your cash vs. digital expenses!",
      disableBeacon: true
    },
    {
      target: ".step-4",
      content: "Arrange your expenses in increasing or decreasing order based on the amount. This helps you quickly spot your highest and lowest expenses!",
      disableBeacon: true
    },
    {
      target: ".step-5",
      content: "Easily view expenses for today, the last 7 days, this month, or this year. Quickly track your spending over different time ranges!",
      disableBeacon: true
    },
    {
      target: ".step-6",
      content: "See the sum of all your expenses in one place. This value updates dynamically based on the filters you apply, giving you real-time insights into your spending!",
      disableBeacon: true
    },
    {
      target: ".step-7",
      content: "Here, you can see all your recorded expenses with details like category, description, date, amount, and payment mode. Right-click on any entry to edit or delete it using the context menu for quick management!",
      disableBeacon: true
    },
    {
      target: ".step-last",
      content: "Need help? Click this button anytime to restart the tour and explore all the features again. Stay in control and navigate with ease!",
      disableBeacon: true
    },
  ]
  
  return (
    <div className="bg-slate-800 w-full h-fit min-h-screen--70px flex items-center flex-col gap-4 pb-6" onClick={hideContextMenu}>
      <div className="absolute"> 
      <Joyride steps = {steps} 
          run = {runTour}
          callback={({status}) => {
            if(status === "finished" || status === "skipped") {
              localStorage.setItem("historyPageTourCompleted", "true");
              setRunTour(false);
            }
          }}
          continuous showSkipButton showProgress disableScrolling disableOverlayClose
          locale={{
            last: 'Finish',
            next: 'Next',
            skip: 'Skip',
          }} 
          
          styles={{
            options: {
              primaryColor: 'green',
              textColor: "white",
              backgroundColor: '#465878',
              arrowColor:"yellow"
            },
            buttonNext: {
              border: "1px solid white",
              borderRadius: "15px"
            },
            buttonBack: {
              color: "white"
            },
          }}/>
      </div>
     <UserGuide text={"Guide For History Page"} setRunTour={setRunTour} />
      <Heading headline={'Your Transections'}/>  

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
