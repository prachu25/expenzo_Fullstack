import React, { useState } from 'react'

import { Link, useNavigate, useLocation } from 'react-router-dom'

import {
    FiHome,
    FiPlusCircle,
    FiPieChart,
    FiEdit2,
    FiFilter,
    FiLogOut,
    FiDollarSign,
    FiMenu,
    FiX
} from "react-icons/fi"

const Sidebar = () => {

    const navigate = useNavigate()
    const location = useLocation()

    const [openSidebar, setOpenSidebar] = useState(false)




    // LOGOUT USER
    const logoutUser = () => {

        localStorage.clear()

        navigate("/")

    }





    // MENU ITEMS
    const menuItems = [

        {
            name: "Dashboard",
            icon: <FiHome />,
            path: "/dashboard"
        },

        {
            name: "Add Expense",
            icon: <FiPlusCircle />,
            path: "/add-expense"
        },

        {
            name: "Manage Expenses",
            icon: <FiEdit2 />,
            path: "/manage-expenses"
        },

        {
            name: "Analytics",
            icon: <FiPieChart />,
            path: "/analytics"
        },

        {
            name: "Filters",
            icon: <FiFilter />,
            path: "/filters"
        }

    ]





    return (

        <>

            {/* MOBILE TOPBAR */}
            <div className='lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#071122]/95 backdrop-blur-xl border-b border-blue-900 px-4 py-4 flex items-center justify-between'>


                {/* LOGO */}
                <div className='flex items-center gap-3'>


                    <div className='w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center'>

                        <FiDollarSign className='text-white text-base' />

                    </div>



                    <div>

                        <h1 className='text-base font-bold text-blue-500'>

                            Expensezo

                        </h1>

                    </div>

                </div>





                {/* MENU BUTTON */}
                <button
                    onClick={() => setOpenSidebar(true)}
                    className='text-white text-2xl'
                >

                    <FiMenu />

                </button>

            </div>





            {/* OVERLAY */}
            {
                openSidebar &&

                <div
                    onClick={() => setOpenSidebar(false)}
                    className='lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40'
                />
            }





            {/* SIDEBAR */}
            <div className={`

                fixed lg:static top-0 left-0 z-50

                w-[250px] min-h-screen

                bg-[#071122]/95
                backdrop-blur-xl
                border-r border-blue-900

                p-5

                flex flex-col justify-between

                transition-transform duration-300

                ${openSidebar

                    ? "translate-x-0"

                    : "-translate-x-full lg:translate-x-0"
                }

            `}>


                <div>


                    {/* TOP */}
                    <div className='flex items-center justify-between mb-8'>


                        {/* LOGO */}
                        <div className='flex items-center gap-3'>


                            <div className='w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center'>

                                <FiDollarSign className='text-white text-lg' />

                            </div>



                            <div>

                                <h1 className='text-lg font-bold text-blue-500'>

                                    Expenzo

                                </h1>

                                <p className='text-gray-400 text-[10px]'>

                                    Finance Dashboard

                                </p>

                            </div>

                        </div>





                        {/* CLOSE BUTTON */}
                        <button
                            onClick={() => setOpenSidebar(false)}
                            className='lg:hidden text-white text-2xl'
                        >

                            <FiX />

                        </button>

                    </div>





                    {/* MENUS */}
                    <div className='space-y-3'>


                        {
                            menuItems.map((item, index) => (

                                <Link
                                    key={index}
                                    to={item.path}

                                    onClick={() => setOpenSidebar(false)}
                                >

                                    <div className={`

                                        flex items-center gap-3

                                        p-3 rounded-2xl

                                        cursor-pointer

                                        transition duration-300

                                        mt-2

                                        ${location.pathname === item.path

                                            ?

                                            "bg-gradient-to-r from-blue-500 to-blue-700 text-white shadow-[0_0_25px_rgba(37,99,235,0.35)]"

                                            :

                                            "text-gray-300 hover:bg-[#0F172A] hover:text-white"
                                        }

                                    `}>


                                        {item.icon}



                                        <span className='font-medium text-sm'>

                                            {item.name}

                                        </span>

                                    </div>

                                </Link>

                            ))
                        }

                    </div>

                </div>





                {/* LOGOUT */}
                <div className='mt-10'>


                    <button
                        onClick={logoutUser}

                        className='flex items-center justify-center gap-2 w-full bg-red-500/20 hover:bg-red-500 text-red-400 hover:text-white border border-red-500 p-3 rounded-2xl transition duration-300 text-sm font-medium'
                    >

                        <FiLogOut className='text-base' />

                        Logout

                    </button>

                </div>

            </div>

        </>

    )
}

export default Sidebar