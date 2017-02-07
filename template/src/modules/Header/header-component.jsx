import React from 'react'

import logo from './header-logo.svg'
import './header-style.css'

const Header = () => (
  <div className="header">
    <img src={logo} className="header-logo" alt="logo" />
    <h2>Welcome to React</h2>
  </div>
)

export { Header as default }
