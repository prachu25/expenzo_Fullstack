import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BASE_URL from '../config'

const MonthlyOverview = () => {

    const [expenses, setExpenses] = useState([])





    // FETCH EXPENSES
    const fetchExpenses = async () => {

        try {

            const email = localStorage.getItem("email")

            const response = await axios.get(

                `${BASE_URL}/get-expenses/${email}`
            )

            setExpenses(response.data)

        }

        catch (error) {

            console.log(error)

        }

    }





    useEffect(() => {

        fetchExpenses()

    }, [])





    // HIGHEST EXPENSE
    const highestExpense = expenses.reduce(

        (max, expense) =>

            Number(expense.amount) > Number(max.amount)

                ? expense

                : max,

        expenses[0] || {}
    )





    // LOWEST EXPENSE
    const lowestExpense = expenses.reduce(

        (min, expense) =>

            Number(expense.amount) < Number(min.amount)

                ? expense

                : min,

        expenses[0] || {}
    )





    // TOTAL TRANSACTIONS
    const totalTransactions = expenses.length





    return (

        <div className='h-full'>


            {/* MAIN CARD */}
            <div className='bg-[#071122]/80 backdrop-blur-xl border border-blue-900/50 p-3 sm:p-4 rounded-2xl shadow-[0_0_15px_rgba(59,130,246,0.08)] h-full flex flex-col'>


                {/* TITLE */}
                <h1 className='text-xs sm:text-sm font-semibold text-white mb-4'>

                    This Month

                </h1>





                {/* CONTENT */}
                <div className='space-y-3 flex-1'>


                    {/* HIGHEST */}
                    <div className='bg-[#0F172A] border border-[#1E293B] p-3 rounded-xl flex items-center justify-between gap-3 min-h-[85px]'>


                        {/* LEFT */}
                        <div className='min-w-0'>


                            <p className='text-gray-400 text-[10px]'>

                                Highest Expense

                            </p>



                            <h1 className='text-white text-xs font-semibold mt-1 break-words'>

                                {highestExpense.title || "No Data"}

                            </h1>

                        </div>





                        {/* RIGHT */}
                        <h1 className='text-red-400 text-xs font-bold whitespace-nowrap'>

                            ₹{highestExpense.amount || 0}

                        </h1>

                    </div>





                    {/* LOWEST */}
                    <div className='bg-[#0F172A] border border-[#1E293B] p-3 rounded-xl flex items-center justify-between gap-3 min-h-[85px]'>


                        {/* LEFT */}
                        <div className='min-w-0'>


                            <p className='text-gray-400 text-[10px]'>

                                Lowest Expense

                            </p>



                            <h1 className='text-white text-xs font-semibold mt-1 break-words'>

                                {lowestExpense.title || "No Data"}

                            </h1>

                        </div>





                        {/* RIGHT */}
                        <h1 className='text-green-400 text-xs font-bold whitespace-nowrap'>

                            ₹{lowestExpense.amount || 0}

                        </h1>

                    </div>


                </div>

            </div>

        </div>


    )
}

export default MonthlyOverview