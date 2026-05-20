import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BASE_URL from '../config'

const CategoryBreakdown = () => {

    const [expenses, setExpenses] = useState([])





    // FETCH DATA
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





    // TOP CATEGORY %
    const topCategoryAmount = Math.max(

        ...Object.values(categoryTotals),

        0
    )





    const percentage = totalExpenses

        ? (topCategoryAmount / totalExpenses) * 100

        : 0





    return (

        <div>


            {/* MAIN CARD */}
            <div className='bg-[#071122]/80 backdrop-blur-xl border border-blue-900/50 rounded-2xl p-3 sm:p-4 shadow-[0_0_15px_rgba(59,130,246,0.08)] h-full'>


                {/* TITLE */}
                <h1 className='text-xs sm:text-sm font-semibold text-white mb-4'>

                    Category Breakdown

                </h1>





                {/* CIRCLE */}
                <div className='flex items-center justify-center'>


                    <div
                        className='relative w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center'

                        style={{

                            background: `conic-gradient(

                                #3B82F6 ${percentage}%,

                                #1E293B ${percentage}% 100%
                            )`
                        }}
                    >


                        {/* INNER */}
                        <div className='w-16 h-16 sm:w-20 sm:h-20 bg-[#071122] rounded-full flex flex-col items-center justify-center'>


                            <h1 className='text-lg sm:text-xl font-bold text-white'>

                                {percentage.toFixed(0)}%

                            </h1>





                            <p className='text-gray-400 text-[9px] sm:text-[10px] mt-1'>

                                Usage

                            </p>

                        </div>

                    </div>

                </div>





                {/* TOTAL */}
                <div className='mt-5 text-center'>


                    <p className='text-gray-400 text-[10px] sm:text-[11px] mb-1'>

                        Total Expenses

                    </p>





                    <h1 className='text-base sm:text-lg font-bold text-white break-words'>

                        ₹{totalExpenses}

                    </h1>

                </div>

            </div>

        </div>

    )
}

export default CategoryBreakdown