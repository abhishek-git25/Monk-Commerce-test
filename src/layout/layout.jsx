import React from 'react'

import { Outlet } from 'react-router-dom'
import Header from '../component/header.jsx'

const Layout = () => {
    return (
        <div>
            <Header />
            <div className='main-content mt-5 p-5'>
                <Outlet />
            </div>
        </div>
    )
}

export default Layout
