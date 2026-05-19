import React from 'react'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import StatsCards from '../components/StatsCards'
import AnalyticSection from '../components/AnalyticSection'
import CategoryBreakdown from '../components/CategoryBreakdown'
import MonthlyOverview from '../components/MonthlyOverview'
import ExpensesTips from '../components/ExpensesTips'

const Dashboard = () => {

    return (

        <div className='min-h-screen flex bg-gradient-to-br from-[#020617] via-[#050816] to-[#0F3DDB] overflow-x-hidden'>


            {/* SIDEBAR */}
            <Sidebar />





            {/* MAIN CONTENT */}
            <div className='flex-1 p-4 sm:p-5 md:p-6 lg:p-8 overflow-y-auto overflow-x-hidden mt-[72px] lg:mt-0'>


                {/* HEADER */}
                <Header />





                {/* STATS CARDS */}
                <div className='mt-4'>

                    <StatsCards />

                </div>





                {/* ANALYTICS */}
                <div className='mt-5'>

                    <AnalyticSection />

                </div>





                {/* BOTTOM SECTION */}
                <div className='grid grid-cols-1 xl:grid-cols-3 gap-4 mt-5'>


                    {/* CATEGORY */}
                    <div className='w-full'>

                        <CategoryBreakdown />

                    </div>





                    {/* MONTHLY OVERVIEW */}
                    <div className='w-full'>

                        <MonthlyOverview />

                    </div>





                    {/* EXPENSE TIPS */}
                    <div className='w-full'>

                        <ExpensesTips />

                    </div>

                </div>

            </div>

        </div>

    )
}

export default Dashboard