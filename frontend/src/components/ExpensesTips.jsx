import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BASE_URL from '../config'
import { Link } from 'react-router-dom'

const ExpensesTips = () => {

    const [expenses, setExpenses] = useState([])





    // FETCH EXPENSES
    const fetchExpenses = async () => {

        try {

            const email = localStorage.getItem("email")

            const response = await axios.get(

                `${BASE_URL}}/get-expenses/${email}`
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





    // CATEGORY TOTALS
    const categoryTotals = {}

    expenses.forEach((expense) => {

        const category = expense.category

        const amount = Number(expense.amount)

        if (categoryTotals[category]) {

            categoryTotals[category] += amount

        }

        else {

            categoryTotals[category] = amount

        }

    })





    // HIGHEST CATEGORY
    let highestCategory = ""

    let highestAmount = 0



    Object.entries(categoryTotals).forEach(([category, amount]) => {

        if (amount > highestAmount) {

            highestAmount = amount

            highestCategory = category

        }

    })





    // TOTAL TRANSACTIONS
    const totalTransactions = expenses.length





    // TIP MESSAGE
    let tipMessage = ""

    if (totalExpenses < 50000) {

        tipMessage = "Your spending is well controlled this month."

    }

    else if (totalExpenses < 100000) {

        tipMessage = "Your expenses look balanced and manageable."

    }

    else {

        tipMessage = "Try reducing high-value expenses this month."

    }





    return (

        <div>


            {/* MAIN CARD */}
            <div className='bg-[#071122]/80 backdrop-blur-xl border border-blue-900/50 p-3 sm:p-4 rounded-2xl shadow-[0_0_15px_rgba(59,130,246,0.08)] flex flex-col justify-between h-full'>


                {/* TITLE */}
                <h1 className='text-xs sm:text-sm font-semibold text-white mb-3'>

                    Expense Insights

                </h1>





                {/* CONTENT BOX */}
                <div className='bg-[#0F172A] border border-[#1E293B] rounded-xl p-3 sm:p-4'>


                    {/* ICON */}
                    <div className='text-xl sm:text-2xl mb-2'>

                        📊

                    </div>





                    {/* TOTAL */}
                    <h1 className='text-white text-xs sm:text-sm font-semibold leading-5 break-words'>

                        Your total spending is ₹{totalExpenses}

                    </h1>





                    {/* MESSAGE */}
                    <p className='text-gray-400 text-[10px] sm:text-[11px] mt-2 leading-4'>

                        {tipMessage}

                    </p>





                    {/* CATEGORY */}
                    <p className='text-blue-400 text-[10px] sm:text-[11px] mt-2 break-words'>

                        Highest category: {highestCategory || "No Data"}

                    </p>





                    {/* TRANSACTIONS */}
                    <p className='text-gray-500 text-[10px] sm:text-[11px] mt-1'>

                        Transactions: {totalTransactions}

                    </p>

                </div>





                {/* BUTTON */}
                <Link to="/analytics" className='mt-3'>

                    <button className='w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 transition duration-300 text-white py-2 rounded-lg text-[10px] sm:text-xs font-medium'>

                        View Analytics

                    </button>

                </Link>

            </div>

        </div>

    )
}

export default ExpensesTips