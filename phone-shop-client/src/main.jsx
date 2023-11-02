import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import myRouter from './router/Router.jsx'
import AuthProvider from './components/auth-provider/AuthProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider><RouterProvider router={myRouter}></RouterProvider></AuthProvider>
  </React.StrictMode>,
)
