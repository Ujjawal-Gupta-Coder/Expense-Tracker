import React, { useContext, useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import { expenseCategories, months } from "../../helper";
import { expenseDataContext } from "../contexts/expenseDatacontext";
import Heading from "../components/Heading";
import DoughnutChart from "../components/doughnutChart";

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
  return (
    <div className="bg-slate-800 w-full min-h-screen--70px h-fit flex flex-col items-center gap-6 pt-5">
      <Heading headline={'Expense Analytics Dashboard'}/>
      

      <div className="flex flex-col sm:flex-row items-center justify-between gap-y-2 w-[60%]">
        <div className="flex items-center justify-center font-bold text-sm md:text-md lg:text-lg gap-2 text-white">
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
        
        <div className="flex items-center justify-center font-bold text-sm md:text-md lg:text-lg gap-2 text-white">
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
      

      {/* {!expenseData.empty && ( */}
        <div className="w-full px-5 lg:px-12 pb-8 flex justify-center items-center gap-4 flex-col">

           <div className="flex flex-col md:flex-row justify-center items-center gap-4 w-full">

              <div className=" bg-slate-600 rounded-2xl text-white font-bold w-full md:w-[50%] px-2 py-1">
                <BarChart dataSet={perYearMonthWiseAmount} label={months} color={"#f23379"} />
              </div>

              
              
              <div className="bg-slate-600 rounded-2xl text-white font-bold w-full md:w-[50%] px-2 py-1">
                <BarChart dataSet={perYearCategoryWiseAmount} label={expenseCategories} color={"aqua"} />
              </div>


            </div> 

            <div className="flex flex-col-reverse md:flex-row justify-center items-center gap-4 w-full">
              <div className="bg-slate-600 rounded-2xl text-white font-bold w-full md:w-[66%] px-2 py-1">
              <BarChart dataSet={dateWiseMonthAmount} label={dateList} color={"#FFEB00"}/>
              </div>

              <div className="bg-slate-600 rounded-2xl text-white font-bold w-[50%] md:w-[34%] px-2 py-1">
                <DoughnutChart dataSet={perYearPaymentModeWiseAmount} />
              </div>

            </div>
          
        </div>
      {/* )} */}
    </div>
  );
};

export default Analysis;
