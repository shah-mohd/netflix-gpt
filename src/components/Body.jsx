import React from 'react'
import Login from './Login'
import Browse from './Browse'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Header from './Header'

const Body = () => {

    const appRouter = createBrowserRouter([
        {
            path: '/',
            element: <Login />
        },
        {
            path: '/header',
            element: <Header />
        },
        {
            path: 'browse',
            element: <Browse />
        },
    ]);

  return (
    <div>
        <RouterProvider router={appRouter}>
            
        </RouterProvider>
    </div>
  )
}

export default Body