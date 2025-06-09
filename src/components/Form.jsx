import React, { useContext } from "react";
import { expenseCategories } from "../helper.js";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useLocalStorage } from "react-use";
import { v4 as uuidv4 } from "uuid";
import store from "../store.js";

const Form = ({ maxDiscriptionLimit }) => {
  const maxlenghtForDiscription = maxDiscriptionLimit;
  const {expenseData, setExpenseData} = store();
  const [expenseDataStorage, setExpenseDataStorage] = useLocalStorage("expenseData");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      discription: "",
    },
  });

  const discriptionWatch = watch("discription");

  const onSubmit = (formData) => {
    formData.id = uuidv4();
    setExpenseData([formData, ...expenseData]);
    setExpenseDataStorage([formData, ...expenseData]);
    Swal.fire({
      text: "Expense Added Successfully.",
      icon: "success",
    });
    reset();
  };
  const validateDate = (enterDate) => {
    const today = new Date();
    enterDate = new Date(enterDate);
    if (enterDate > today) return "Future dates are not allowed.";
    return true;
  };
  return (
    <div className="bg-emerald-400/80 w-full max-w-[600px] h-[65%] rounded-3xl my-6 px-6 py-2 flex flex-col items-center gap-y-6 shadow-custom">
      <h3 className="text-3xl xs:text-4xl sm:text-5xl  font-patrick font-bold text-center text-white">
        💵 Add Expense 💵
      </h3>

      <form
        className="flex flex-col gap-4 w-full step-2"
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <div>
          <select
            {...register("category", {
              required: {
                value: true,
                message: "Please Select a Category",
              },
            })}
            id="category"
            className="bg-white/90 text-black border-2 border-gray-800 py-4 px-4 rounded-lg outline-none text-xl w-full h-[63px]"
          >
            <option hidden value="">
              Select Category
            </option>
            {expenseCategories.map((element, key) => {
              return (
                <option key={key} value={element}>
                  {element}
                </option>
              );
            })}
          </select>
          <div className="mx-4 text-red-600 font-bold h-[22px] text-sm">
            {errors.category && (
              <p>
                {" "}
                <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                {errors.category.message}{" "}
              </p>
            )}
          </div>
        </div>

        <div>
          <input
            {...register("discription", {
              maxLength: {
                value: maxlenghtForDiscription,
                message: `Description cannot exceed ${maxlenghtForDiscription} characters.`,
              },
            })}
            type="text"
            id="discription"
            className="bg-white/90 text-black border-2 border-gray-800 py-2 px-2 rounded-lg outline-none h-[60px] text-lg w-full"
            placeholder="Describe expense ..."
            maxLength={maxlenghtForDiscription}
          />
          <div className="mx-4 text-red-600 font-bold h-[22px] text-sm">
            {!errors.discription &&
              discriptionWatch.length != 0 &&
              discriptionWatch.length <= maxlenghtForDiscription && (
                <p className="text-black">
                  {" "}
                  you have {maxlenghtForDiscription -
                    discriptionWatch.length}{" "}
                  charecters left.
                </p>
              )}
            {errors.discription && (
              <p>
                {" "}
                <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                {errors.discription.message}{" "}
              </p>
            )}
          </div>
        </div>

        <div className="flex justify-between gap-y-4 flex-col xs:flex-row">
          <div className="flex flex-col sm:w-[65%]">
            <label htmlFor="amount" className="mx-2">
              Enter Amount :{" "}
            </label>
            <div className="flex items-center">
              <span className="bg-white/90 text-black border-l-2 border-t-2 border-b-2 border-gray-800 py-[5px] px-2 rounded-l-lg h-[3.5rem] text-4xl">
                ₹
              </span>
              <input
                {...register("amount", {
                  required: {
                    value: true,
                    message: "Please enter valid amount.",
                  },
                  min: {
                    value: 0.01,
                    message: "Amount is Invalid.",
                  },
                  max: {
                    value: 10000000,
                    message: "Maximum amount Limit is 1 crore.",
                  },
                  validate: {
                    validAmount: (value) =>
                      /^\d+(\.\d{1,2})?$/.test(value) ||
                      "Atmost 2 decimal digits.",
                  },
                })}
                step="0.01"
                type="number"
                id="amount"
                className="bg-white/90 text-black border-t-2 border-b-2  border-r-2 border-gray-800 py-2 rounded-r-lg outline-none h-[3.5rem] w-[80%] text-4xl"
              />
            </div>
            <div className="text-red-600 font-bold h-[22px] w-[80%] px-4">
              {errors.amount && (
                <p className="text-sm">
                  {" "}
                  <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                  {errors.amount.message}{" "}
                </p>
              )}
            </div>
          </div>

          <div className="md:mb-2 sm:w-[35%] text-white">
            <div className="mx-2">Mode Of Payment : </div>
            <div className="ml-4 flex items-center gap-2 font-bold text-xl">
              <input
                {...register("mode", {
                  required: {
                    value: true,
                    message: "Please Select Payment method.",
                  },
                })}
                type="radio"
                id="mode-cash"
                value="Cash"
                className="h-6 w-6"
              />
              <label htmlFor="mode-cash">Cash</label>
            </div>

            <div className="ml-4 flex items-center gap-2 font-bold text-xl">
              <input
                {...register("mode", {
                  required: {
                    value: true,
                    message: "Please Select Payment method.",
                  },
                })}
                type="radio"
                id="mode-online"
                value="Online"
                className="h-6 w-6"
              />
              <label htmlFor="mode-online">Online</label>
            </div>

            <div className="mx-4 text-red-600 font-bold h-[22px]">
              {errors.mode && (
                <p className="text-sm">
                  {" "}
                  <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                  {errors.mode.message}{" "}
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="text-white">
          <label htmlFor="date" className="text-white">
            Date Of Payment :{" "}
          </label>
          <input
            {...register("date", {
              required: {
                value: true,
                message: "Please enter date of payment.",
              },
              validate: validateDate,
            })}
            type="datetime-local"
            id="date"
            className="bg-white/90 text-black border-2 border-gray-800 py-2 px-2 rounded-lg outline-none h-[50px] w-full sm:w-[60%] text-lg"
          />
          <div className="mx-4 text-red-600 font-bold h-[22px] text-center text-sm">
            {errors.date && (
              <p>
                {" "}
                <i className="fa-solid fa-triangle-exclamation"></i>{" "}
                {errors.date.message}{" "}
              </p>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="w-fit px-6 py-2 rounded-lg text-2xl  font-patrick bg-gradient-to-b from-pink-600 to-sky-600 border-2 border-white mx-auto text-white"
        >
          Add
        </button>
      </form>
    </div>
  );
};

export default Form;
