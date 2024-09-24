import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../layout/layout'

const Router = () => {

    const browserRouter = createBrowserRouter([
        {
            path : "/",
            element : <Layout/>
        }
    ])


  return (
    <div>
    <RouterProvider router={browserRouter} />
    </div>
  )
}

export default Router
