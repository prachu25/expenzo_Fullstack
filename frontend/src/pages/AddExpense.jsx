import React, { useEffect, useState } from 'react'
import BASE_URL from '../config'
import Sidebar from '../components/Sidebar'
import axios from 'axios'

const AddExpense = () => {

    const [title, setTitle] = useState("")
    const [amount, setAmount] = useState("")
    const [category, setCategory] = useState("")
    const [paymentMethod, setPaymentMethod] = useState("")

    // STORE ALL EXPENSES
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





    // LOAD DATA
    useEffect(() => {

        fetchExpenses()

    }, [])





    // ADD EXPENSE FUNCTION
    const handleAddExpense = async (e) => {

        e.preventDefault()

        const email = localStorage.getItem("email")

        const expenseData = {

            title: title,
            amount: Number(amount),
            category: category,
            payment_method: paymentMethod,
            email: email

        }

        try {

            await axios.post(
                `${BASE_URL}/add-expense`,
                expenseData
            )



            // REFRESH DATA
            fetchExpenses()



            // CLEAR INPUTS
            setTitle("")
            setAmount("")
            setCategory("")
            setPaymentMethod("")

        }

        catch (error) {

            console.log(error)

        }

    }





    return (

        <div className='flex min-h-screen bg-gradient-to-br from-[#020617] via-[#050816] to-[#0F3DDB]'>


            {/* SIDEBAR */}
            <Sidebar />





            {/* MAIN CONTENT */}
            <div className='flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto mt-[72px] lg:mt-0'>


                <div className='flex flex-col xl:flex-row gap-6 xl:gap-8 items-start justify-center'>


                    {/* FORM CARD */}
                    <div className='w-full max-w-2xl bg-[#071122]/80 backdrop-blur-xl border border-blue-900/50 rounded-3xl p-5 sm:p-7 md:p-8 shadow-[0_0_40px_rgba(59,130,246,0.15)]'>


                        {/* PAGE TITLE */}
                        <div className='mb-8 text-center'>


                            <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2'>

                                Add Expense

                            </h1>



                            <p className='text-gray-400 text-sm sm:text-base'>

                                Track and manage your daily spending

                            </p>

                        </div>





                        {/* FORM */}
                        <form
                            onSubmit={handleAddExpense}
                            className='space-y-5'
                        >


                            {/* TITLE */}
                            <div>

                                <label className='block text-gray-300 text-sm mb-2'>

                                    Expense Title

                                </label>

                                <input
                                    type="text"

                                    placeholder='Enter Expense Title'

                                    value={title}

                                    onChange={(e) => setTitle(e.target.value)}

                                    className='w-full bg-[#0F172A] border border-blue-900 text-white px-4 py-3 sm:py-4 rounded-2xl outline-none focus:border-blue-500 transition duration-300 text-sm sm:text-base'

                                    required
                                />

                            </div>





                            {/* AMOUNT */}
                            <div>

                                <label className='block text-gray-300 text-sm mb-2'>

                                    Amount

                                </label>

                                <input
                                    type="number"

                                    placeholder='Enter Amount'

                                    value={amount}

                                    onChange={(e) => setAmount(e.target.value)}

                                    className='w-full bg-[#0F172A] border border-blue-900 text-white px-4 py-3 sm:py-4 rounded-2xl outline-none focus:border-blue-500 transition duration-300 text-sm sm:text-base'

                                    required
                                />

                            </div>





                            {/* CATEGORY */}
                            <div>

                                <label className='block text-gray-300 text-sm mb-2'>

                                    Category

                                </label>

                                <select
                                    value={category}

                                    onChange={(e) => setCategory(e.target.value)}

                                    className='w-full bg-[#0F172A] border border-blue-900 text-white px-4 py-3 sm:py-4 rounded-2xl outline-none focus:border-blue-500 transition duration-300 text-sm sm:text-base'

                                    required
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





                            {/* PAYMENT METHOD */}
                            <div>

                                <label className='block text-gray-300 text-sm mb-2'>

                                    Payment Method

                                </label>

                                <select
                                    value={paymentMethod}

                                    onChange={(e) => setPaymentMethod(e.target.value)}

                                    className='w-full bg-[#0F172A] border border-blue-900 text-white px-4 py-3 sm:py-4 rounded-2xl outline-none focus:border-blue-500 transition duration-300 text-sm sm:text-base'

                                    required
                                >

                                    <option value="">Select Payment Method</option>

                                    <option value="Cash">Cash</option>
                                    <option value="UPI">UPI</option>
                                    <option value="Card">Card</option>
                                    <option value="Bank Transfer">Bank Transfer</option>

                                </select>

                            </div>





                            {/* BUTTON */}
                            <button
                                type='submit'

                                className='w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:scale-[1.02] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition duration-300 text-white font-semibold py-3 sm:py-4 rounded-2xl mt-4 text-sm sm:text-base'
                            >

                                Add Expense

                            </button>

                        </form>

                    </div>





                    {/* RECENT EXPENSES */}
                    <div className='w-full xl:max-w-[380px] bg-[#071122]/80 backdrop-blur-xl border border-blue-900/50 rounded-3xl p-5 sm:p-6 shadow-[0_0_40px_rgba(59,130,246,0.15)]'>


                        <h2 className='text-2xl font-bold text-white mb-6 text-center xl:text-left'>

                            Recent Expenses

                        </h2>





                        <div className='space-y-4 max-h-[600px] overflow-y-auto pr-1'>


                            {
                                expenses.slice(-3).reverse().map((expense, index) => (

                                    <div
                                        key={index}

                                        className='bg-[#0F172A] border border-blue-900 rounded-2xl p-4 hover:scale-[1.02] transition duration-300'
                                    >


                                        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2'>


                                            <h3 className='text-white font-semibold text-sm sm:text-base break-words'>

                                                {expense.title}

                                            </h3>



                                            <span className='text-red-400 font-bold text-sm sm:text-base whitespace-nowrap'>

                                                ₹{expense.amount}

                                            </span>

                                        </div>



                                        <p className='text-gray-400 text-sm'>

                                            {expense.category}

                                        </p>



                                        <div className='flex items-center justify-between mt-3 text-xs text-gray-500 gap-2 flex-wrap'>

                                            <span>

                                                {expense.payment_method}

                                            </span>



                                            <span>

                                                {expense.created_date}

                                            </span>

                                        </div>

                                    </div>

                                ))
                            }

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default AddExpense