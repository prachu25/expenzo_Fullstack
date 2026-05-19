import React, { useEffect, useState } from 'react'
import axios from 'axios'
import BASE_URL from '../config'
import { Link } from 'react-router-dom'

import {

    ResponsiveContainer,
    AreaChart,
    Area,
    XAxis,
    Tooltip,
    CartesianGrid

} from 'recharts'

const AnalyticSection = () => {

    const [expenses, setExpenses] = useState([])

    const [selectedYear, setSelectedYear] = useState("2026")



    // FETCH EXPENSES
    const fetchExpenses = async () => {

        try {

            const email = localStorage.getItem("email")

            const response = await axios.get(

                `${BASE_URL}}/get-expenses/${email}`
            )
            setExpenses(response.data)

        } catch (error) {

            console.log(error)
        }
    }



    useEffect(() => {

        fetchExpenses()

    }, [])




    // FILTER BY YEAR
    const filteredExpenses = expenses.filter((expense) => {

        return expense.created_date?.includes(selectedYear)
    })




    // GROUP CATEGORY DATA
    const groupedData = {}

    filteredExpenses.forEach((expense) => {

        const category = expense.category

        const amount = Number(expense.amount)

        if (groupedData[category]) {

            groupedData[category] += amount

        } else {

            groupedData[category] = amount
        }
    })




    // FINAL CHART DATA
    const chartData = Object.keys(groupedData).map((category) => ({

        name: category,

        amount: groupedData[category]
    }))




    return (

        <div>


            {/* MAIN GRID */}
            <div className='grid grid-cols-1 xl:grid-cols-3 gap-3 mt-5'>


                {/* GRAPH SECTION */}
                <div className='xl:col-span-2 bg-[#071122]/80 border border-blue-900/50 p-4 rounded-2xl'>


                    {/* TOP */}
                    <div className='flex items-center justify-between mb-4'>


                        <h1 className='text-sm font-semibold text-white'>

                            Monthly Expense Analytics

                        </h1>





                        <select
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className='bg-[#0F172A] border border-gray-700 text-gray-300 px-2 py-1 rounded-lg text-[11px] outline-none'
                        >

                            <option value="2025">

                                2027

                            </option>


                            <option value="2026">

                                2026

                            </option>

                            <option value="2025">

                                2025

                            </option>




                        </select>

                    </div>





                    {/* CHART */}
                    <div className='w-full h-[220px]'>


                        {
                            chartData.length === 0 ? (

                                <div className='w-full h-full flex items-center justify-center text-gray-500 text-xs border border-dashed border-blue-900 rounded-xl'>

                                    No Expense Data Found

                                </div>

                            ) : (

                                <ResponsiveContainer width="100%" height="100%">

                                    <AreaChart
                                        data={chartData}
                                    >

                                        {/* GRADIENT */}
                                        <defs>

                                            <linearGradient
                                                id="expenseColor"
                                                x1="0"
                                                y1="0"
                                                x2="0"
                                                y2="1"
                                            >

                                                <stop
                                                    offset="5%"
                                                    stopColor="#3B82F6"
                                                    stopOpacity={0.7}
                                                />

                                                <stop
                                                    offset="95%"
                                                    stopColor="#3B82F6"
                                                    stopOpacity={0}
                                                />

                                            </linearGradient>

                                        </defs>





                                        {/* GRID */}
                                        <CartesianGrid
                                            strokeDasharray="3 3"
                                            stroke="#1E293B"
                                        />





                                        {/* X AXIS */}
                                        <XAxis
                                            dataKey="name"
                                            stroke="#64748B"
                                            fontSize={10}
                                        />





                                        {/* TOOLTIP */}
                                        <Tooltip />





                                        {/* AREA */}
                                        <Area
                                            type="monotone"
                                            dataKey="amount"
                                            stroke="#3B82F6"
                                            fillOpacity={1}
                                            fill="url(#expenseColor)"
                                        />

                                    </AreaChart>

                                </ResponsiveContainer>
                            )
                        }

                    </div>

                </div>





                {/* RECENT EXPENSES */}
                <div className='bg-[#071122]/80 border border-blue-900/50 p-4 rounded-2xl'>


                    {/* TOP */}
                    <div className='flex items-center justify-between mb-4'>


                        <h1 className='text-sm font-semibold text-white'>

                            Recent Expenses

                        </h1>





                        <Link to="/add-expense">

                            <button className='bg-gradient-to-r from-blue-500 to-blue-700 text-white px-3 py-1.5 rounded-lg text-[10px]'>

                                Add

                            </button>

                        </Link>

                    </div>





                    {/* LIST */}
                    <div className='space-y-3'>


                        {
                            expenses.length > 0 ? (

                                expenses
                                    .slice(-3)
                                    .reverse()
                                    .map((expense, index) => (

                                        <div
                                            key={index}
                                            className='flex items-center justify-between bg-[#0F172A] border border-[#1E293B] p-3 rounded-xl'
                                        >

                                            <div>

                                                <h2 className='text-white text-xs font-medium'>

                                                    {expense.title}

                                                </h2>





                                                <p className='text-gray-400 text-[10px] mt-1'>

                                                    {expense.category}

                                                </p>

                                            </div>





                                            <div className='text-right'>


                                                <h1 className='text-red-400 text-xs font-semibold'>

                                                    ₹{expense.amount}

                                                </h1>





                                                <p className='text-gray-500 text-[10px] mt-1'>

                                                    {expense.created_date || "No Date"}

                                                </p>

                                            </div>

                                        </div>
                                    ))

                            ) : (

                                <div className='text-gray-500 text-xs text-center py-10'>

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

export default AnalyticSection