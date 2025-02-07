import React from 'react'

const TotalExpense = ({filteredExpenseData}) => {
    const getTotalAmount = () => {
        const temp = filteredExpenseData.reduce((prev, curr) => {
            return prev + Number(curr.amount) ;
        }, 0);
        return temp.toFixed(2);
      }

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
  return (
    <div className='bg-zinc-600 border-2 border-red-600 w-[90%] max-w-[40rem] py-2 px-4 text-xl sm:text-2xl rounded-lg flex justify-center gap-2'>
      <div className='text-gray-300'>Total Expense: </div>
      <div className='font-bold text-white'>₹ {changeFormAmount(getTotalAmount().toString())}</div>
    </div>
  )
}

export default TotalExpense
