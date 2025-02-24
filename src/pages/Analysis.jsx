import React, { useContext, useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import { expenseCategories, months } from "../../helper";
import { expenseDataContext } from "../contexts/expenseDatacontext";
import Heading from "../components/Heading";
import DoughnutChart from "../components/DoughnutChart";
import UserGuide from "../components/UserGuide";
import Joyride from "react-joyride";

const Analysis = () => {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setselectedMonth] = useState(new Date().getMonth());

  const [expenseData] = useContext(expenseDataContext);
  let categoryToIndexMap = {};
  let dateList = [
    "Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7", "Day 8", "Day 9", "Day 10",
  "Day 11", "Day 12", "Day 13", "Day 14", "Day 15", "Day 16", "Day 17", "Day 18", "Day 19", "Day 20",
  "Day 21", "Day 22", "Day 23", "Day 24", "Day 25", "Day 26", "Day 27", "Day 28", "Day 29", "Day 30",
  "Day 31"
  ];

  const [perYearMonthWiseAmount, setPerYearMonthWiseAmount] = useState(
    new Array(12).fill(0)
  );
  const [perYearCategoryWiseAmount, setPerYearCategoryWiseAmount] = useState(
    new Array(expenseCategories.length).fill(0)
  );
  const [perYearPaymentModeWiseAmount, setPerYearPaymentModeWiseAmount] =
    useState(new Array(2).fill(0));

  const [dateWiseMonthAmount, setDateWiseMonthAmount] = useState(
    new Array(31).fill(0)
  );

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setselectedMonth(e.target.value);
  };
  useEffect(() => {
    categoryToIndexMap = expenseCategories.reduce((prev, elem, i) => {
      prev[elem] = i;
      return prev;
    }, {});

    let newMonthWiseAmount = new Array(12).fill(0);
    let newCategoryWiseAmount = new Array(expenseCategories.length).fill(0);
    let newPaymentModeWiseAmount = new Array(2).fill(0);
    let newDateMonthAmount = new Array(31).fill(0);


    expenseData.forEach((elem) => {
      const date = new Date(elem.date);

      if (date.getFullYear() == selectedYear || selectedYear == 1) {

        newMonthWiseAmount[date.getMonth()] += Number(elem.amount);

        if (date.getMonth() == selectedMonth || selectedMonth == 12) {
          newDateMonthAmount[date.getDate() - 1] += Number(elem.amount);
          newCategoryWiseAmount[categoryToIndexMap[elem.category]] += Number(elem.amount);
          if (elem.mode == "Online") newPaymentModeWiseAmount[0] += Number(elem.amount);
          else newPaymentModeWiseAmount[1] += Number(elem.amount);
        }

        
      }
    });

    setPerYearMonthWiseAmount(newMonthWiseAmount);
    setPerYearCategoryWiseAmount(newCategoryWiseAmount);
    setPerYearPaymentModeWiseAmount(newPaymentModeWiseAmount);
    setDateWiseMonthAmount(newDateMonthAmount);
  }, [selectedYear, selectedMonth]);

  const [runTour, setRunTour] = useState(localStorage.getItem("AnalyticsTourCompleted") !== "true");
  const steps = [
    {
      target: ".step-1",
      content: "Welcome to the Analytics Page! Get a visual breakdown of your expenses with insightful charts and graphs. Analyze your spending patterns easily and make smarter financial decisions. Let’s explore!",
      disableBeacon: true
    },
    {
      target: ".step-2",
      content: "View expense analytics for any year from the last five or select 'All' for a complete spending overview. Track trends over time and gain deeper insights!",
      disableBeacon: true
    },
    {
      target: ".step-3",
      content: "Select a specific month to analyze your spending or choose 'All' to see a complete overview for the selected year. Gain better insights into your monthly expenses!",
      disableBeacon: true
    },
    {
      target: ".step-4",
      content: "This chart shows how your expenses vary month by month. Spot spending trends and manage your budget better!",
      disableBeacon: true
    },
    {
      target: ".step-5",
      content: "See how your expenses are distributed across different categories. This chart helps you identify in which category most of your money is going!",
      disableBeacon: true
    },
    {
      target: ".step-6",
      content: "This chart shows your expenses for each day of the month. Easily spot high-spending days and manage your budget more effectively!",
      disableBeacon: true
    },
    {
      target: ".step-7",
      content: "Compare your expenses based on payment mode. Easily track how much you spend via online transactions versus offline purchases!",
      disableBeacon: true
    },
    {
      target: ".step-last",
      content: "Need help? Click this button anytime to restart the tour and explore all the features again. Stay in control and navigate with ease!",
      disableBeacon: true
    },
  ]
  return (
    <div className="bg-slate-800 w-full min-h-screen--70px h-fit flex flex-col items-center gap-6">
      <div className="absolute">
      <Joyride
        steps={steps}
        run = {runTour}
        callback={({status}) => {
          if(status === "finished" || status === "skipped") {
            localStorage.setItem("AnalyticsTourCompleted", "true");
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
        }}
      />
      </div>
      <div className="flex justify-center items-center flex-col gap-4">
        <UserGuide text={"Guide For Analysis Page"} setRunTour={setRunTour} />
        <Heading headline={'Expense Analytics Dashboard'}/>
      </div>
      

      <div className="flex flex-col sm:flex-row items-center justify-between gap-y-2 w-[60%]">
        <div className="flex items-center justify-center font-bold text-sm md:text-md lg:text-lg gap-2 text-white step-2">
          <p >Select Year:</p>
          <form>
          <select value={selectedYear} onChange={handleYearChange} className="rounded-lg outline-none px-2 py-1 bg-sky-500">
            <option value={1}>
              ALL
            </option>
            <option value={new Date().getFullYear()}>
              {new Date().getFullYear()}
            </option>
            <option value={new Date().getFullYear() - 1}>
              {new Date().getFullYear() - 1}
            </option>
            <option value={new Date().getFullYear() - 2}>
              {new Date().getFullYear() - 2}
            </option>
            <option value={new Date().getFullYear() - 3}>
              {new Date().getFullYear() - 3}
            </option>
            <option value={new Date().getFullYear() - 4}>
              {new Date().getFullYear() - 4}
            </option>
          </select>
        </form> 
        </div>
        
        <div className="flex items-center justify-center font-bold text-sm md:text-md lg:text-lg gap-2 text-white step-3">
          <p >Select Month:</p>
          <form>
          <select value={selectedMonth} onChange={handleMonthChange} className="rounded-lg outline-none px-2 py-1 bg-green-500">

            <option value={12}>ALL</option>
            {
              months.map((elem, index) => {
                return <option key={index} value={index}>
                {elem}
              </option>
              })
            }

          </select>
        </form> 
        </div>
      </div>
      
      <div className="w-full px-5 lg:px-12 pb-8 flex justify-center items-center gap-4 flex-col">

           <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full">

              <div className=" bg-slate-600 rounded-2xl text-white font-bold w-full md:w-[50%] px-2 py-1 step-4">
                <BarChart dataSet={perYearMonthWiseAmount} label={months} color={"#f23379"} />
              </div>

              
              
              <div className="bg-slate-600 rounded-2xl text-white font-bold w-full md:w-[50%] px-2 py-1 step-5">
                <BarChart dataSet={perYearCategoryWiseAmount} label={expenseCategories} color={"aqua"} />
              </div>


            </div> 

            <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-4 w-full">
              <div className="bg-slate-600 rounded-2xl text-white font-bold w-full md:w-[66%] px-2 py-1 step-6">
              <BarChart dataSet={dateWiseMonthAmount} label={dateList} color={"#FFEB00"}/>
              </div>

              <div className="bg-slate-600 rounded-2xl text-white font-bold w-[50%] md:w-[34%] px-2 py-1 step-7">
                <DoughnutChart dataSet={perYearPaymentModeWiseAmount} />
              </div>

            </div>
          
      </div>
    </div>
  );
};

export default Analysis;
