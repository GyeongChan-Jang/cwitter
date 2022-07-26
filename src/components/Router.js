import React, { useState } from 'react'
import { Routes, Route, Outlet, Link } from 'react-router-dom'
import Auth from '../routes/Auth'
import Home from '../routes/Home'

const AppRouter = ({ isLoggedIn }) => {
  return (
    <Routes>
      {isLoggedIn ? (
        <Route path="/" element={<Home />} />
      ) : (
        <Route path="/" element={<Auth />} />
      )}
    </Routes>
  )
}

export default AppRouter
