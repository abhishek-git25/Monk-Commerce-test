import React from 'react'
import monkLogo from "../assets/logos/monk _logo.png"

const Header = () => {
  return (
    <div>
      <header className="fixed-header">
      <div className="header-content">
        <img src={monkLogo} alt="Company Logo" className="logo" />
        <h1 className="company-name text-muted">Monk Upsell & Cross-sell</h1>
      </div>
    </header>
    </div>
  )
}

export default Header
