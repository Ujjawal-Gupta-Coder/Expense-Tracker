  const expenseCategories = [
  "Housing",
  "Utilities",
  "Groceries",
  "Travel",
  "Food",
  "Insurance",
  "Debt Payment",
  "Health Care",
  "Investing",
  "Stationary",
];

const months = [
  "January", "February", "March", "April", "May", "June", 
  "July", "August", "September", "October", "November", "December"
];

const initialExpenseDataValue = () => {
   const data = localStorage.getItem('expenseData');
   return data ? JSON.parse(data) : [];
}

export { expenseCategories, months, initialExpenseDataValue};