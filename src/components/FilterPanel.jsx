import React, { useContext, useEffect } from "react";
import { expenseCategories } from "../../helper";
import { expenseDataContext } from "../contexts/expenseDatacontext";

const FilterPanel = ({
  setFilteredExpenseData,
  categoryApplyFilter,
  setCategoryApplyFilter,
  paymentApplyFilter,
  setPaymentApplyFilter,
  amountApplySort,
  setAmountApplySort,
  dateApplySort,
  setDateApplySort,
}) => {
  const [expenseData] = useContext(expenseDataContext);

  const handleCategoryFilter = (event) => {
    setCategoryApplyFilter(event.target.value);
  };
  const handlePaymentFilter = (event) => {
    setPaymentApplyFilter(event.target.value);
  };
  const handleAmountSort = (event) => {
    setAmountApplySort(event.target.value);
  };
  const handleDateSort = (event) => {
    setDateApplySort(event.target.value);
  };

  const populateFilteredExpenseData = () => {
    let temp = [...expenseData];

    // filter Category logic
    if (categoryApplyFilter !== "All") {
      temp = temp.filter((elem) => {
        if (elem.category === categoryApplyFilter) return true;
        else return false;
      });
    }

    // filter mode of payment logic
    if (paymentApplyFilter !== "All") {
      temp = temp.filter((elem) => {
        if (elem.mode === paymentApplyFilter) return true;
        else return false;
      });
    }

    // sort amount logic
    if (amountApplySort === "Increasing") {
      temp.sort((a, b) => {
        return a.amount - b.amount;
      });
    } else if (amountApplySort === "Decreasing") {
      temp.sort((a, b) => {
        return b.amount - a.amount;
      });
    }

    // sort date Logic]
    if (dateApplySort === "Today") {
      temp = temp.filter((elem) => {
        const presentDate = new Date().toLocaleDateString();
        const inputDate = new Date(elem.date).toLocaleDateString();
        return inputDate === presentDate;
      });
    } else if (dateApplySort === "LastWeak") {
      const presentDate = new Date();
      const sevenDayAgo = new Date();
      sevenDayAgo.setDate(presentDate.getDate() - 7);
      temp = temp.filter((elem) => {
        const inputDate = new Date(elem.date);
        return sevenDayAgo < inputDate && presentDate >= inputDate;
      });
    } else if (dateApplySort === "LastMonth") {
      const presentMonth = new Date().getMonth();
      const presentYear = new Date().getFullYear();
      temp = temp.filter((elem) => {
        const inputMonth = new Date(elem.date).getMonth();
        const inputYear = new Date(elem.date).getFullYear();
        return presentMonth === inputMonth && presentYear === inputYear;
      });
    } else if (dateApplySort === "LastYear") {
      const presentYear = new Date().getFullYear();
      temp = temp.filter((elem) => {
        const inputYear = new Date(elem.date).getFullYear();
        return presentYear === inputYear;
      });
    }

    // arrange date according to latest first
    if (amountApplySort === "NA")
      temp.sort((a, b) => new Date(b.date) - new Date(a.date));

    // finally display the result on screen after apply filter and sort
    setFilteredExpenseData(temp);
  };

  useEffect(populateFilteredExpenseData, [
    categoryApplyFilter,
    paymentApplyFilter,
    amountApplySort,
    dateApplySort,
    expenseData,
  ]);

  return (
    <div className="bg-zinc-600 border-2 border-red-600 w-[90%] max-w-[40rem] py-2 px-4 rounded-lg flex justify-center items-center flex-wrap gap-x-6">
      <div>
        <div className="text-gray-300 font-semibold font-patrick">
          Filter by Category
        </div>
        <select
          value={categoryApplyFilter}
          onChange={handleCategoryFilter}
          name="categoryFilter"
          id="categoryFilter"
          className="rounded-lg px-2 py-2 text-green-600 font-bold text-[0.95rem] outline-1 outline-yellow-500 border-2 border-green-700"
        >
          <option value="All">All</option>
          {expenseCategories.map((element, id) => {
            return (
              <option key={id} value={element}>
                {element}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <div className="text-gray-300 font-semibold font-patrick">
          Filter by Payment
        </div>
        <select
          value={paymentApplyFilter}
          onChange={handlePaymentFilter}
          name="paymentFilter"
          id="paymentFilter"
          className="rounded-lg px-2 py-2 text-green-600 font-bold text-[0.95rem] outline-1 outline-yellow-500 border-2 border-green-700"
        >
          <option value="All">All</option>
          <option value="Cash">By Cash</option>
          <option value="Online">By Online</option>
        </select>
      </div>

      <div>
        <div className="text-gray-300 font-semibold font-patrick">
          Sort by amount
        </div>
        <select
          value={amountApplySort}
          onChange={handleAmountSort}
          name="amountSort"
          id="amountSort"
          className="rounded-lg px-2 py-2 text-green-600 font-bold text-[0.95rem] outline-1 outline-yellow-500 border-2 border-green-700"
        >
          <option value="NA">No Filter</option>
          <option value="Increasing">Increasing</option>
          <option value="Decreasing">Decreasing</option>
        </select>
      </div>

      <div>
        <div className="text-gray-300 font-semibold font-patrick">
          Filter by Date
        </div>
        <select
          value={dateApplySort}
          onChange={handleDateSort}
          name="dateSort"
          id="dateSort"
          className="rounded-lg px-2 py-2 text-green-600 font-bold text-[0.95rem] outline-1 outline-yellow-500 border-2 border-green-700"
        >
          <option value="NA">No Filter</option>
          <option value="Today">Today</option>
          <option value="LastWeak">Last 7 days</option>
          <option value="LastMonth">This Month</option>
          <option value="LastYear">This Year</option>
        </select>
      </div>
    </div>
  );
};

export default FilterPanel;
