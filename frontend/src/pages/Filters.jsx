import React, { useState } from 'react'
import BASE_URL from '../config'
import Sidebar from '../components/Sidebar'
import axios from 'axios'

const Filters = () => {

    const [category, setCategory] = useState("")
    const [amount, setAmount] = useState("")
    const [expenses, setExpenses] = useState([])





    // FILTER CATEGORY
    const filterCategory = async () => {

        try {

            const email = localStorage.getItem("email")

            const response = await axios.get(
                `${BASE_URL}/filter-expenses/${category}/${email}`
            )

            setExpenses(response.data)
        }

        catch (error) {
            console.log(error)
            setExpenses([])

        }

    }





    // FILTER EXACT AMOUNT
    const filterAmount = async () => {

        try {

            const email = localStorage.getItem("email")

            const response = await axios.get(
                `${BASE_URL}/filter-amount/${amount}/${email}`
            )

            setExpenses(response.data)

        }

        catch (error) {

            console.log(error)

            setExpenses([])

        }

    }





    // GREATER THAN
    const greaterThan = async () => {

        try {

            const email = localStorage.getItem("email")

            const response = await axios.get(
                `${BASE_URL}/greater-than/${amount}/${email}`
            )

            setExpenses(response.data)

        }

        catch (error) {

            console.log(error)

            setExpenses([])

        }

    }





    // LESS THAN
    const lessThan = async () => {

        try {

            const email = localStorage.getItem("email")

            const response = await axios.get(
                `${BASE_URL}/less-than/${amount}/${email}`
            )

            setExpenses(response.data)

        }

        catch (error) {
            console.log(error)
            setExpenses([])

        }
    }


    // RESET
    const resetFilters = () => {

        setCategory("")
        setAmount("")
        setExpenses([])

    }





    return (

        <div className='flex min-h-screen bg-gradient-to-br from-[#020617] via-[#050816] to-[#0F3DDB]'>


            {/* SIDEBAR */}
            <Sidebar />


            {/* MAIN CONTENT */}
            <div className='flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto mt-[72px] lg:mt-0'>


                {/* PAGE TITLE */}
                <div className='mb-8'>


                    <h1 className='text-3xl sm:text-4xl font-bold text-white mb-2'>
                        Filter Expenses
                    </h1>



                    <p className='text-gray-400 text-sm sm:text-base'>
                        Find expenses based on category and amount
                    </p>

                </div>





                {/* FILTER CARD */}
                <div className='bg-[#071122]/80 backdrop-blur-xl border border-blue-900/50 rounded-3xl p-5 sm:p-7 md:p-8 shadow-[0_0_40px_rgba(59,130,246,0.15)] mb-8'>


                    {/* INPUTS */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>


                        {/* CATEGORY */}
                        <div>

                            <label className='block text-gray-300 text-sm mb-2'>

                                Filter By Category

                            </label>

                            <select
                                value={category}

                                onChange={(e) => setCategory(e.target.value)}

                                className='w-full bg-[#0F172A] border border-blue-900 text-white px-4 py-3 rounded-2xl outline-none focus:border-blue-500 text-sm'
                            >

                                <option value="">Select Category</option>

                                <option value="Food">Food</option>
                                <option value="Travel">Travel</option>
                                <option value="Education">Education</option>
                                <option value="Shopping">Shopping</option>
                                <option value="Health">Health</option>
                                <option value="Bills">Bills</option>
                                <option value="Entertainment">Entertainment</option>
                                <option value="Rent">Rent</option>
                                <option value="Groceries">Groceries</option>
                                <option value="Investment">Investment</option>
                                <option value="Subscriptions">Subscriptions</option>
                                <option value="Fuel">Fuel</option>
                                <option value="Insurance">Insurance</option>
                                <option value="Salary">Salary</option>
                                <option value="EMI">EMI</option>
                                <option value="Recharge">Recharge</option>
                                <option value="Gym">Gym</option>
                                <option value="Medical">Medical</option>
                                <option value="Others">Others</option>

                            </select>

                        </div>





                        {/* AMOUNT */}
                        <div>

                            <label className='block text-gray-300 text-sm mb-2'>

                                Enter Amount

                            </label>

                            <input
                                type="number"

                                placeholder='Enter Amount'

                                value={amount}

                                onChange={(e) => setAmount(e.target.value)}

                                className='w-full bg-[#0F172A] border border-blue-900 text-white px-4 py-3 rounded-2xl outline-none focus:border-blue-500 text-sm'
                            />

                        </div>

                    </div>





                    {/* BUTTONS */}
                    <div className='grid grid-cols-2 xl:grid-cols-5 gap-3 mt-6'>


                        <button
                            onClick={filterCategory}

                            className='bg-blue-600 hover:bg-blue-700 transition duration-300 text-white px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm'
                        >

                            Category

                        </button>





                        <button
                            onClick={filterAmount}

                            className='bg-green-600 hover:bg-green-700 transition duration-300 text-white px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm'
                        >

                            Exact

                        </button>





                        <button
                            onClick={greaterThan}

                            className='bg-purple-600 hover:bg-purple-700 transition duration-300 text-white px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm'
                        >

                            Greater

                        </button>





                        <button
                            onClick={lessThan}

                            className='bg-orange-600 hover:bg-orange-700 transition duration-300 text-white px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm'
                        >

                            Less

                        </button>





                        <button
                            onClick={resetFilters}

                            className='bg-red-600 hover:bg-red-700 transition duration-300 text-white px-3 py-2.5 rounded-xl font-medium text-xs sm:text-sm col-span-2 xl:col-span-1'
                        >

                            Reset

                        </button>

                    </div>

                </div>





                {/* RESULTS */}
                <div>


                    {/* TOP */}
                    <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5'>


                        <h2 className='text-xl sm:text-2xl font-bold text-white'>

                            Filter Results

                        </h2>



                        <span className='text-gray-400 text-xs sm:text-sm'>

                            Total Results: {expenses.length}

                        </span>

                    </div>





                    {/* EXPENSE CARDS */}
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4'>


                        {
                            expenses.length > 0 ? (

                                expenses.map((expense, index) => (

                                    <div
                                        key={index}

                                        className='bg-[#071122]/80 backdrop-blur-xl border border-blue-900/50 rounded-2xl p-4 shadow-[0_0_20px_rgba(59,130,246,0.12)]'
                                    >


                                        {/* TOP */}
                                        <div className='flex items-center justify-between gap-3 mb-3'>


                                            <h3 className='text-white text-sm sm:text-base font-semibold break-words'>

                                                {expense.title}

                                            </h3>



                                            <span className='text-red-400 font-bold text-sm sm:text-base whitespace-nowrap'>

                                                ₹{expense.amount}

                                            </span>

                                        </div>





                                        {/* CATEGORY */}
                                        <p className='text-gray-400 text-xs sm:text-sm mb-4'>

                                            {expense.category}

                                        </p>





                                        {/* FOOTER */}
                                        <div className='flex items-center justify-between gap-2 text-[10px] sm:text-xs text-gray-500 border-t border-blue-900 pt-3 flex-wrap'>


                                            <span>

                                                {expense.payment_method}

                                            </span>



                                            <span>

                                                {expense.created_date}

                                            </span>

                                        </div>

                                    </div>

                                ))

                            ) : (

                                <div className='text-gray-400 text-sm sm:text-base mt-8'>

                                    No Expenses Found

                                </div>

                            )
                        }

                    </div>

                </div>

            </div>

        </div>

    )
}

export default Filters