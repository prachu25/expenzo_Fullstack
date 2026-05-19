import React, { useState } from 'react'
import {
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash
} from "react-icons/fa"

import axios from "axios"
import { useNavigate } from "react-router-dom"
import BASE_URL from "../config"

const Login = () => {

    // STATES
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)

    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const navigate = useNavigate()



    // LOGIN FUNCTION
    const handleLogin = async (e) => {

        e.preventDefault()

        setError("")
        setMessage("")

        try {

            const response = await axios.post(`${BASE_URL}/login`, {

                email,
                password

            })

            // SUCCESS MESSAGE
            setMessage(response.data.message)

            // STORE USER DATA
            localStorage.setItem(
                "user",
                JSON.stringify(response.data.user)
            )

            // STORE EMAIL
            localStorage.setItem("email", email)

            // REDIRECT
            setTimeout(() => {

                navigate("/dashboard")

            }, 1500)

        }

        catch (err) {

            setError(
                err.response?.data?.error || "Something went wrong"
            )

        }

    }




    return (

        <div className='min-h-screen flex items-center justify-center px-4 py-6 bg-gradient-to-br from-[#020617] via-[#050816] to-[#0F3DDB]'>

            {/* CARD */}
            <div className='w-full max-w-md sm:max-w-lg bg-[#071122]/80 backdrop-blur-lg border border-blue-900 rounded-3xl shadow-[0_0_60px_rgba(37,99,235,0.25)] p-6 sm:p-8 md:p-10'>


                {/* HEADING */}
                <h1 className='text-3xl sm:text-4xl font-bold text-center text-blue-500 tracking-tight'>

                    Expenzo

                </h1>



                {/* SUBTITLE */}
                <p className='text-gray-400 text-center mt-3 text-sm sm:text-base'>

                    Welcome back! Please login to your account

                </p>




                {/* ERROR */}
                {
                    error &&

                    <div className='bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-xl mt-6 text-center text-sm'>

                        {error}

                    </div>
                }




                {/* FORM */}
                <form
                    onSubmit={handleLogin}
                    className='mt-6'
                >


                    {/* EMAIL */}
                    <div className='flex items-center bg-[#0F172A] p-4 rounded-2xl border border-gray-700'>

                        <FaEnvelope className='text-blue-500 mr-3 text-sm sm:text-base' />

                        <input
                            type="email"
                            placeholder='john@gmail.com'

                            value={email}
                            onChange={(e) => setEmail(e.target.value)}

                            required

                            className='bg-transparent outline-none text-gray-300 w-full placeholder:text-gray-500 text-sm sm:text-base'
                        />

                    </div>





                    {/* PASSWORD */}
                    <div className='flex items-center bg-[#111827] mt-4 p-4 rounded-2xl border border-gray-700'>

                        <FaLock className='text-blue-500 mr-3 text-sm sm:text-base' />

                        <input
                            type={showPassword ? "text" : "password"}

                            placeholder='Enter your password'

                            value={password}
                            onChange={(e) => setPassword(e.target.value)}

                            required

                            className='bg-transparent outline-none text-gray-300 w-full placeholder:text-gray-500 text-sm sm:text-base'
                        />



                        {
                            showPassword ?

                                <FaEyeSlash
                                    onClick={() => setShowPassword(false)}
                                    className='text-blue-500 cursor-pointer text-base sm:text-lg'
                                />

                                :

                                <FaEye
                                    onClick={() => setShowPassword(true)}
                                    className='text-blue-500 cursor-pointer text-base sm:text-lg'
                                />
                        }

                    </div>





                    {/* BUTTON */}
                    <button
                        type="submit"

                        className={`w-full mt-6 text-white p-3 sm:p-4 rounded-2xl font-semibold transition duration-300 text-sm sm:text-base

                        ${message

                                ? "bg-green-700"

                                : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"

                            }`}
                    >

                        {
                            message

                                ? "Login Successful ✓"

                                : "Login"

                        }

                    </button>

                </form>





                {/* REGISTER */}
                <div className='mt-6 text-center'>

                    <p className='text-gray-400 text-sm sm:text-base'>

                        Don't have an account?

                    </p>



                    <p
                        onClick={() => navigate("/register")}
                        className='text-blue-500 mt-2 cursor-pointer hover:text-blue-300 text-sm sm:text-base font-medium'
                    >

                        Create one

                    </p>

                </div>

            </div>

        </div>

    )
}

export default Login