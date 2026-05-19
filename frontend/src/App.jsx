import React from 'react'
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import AddExpense from "./pages/AddExpense"


import { BrowserRouter, Routes, Route } from "react-router-dom";
import Filters from './pages/Filters'
import Analytics from './pages/Analytics'
import ManageExpenses from './pages/ManageExpenses'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/add-expense' element={<AddExpense />} />

        <Route path='/filters' element={<Filters />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/manage-expenses' element={<ManageExpenses />} />



      </Routes>
    </BrowserRouter>
  );
};

export default App
