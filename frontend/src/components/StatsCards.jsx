import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BASE_URL from '../config'

const StatsCards = () => {

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





    // TOTAL EXPENSES
    const totalExpenses = expenses.reduce(

        (total, expense) => total + Number(expense.amount),

        0
    )





    // UNIQUE CATEGORIES
    const uniqueCategories = [

        ...new Set(expenses.map(expense => expense.category))
    ]





    // MONTHLY SPENDING
    const monthlySpending = totalExpenses





    // HIGHEST EXPENSE
    const highestExpense = Math.max(

        ...expenses.map(
            expense => Number(expense.amount)
        ),

        0
    )





    return (

        <div>


            {/* STATS CARDS */}
            <div className='grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'>


                {/* TOTAL EXPENSES */}
                <div className='bg-[#071122]/80 backdrop-blur-xl border border-blue-900/50 p-4 sm:p-5 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.08)]'>


                    <p className='text-gray-400 text-[10px] sm:text-xs mb-2'>

                        Total Expenses

                    </p>



                    <h1 className='text-lg sm:text-2xl font-bold text-white break-words'>

                        ₹{totalExpenses}

                    </h1>

                </div>





                {/* CATEGORIES */}
                <div className='bg-[#071122]/80 backdrop-blur-xl border border-blue-900/50 p-4 sm:p-5 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.08)]'>


                    <p className='text-gray-400 text-[10px] sm:text-xs mb-2'>

                        Categories

                    </p>



                    <h1 className='text-lg sm:text-2xl font-bold text-white'>

                        {uniqueCategories.length}

                    </h1>

                </div>





                {/* MONTHLY SPENDING */}
                <div className='bg-[#071122]/80 backdrop-blur-xl border border-blue-900/50 p-4 sm:p-5 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.08)]'>


                    <p className='text-gray-400 text-[10px] sm:text-xs mb-2'>

                        Monthly Spending

                    </p>



                    <h1 className='text-lg sm:text-2xl font-bold text-white break-words'>

                        ₹{monthlySpending}

                    </h1>

                </div>





                {/* HIGHEST EXPENSE */}
                <div className='bg-[#071122]/80 backdrop-blur-xl border border-blue-900/50 p-4 sm:p-5 rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.08)]'>


                    <p className='text-gray-400 text-[10px] sm:text-xs mb-2'>

                        Highest Expense

                    </p>



                    <h1 className='text-lg sm:text-2xl font-bold text-white break-words'>

                        ₹{highestExpense}

                    </h1>

                </div>

            </div>

        </div>
    )
}

export default StatsCards