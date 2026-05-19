import React, { useState } from 'react'

import {
    FiUser,
    FiMail,
    FiLock,
    FiPhone,
    FiGlobe,
    FiBriefcase,
    FiEye,
    FiEyeOff,
    FiArrowRight
} from 'react-icons/fi'

import axios from "axios"
import { useNavigate } from "react-router-dom"
import BASE_URL from "../config"

const RegisterPage = () => {

    const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)

    const [message, setMessage] = useState("")
    const [error, setError] = useState("")

    const [formData, setFormData] = useState({

        userid: '',
        username: '',
        email: '',
        password: '',
        phone: '',
        country: '',
        profession: ''

    })



    // HANDLE INPUT CHANGE
    const handleInputChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value

        })

    }





    // REGISTER FUNCTION
    const handleSubmit = async (e) => {

        e.preventDefault()

        setError("")
        setMessage("")

        try {

            const response = await axios.post(
                `${BASE_URL}/register`,
                formData
            )

            setMessage(response.data.messages)

            setTimeout(() => {

                navigate("/")

            }, 1800)

        }

        catch (err) {

            setError(
                err.response?.data?.error ||
                "Something went wrong"
            )

        }

    }





    // COUNTRIES
    const countries = [

        'India',
        'United States',
        'Canada',
        'United Kingdom',
        'Australia',
        'Germany',
        'France',
        'Italy',
        'Japan',
        'Singapore',
        'Brazil',
        'Pakistan',
        'Bangladesh',
        'Sri Lanka',
        'Nepal'

    ]





    return (

        <div className="min-h-screen bg-gradient-to-br from-[#020617] via-[#050816] to-[#0F3DDB] flex items-center justify-center px-4 py-6">

            {/* MAIN CARD */}
            <div className="w-full max-w-6xl">

                <div className="bg-[#071122]/80 backdrop-blur-lg border border-blue-900 rounded-3xl shadow-[0_0_60px_rgba(37,99,235,0.25)] p-5 sm:p-8 md:p-10 lg:p-12">


                    {/* HEADER */}
                    <div className="text-center mb-8 sm:mb-10">


                        {/* LOGO */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-r from-blue-500 to-blue-700 rounded-3xl flex items-center justify-center mx-auto mb-4 shadow-[0_0_30px_rgba(37,99,235,0.5)]">

                            <FiArrowRight className="w-8 h-8 text-blue-900 rotate-[-45deg]" />

                        </div>



                        {/* TITLE */}
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-500 tracking-tight">

                            Expenzo

                        </h1>



                        {/* TAGLINE */}
                        <p className="text-blue-300 text-base sm:text-lg md:text-xl font-medium mt-3">

                            Manage Money Smarter & Faster

                        </p>



                        {/* SUBTITLE */}
                        <p className="text-gray-400 mt-3 max-w-3xl mx-auto text-sm sm:text-base">

                            Track daily spending, manage budgets and stay financially organized.

                        </p>

                    </div>





                    {/* ERROR MESSAGE */}
                    {
                        error &&

                        <div className='bg-red-500/20 border border-red-500 text-red-400 p-3 rounded-xl mb-5 text-center text-sm sm:text-base'>

                            {error}

                        </div>
                    }





                    {/* FORM */}
                    <form
                        onSubmit={handleSubmit}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
                    >


                        {/* USER ID */}
                        <div>

                            <label className="block text-sm font-semibold text-blue-100 mb-2">

                                User ID

                            </label>

                            <div className="flex items-center bg-[#0F172A] border border-gray-700 rounded-2xl px-4 py-3 sm:py-4">

                                <FiUser className="text-blue-500 mr-3 text-lg" />

                                <input
                                    type="text"
                                    name="userid"
                                    required
                                    placeholder="Enter User ID"
                                    value={formData.userid}
                                    onChange={handleInputChange}
                                    className="bg-transparent outline-none w-full text-white placeholder:text-gray-500 text-sm sm:text-base"
                                />

                            </div>

                        </div>





                        {/* USERNAME */}
                        <div>

                            <label className="block text-sm font-semibold text-blue-100 mb-2">

                                Username

                            </label>

                            <div className="flex items-center bg-[#0F172A] border border-gray-700 rounded-2xl px-4 py-3 sm:py-4">

                                <FiUser className="text-blue-500 mr-3 text-lg" />

                                <input
                                    type="text"
                                    name="username"
                                    required
                                    placeholder="Enter Username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className="bg-transparent outline-none w-full text-white placeholder:text-gray-500 text-sm sm:text-base"
                                />

                            </div>

                        </div>





                        {/* EMAIL */}
                        <div>

                            <label className="block text-sm font-semibold text-blue-100 mb-2">

                                Email

                            </label>

                            <div className="flex items-center bg-[#0F172A] border border-gray-700 rounded-2xl px-4 py-3 sm:py-4">

                                <FiMail className="text-blue-500 mr-3 text-lg" />

                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="Enter Email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="bg-transparent outline-none w-full text-white placeholder:text-gray-500 text-sm sm:text-base"
                                />

                            </div>

                        </div>





                        {/* PASSWORD */}
                        <div>

                            <label className="block text-sm font-semibold text-blue-100 mb-2">

                                Password

                            </label>

                            <div className="flex items-center bg-[#0F172A] border border-gray-700 rounded-2xl px-4 py-3 sm:py-4">

                                <FiLock className="text-blue-500 mr-3 text-lg" />

                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    placeholder="Enter Password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className="bg-transparent outline-none w-full text-white placeholder:text-gray-500 text-sm sm:text-base"
                                />

                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                >

                                    {
                                        showPassword

                                            ?

                                            <FiEyeOff className="text-blue-500 text-lg" />

                                            :

                                            <FiEye className="text-blue-500 text-lg" />
                                    }

                                </button>

                            </div>

                        </div>





                        {/* PHONE */}
                        <div>

                            <label className="block text-sm font-semibold text-blue-100 mb-2">

                                Phone Number

                            </label>

                            <div className="flex items-center bg-[#0F172A] border border-gray-700 rounded-2xl px-4 py-3 sm:py-4">

                                <FiPhone className="text-blue-500 mr-3 text-lg" />

                                <input
                                    type="text"
                                    name="phone"
                                    required
                                    placeholder="Enter Phone Number"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="bg-transparent outline-none w-full text-white placeholder:text-gray-500 text-sm sm:text-base"
                                />

                            </div>

                        </div>





                        {/* COUNTRY */}
                        <div>

                            <label className="block text-sm font-semibold text-blue-100 mb-2">

                                Country

                            </label>

                            <div className="flex items-center bg-[#0F172A] border border-gray-700 rounded-2xl px-4 py-3 sm:py-4">

                                <FiGlobe className="text-blue-500 mr-3 text-lg" />

                                <select
                                    name="country"
                                    required
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="bg-transparent outline-none w-full text-white text-sm sm:text-base"
                                >

                                    <option value="">Select Country</option>

                                    {
                                        countries.map((country) => (

                                            <option
                                                key={country}
                                                value={country}
                                                className="text-black"
                                            >

                                                {country}

                                            </option>

                                        ))
                                    }

                                </select>

                            </div>

                        </div>





                        {/* PROFESSION */}
                        <div className="md:col-span-2">

                            <label className="block text-sm font-semibold text-blue-100 mb-2">

                                Profession (Optional)

                            </label>

                            <div className="flex items-center bg-[#0F172A] border border-gray-700 rounded-2xl px-4 py-3 sm:py-4">

                                <FiBriefcase className="text-blue-500 mr-3 text-lg" />

                                <input
                                    type="text"
                                    name="profession"
                                    placeholder="Enter Profession"
                                    value={formData.profession}
                                    onChange={handleInputChange}
                                    className="bg-transparent outline-none w-full text-white placeholder:text-gray-500 text-sm sm:text-base"
                                />

                            </div>

                        </div>





                        {/* BUTTON */}
                        <button
                            type="submit"

                            className={`md:col-span-2 w-full mt-4 text-white p-3 sm:p-4 rounded-2xl text-sm sm:text-base font-semibold transition duration-300 shadow-[0_0_25px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3

                            ${message

                                    ? "bg-green-700"

                                    : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"

                                }`}
                        >

                            {
                                message

                                    ?

                                    "Account Created Successfully ✓"

                                    :

                                    "Create Account"
                            }

                            <FiArrowRight className="w-5 h-5" />

                        </button>

                    </form>





                    {/* LOGIN LINK */}
                    <div className="mt-8 pt-6 border-t border-gray-700 text-center">

                        <p className="text-gray-400 text-sm sm:text-base">

                            Already have an account?{" "}

                            <span
                                onClick={() => navigate("/")}
                                className="text-blue-500 hover:text-blue-400 font-semibold cursor-pointer transition-colors"
                            >

                                Login

                            </span>

                        </p>

                    </div>

                </div>

            </div>

        </div>

    )
}

export default RegisterPage