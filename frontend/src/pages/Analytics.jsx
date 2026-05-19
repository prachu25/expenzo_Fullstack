import React, { useEffect, useState } from 'react'
import BASE_URL from '../config'
import Sidebar from '../components/Sidebar'
import axios from 'axios'

import {

    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    AreaChart,
    Area,
    XAxis,
    CartesianGrid

} from 'recharts'

const Analytics = () => {

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




    // TOTAL TRANSACTIONS
    const totalTransactions = expenses.length




    // HIGHEST EXPENSE
    const highestExpense = expenses.reduce(

        (max, expense) =>

            Number(expense.amount) > Number(max.amount)

                ? expense

                : max,

        expenses[0] || {}
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





    // PIE DATA
    const pieData = Object.keys(categoryTotals).map((category) => ({

        name: category,

        value: categoryTotals[category]

    }))





    // COLORS
    const COLORS = [

        "#3B82F6",
        "#8B5CF6",
        "#06B6D4",
        "#10B981",
        "#F59E0B",
        "#EF4444"

    ]





    return (

        <div className='flex min-h-screen bg-gradient-to-br from-[#020617] via-[#050816] to-[#0F3DDB]'>


            {/* SIDEBAR */}
            <Sidebar />





            {/* MAIN CONTENT */}
            <div className='flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto mt-[72px] lg:mt-0'>


                {/* HEADER */}
                <div className='mb-6 sm:mb-8'>


                    <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2'>

                        Analytics

                    </h1>



                    <p className='text-gray-400 text-sm sm:text-base'>

                        Expense overview dashboard

                    </p>

                </div>





                {/* SUMMARY CARDS */}
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6'>


                    {/* CARD */}
                    <div className='bg-[#071122]/80 backdrop-blur-xl border border-[#1E293B] rounded-3xl p-5 shadow-[0_0_30px_rgba(37,99,235,0.1)]'>


                        <p className='text-xs text-gray-400 mb-2'>

                            Total Expenses

                        </p>



                        <h2 className='text-2xl sm:text-3xl font-bold text-white break-words'>

                            ₹{totalExpenses}

                        </h2>

                    </div>





                    {/* CARD */}
                    <div className='bg-[#071122]/80 backdrop-blur-xl border border-[#1E293B] rounded-3xl p-5 shadow-[0_0_30px_rgba(37,99,235,0.1)]'>


                        <p className='text-xs text-gray-400 mb-2'>

                            Transactions

                        </p>



                        <h2 className='text-2xl sm:text-3xl font-bold text-white'>

                            {totalTransactions}

                        </h2>

                    </div>





                    {/* CARD */}
                    <div className='bg-[#071122]/80 backdrop-blur-xl border border-[#1E293B] rounded-3xl p-5 shadow-[0_0_30px_rgba(37,99,235,0.1)]'>


                        <p className='text-xs text-gray-400 mb-2'>

                            Highest Expense

                        </p>



                        <h2 className='text-xl sm:text-2xl font-bold text-white break-words'>

                            ₹{highestExpense.amount || 0}

                        </h2>



                        <p className='text-xs text-gray-500 mt-2 break-words'>

                            {highestExpense.title || "No Data"}

                        </p>

                    </div>

                </div>





                {/* CHART SECTION */}
                <div className='grid grid-cols-1 xl:grid-cols-2 gap-5'>


                    {/* PIE CHART */}
                    <div className='bg-[#071122]/80 backdrop-blur-xl border border-[#1E293B] rounded-3xl p-5 shadow-[0_0_30px_rgba(37,99,235,0.1)]'>


                        {/* TOP */}
                        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5'>


                            <h2 className='text-lg sm:text-xl font-semibold text-white'>

                                Categories

                            </h2>



                            <span className='text-xs text-gray-500'>

                                Distribution

                            </span>

                        </div>





                        {/* PIE CHART */}
                        <div className='h-[250px] sm:h-[300px]'>


                            <ResponsiveContainer width="100%" height="100%">


                                <PieChart>


                                    <Pie
                                        data={pieData}

                                        dataKey="value"

                                        innerRadius={55}

                                        outerRadius={90}

                                        paddingAngle={4}
                                    >

                                        {
                                            pieData.map((entry, index) => (

                                                <Cell
                                                    key={`cell-${index}`}
                                                    fill={COLORS[index % COLORS.length]}
                                                />

                                            ))
                                        }

                                    </Pie>



                                    <Tooltip />

                                </PieChart>

                            </ResponsiveContainer>

                        </div>





                        {/* LEGENDS */}
                        <div className='flex flex-wrap gap-3 mt-5'>


                            {
                                pieData.map((item, index) => (

                                    <div
                                        key={index}

                                        className='flex items-center gap-2'
                                    >


                                        <div
                                            className='w-3 h-3 rounded-full'

                                            style={{
                                                backgroundColor:
                                                    COLORS[index % COLORS.length]
                                            }}
                                        >

                                        </div>



                                        <span className='text-xs text-gray-400'>

                                            {item.name}

                                        </span>

                                    </div>

                                ))
                            }

                        </div>

                    </div>





                    {/* AREA CHART */}
                    <div className='bg-[#071122]/80 backdrop-blur-xl border border-[#1E293B] rounded-3xl p-5 shadow-[0_0_30px_rgba(37,99,235,0.1)]'>


                        {/* TOP */}
                        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5'>


                            <h2 className='text-lg sm:text-xl font-semibold text-white'>

                                Spending Overview

                            </h2>



                            <span className='text-xs text-gray-500'>

                                Analytics

                            </span>

                        </div>





                        {/* AREA CHART */}
                        <div className='h-[250px] sm:h-[300px]'>


                            <ResponsiveContainer width="100%" height="100%">


                                <AreaChart
                                    data={pieData}
                                >


                                    <defs>

                                        <linearGradient
                                            id="colorExpense"
                                            x1="0"
                                            y1="0"
                                            x2="0"
                                            y2="1"
                                        >

                                            <stop
                                                offset="5%"
                                                stopColor="#3B82F6"
                                                stopOpacity={0.8}
                                            />

                                            <stop
                                                offset="95%"
                                                stopColor="#3B82F6"
                                                stopOpacity={0}
                                            />

                                        </linearGradient>

                                    </defs>





                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                        stroke="#1E293B"
                                    />





                                    <XAxis
                                        dataKey="name"
                                        stroke="#64748B"
                                        fontSize={10}
                                    />





                                    <Tooltip />





                                    <Area
                                        type="monotone"
                                        dataKey="value"
                                        stroke="#3B82F6"
                                        fillOpacity={1}
                                        fill="url(#colorExpense)"
                                    />

                                </AreaChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default Analytics