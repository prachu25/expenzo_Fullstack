import React, { useEffect, useState } from 'react'

const Header = () => {

    const [user, setUser] = useState({})


    // GET USERNAME
    useEffect(() => {

        const storedUser = localStorage.getItem("user")

        if (storedUser) {

            setUser(JSON.parse(storedUser))
        }

    }, [])




    // FIRST LETTER
    const firstLetter = user?.username?.charAt(0).toUpperCase()




    return (

        <div>


            {/* TOP HEADER */}
            <div className='flex items-center justify-between mb-5'>


                {/* LEFT */}
                <div>

                    <h1 className='text-xl font-bold text-white'>

                        Welcome Back 👋

                    </h1>





                    <p className='text-gray-400 text-xs mt-1'>

                        Manage your expenses smartly

                    </p>

                </div>





                {/* PROFILE */}
                <div className='flex items-center gap-2 bg-[#071122]/80 border border-blue-900 px-3 py-2 rounded-xl'>


                    {/* LETTER */}
                    <div className='w-9 h-9 rounded-full bg-gradient-to-r from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xs'>

                        {firstLetter}

                    </div>





                    {/* NAME */}
                    <div>

                        <h2 className='text-white font-medium text-xs'>

                            {user?.username}

                        </h2>





                        <p className='text-gray-400 text-[10px]'>

                            {user?.profession}
                        </p>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default Header