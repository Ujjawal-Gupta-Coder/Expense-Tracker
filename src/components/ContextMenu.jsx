import Swal from 'sweetalert2'
import { useLocalStorage } from 'react-use';
import store from '../store';

const ContextMenu = ({contextMenuPosition, setContextMenuPosition, setShowPopUpForm, setTargetedExpense}) => {
  const { expenseData, setExpenseData } = store();
  const [expenseDataStorage, setExpenseDataStorage] = useLocalStorage('expenseData');

  const contextMenuStyle = {
    left : `${contextMenuPosition.xPos}px`,
    top : `${contextMenuPosition.yPos}px`,
  }


  const handleClose = () => {
    setContextMenuPosition({...contextMenuPosition, toShow : false});
  }

  const handleEdit = () => {
    handleClose();
    const toEdit = expenseData.find((elem => elem.id === contextMenuPosition.id));
    setTargetedExpense(toEdit);
    setShowPopUpForm(true);
  }

  const handleDelete =  () => {
   handleClose();
   
   Swal.fire({
    title: "Are you sure?",
    text: "This will Permanetly Delete the Entry.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      setExpenseData(expenseData.filter((elem) => {
        return elem.id !== contextMenuPosition.id;
      }))
      setExpenseDataStorage(expenseData.filter((elem) => {
        return elem.id !== contextMenuPosition.id;
      }))
      Swal.fire({
        title: "Deleted!",
        text: "Entry Deleted Successfully.",
        icon: "success"
      });
    }
  });
  }
  return (
   <div style={contextMenuStyle} className={ contextMenuPosition.toShow ?'bg-white text-black font-bold w-[90px] h-[65px] py-2 px-2 rounded-lg border-2 border-gray-700 flex justify-center items-center absolute' : 'bg-white text-black font-bold w-[90px] h-[65px] py-2 px-2 rounded-lg border-2 border-gray-700  hidden'} > 
        <button className='absolute -top-2 -right-2 text-2xl hover:text-rose-700' onClick={handleClose}><i className="fa-solid fa-circle-xmark"></i></button>
       <ul>
        <li className='hover:bg-gray-400 rounded-lg px-2 cursor-pointer' onClick={handleEdit} >Edit</li>
        <li className='hover:bg-gray-400 rounded-lg px-2 cursor-pointer' onClick={handleDelete} >Delete</li>
       </ul>
    </div>
     
  )
}

export default ContextMenu
