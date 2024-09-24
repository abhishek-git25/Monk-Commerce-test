import React from 'react'

import { Outlet } from 'react-router-dom'
import Header from '../component/header.jsx'

const Layout = () => {
    return (
        <div>
            <Header />
            <div className='main-content'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
