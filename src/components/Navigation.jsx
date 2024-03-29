import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navigation = ({ userObj }) => {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/profile">{userObj.displayName}의 Profile</NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
