import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BASE_URL from '../config'

import Sidebar from '../components/Sidebar'

import {
    FiEdit2,
    FiTrash2,
    FiX
} from "react-icons/fi"

const ManageExpenses = () => {

    const [expenses, setExpenses] = useState([])

    const [loading, setLoading] = useState(true)

    const [editingExpense, setEditingExpense] = useState(null)

    const [updatedData, setUpdatedData] = useState({

        title: "",
        amount: "",
        category: "",
        payment_method: ""

    })





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

        finally {

            setLoading(false)

        }

    }





    useEffect(() => {

        fetchExpenses()

    }, [])





    // DELETE EXPENSE
    const deleteExpense = async (id) => {

        try {

            await axios.delete(

                `${BASE_URL}/delete-expense/${id}`
            )

            fetchExpenses()

        }

        catch (error) {

            console.log(error)

        }

    }





    // OPEN MODAL
    const openEditModal = (expense) => {

        setEditingExpense(expense)

        setUpdatedData({

            title: expense.title,
            amount: expense.amount,
            category: expense.category,
            payment_method: expense.payment_method

        })

    }





    // CLOSE MODAL
    const closeModal = () => {

        setEditingExpense(null)

    }





    // HANDLE CHANGE
    const handleChange = (e) => {

        setUpdatedData({

            ...updatedData,

            [e.target.name]: e.target.value

        })

    }





    // UPDATE EXPENSE
    const updateExpense = async (e) => {

        e.preventDefault()

        try {

            await axios.put(

                `${BASE_URL}/modify-expense/${editingExpense._id}`,

                updatedData
            )

            closeModal()

            fetchExpenses()

        }

        catch (error) {

            console.log(error)


        }

    }





    return (

        <div className='flex min-h-screen bg-gradient-to-br from-[#020617] via-[#050816] to-[#0F3DDB] overflow-hidden'>


            {/* SIDEBAR */}
            <Sidebar />





            {/* MAIN CONTENT */}
            <div className='flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-5 mt-[72px] lg:mt-0'>


                {/* HEADER */}
                <div className='mb-6 sm:mb-8'>


                    <h1 className='text-2xl sm:text-3xl font-bold text-white'>

                        Manage Expenses

                    </h1>



                    <p className='text-gray-400 text-sm mt-2'>

                        Smartly manage every expense in one place

                    </p>

                </div>





                {/* TOTAL CARD */}
                <div className='bg-[#071122]/80 backdrop-blur-xl border border-blue-900/50 rounded-2xl p-4 mb-6 shadow-[0_0_15px_rgba(59,130,246,0.08)]'>


                    <h1 className='text-white text-sm sm:text-base font-medium'>

                        Total Expenses:

                        <span className='text-blue-400 ml-2'>

                            {expenses.length}

                        </span>

                    </h1>

                </div>





                {/* LOADING */}
                {
                    loading ? (

                        <div className='text-center text-gray-400 mt-20 text-sm'>

                            Loading Expenses...

                        </div>

                    ) : (

                        <>

                            {/* EXPENSES GRID */}
                            <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>


                                {
                                    expenses.length > 0 ? (

                                        expenses.map((expense) => (

                                            <div
                                                key={expense._id}

                                                className='bg-[#071122]/80 backdrop-blur-xl border border-blue-900/50 rounded-2xl p-4 shadow-[0_0_15px_rgba(59,130,246,0.08)] hover:translate-y-[-2px] transition duration-300'
                                            >


                                                {/* TOP */}
                                                <div className='flex items-start justify-between gap-3'>


                                                    <div className='min-w-0'>


                                                        <h1 className='text-white text-sm sm:text-base font-semibold break-words'>

                                                            {expense.title}

                                                        </h1>



                                                        <p className='text-gray-400 text-[11px] mt-1'>

                                                            {expense.category}

                                                        </p>

                                                    </div>





                                                    <h1 className='text-red-400 text-sm sm:text-base font-bold whitespace-nowrap'>

                                                        ₹{expense.amount}

                                                    </h1>

                                                </div>





                                                {/* INFO */}
                                                <div className='mt-4 flex items-center justify-between text-[10px] sm:text-[11px] text-gray-400 flex-wrap gap-2'>


                                                    <span>

                                                        {expense.payment_method}

                                                    </span>



                                                    <span>

                                                        {expense.created_date}

                                                    </span>

                                                </div>





                                                {/* BUTTONS */}
                                                <div className='grid grid-cols-2 gap-2 sm:gap-3 mt-5'>


                                                    {/* EDIT */}
                                                    <button
                                                        onClick={() => openEditModal(expense)}

                                                        className='flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl text-[11px] sm:text-xs transition duration-300'
                                                    >

                                                        <FiEdit2 />

                                                        Edit

                                                    </button>





                                                    {/* DELETE */}
                                                    <button
                                                        onClick={() => deleteExpense(expense._id)}

                                                        className='flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl text-[11px] sm:text-xs transition duration-300'
                                                    >

                                                        <FiTrash2 />

                                                        Delete

                                                    </button>

                                                </div>

                                            </div>

                                        ))

                                    ) : (

                                        <div className='text-gray-400 text-sm mt-10'>

                                            No Expenses Found

                                        </div>

                                    )
                                }

                            </div>

                        </>
                    )
                }

            </div>





            {/* MODAL */}
            {
                editingExpense && (

                    <div className='fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4'>


                        <div className='w-full max-w-md bg-[#071122] border border-blue-900 rounded-3xl p-5 sm:p-6 shadow-[0_0_25px_rgba(59,130,246,0.2)] max-h-[90vh] overflow-y-auto'>


                            {/* TOP */}
                            <div className='flex items-center justify-between mb-6'>


                                <h1 className='text-white text-lg sm:text-xl font-semibold'>

                                    Update Expense

                                </h1>



                                <button
                                    onClick={closeModal}

                                    className='text-gray-400 hover:text-white transition'
                                >

                                    <FiX size={20} />

                                </button>

                            </div>





                            {/* FORM */}
                            <form
                                onSubmit={updateExpense}

                                className='space-y-4'
                            >


                                {/* TITLE */}
                                <div>

                                    <label className='block text-gray-300 text-sm mb-2'>

                                        Title

                                    </label>

                                    <input
                                        type="text"
                                        name="title"
                                        value={updatedData.title}
                                        onChange={handleChange}

                                        className='w-full bg-[#0F172A] border border-blue-900 text-white px-4 py-3 rounded-xl outline-none focus:border-blue-500 text-sm'
                                    />

                                </div>





                                {/* AMOUNT */}
                                <div>

                                    <label className='block text-gray-300 text-sm mb-2'>

                                        Amount

                                    </label>

                                    <input
                                        type="number"
                                        name="amount"
                                        value={updatedData.amount}
                                        onChange={handleChange}

                                        className='w-full bg-[#0F172A] border border-blue-900 text-white px-4 py-3 rounded-xl outline-none focus:border-blue-500 text-sm'
                                    />

                                </div>





                                {/* CATEGORY */}
                                <div>

                                    <label className='block text-gray-300 text-sm mb-2'>

                                        Category

                                    </label>

                                    <select
                                        name="category"
                                        value={updatedData.category}
                                        onChange={handleChange}

                                        className='w-full bg-[#0F172A] border border-blue-900 text-white px-4 py-3 rounded-xl outline-none focus:border-blue-500 text-sm'
                                    >

                                        <option value="Food">Food</option>
                                        <option value="Shopping">Shopping</option>
                                        <option value="Travel">Travel</option>
                                        <option value="Bills">Bills</option>
                                        <option value="Health">Health</option>
                                        <option value="Investment">Investment</option>
                                        <option value="Others">Others</option>

                                    </select>

                                </div>





                                {/* PAYMENT */}
                                <div>

                                    <label className='block text-gray-300 text-sm mb-2'>

                                        Payment Method

                                    </label>

                                    <select
                                        name="payment_method"
                                        value={updatedData.payment_method}
                                        onChange={handleChange}

                                        className='w-full bg-[#0F172A] border border-blue-900 text-white px-4 py-3 rounded-xl outline-none focus:border-blue-500 text-sm'
                                    >

                                        <option value="Cash">Cash</option>
                                        <option value="UPI">UPI</option>
                                        <option value="Card">Card</option>
                                        <option value="Net Banking">Net Banking</option>

                                    </select>

                                </div>





                                {/* BUTTON */}
                                <button
                                    type="submit"

                                    className='w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:opacity-90 transition duration-300 text-white py-3 rounded-xl text-sm font-medium mt-2'
                                >

                                    Update Expense

                                </button>

                            </form>

                        </div>

                    </div>

                )
            }

        </div>
    )
}

export default ManageExpenses