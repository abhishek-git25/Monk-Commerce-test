import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from '../layout/layout'
import Home from '../views/home'

const Router = () => {

    const browserRouter = createBrowserRouter([
        {
            path : "/",
            element : <Layout/>,
            children : [
              {
                index : true,
                element : <Home/>
              }
            ]
        }
    ])


  return (
    <div>
    <RouterProvider router={browserRouter} />
    </div>
  )
}

export default Router
