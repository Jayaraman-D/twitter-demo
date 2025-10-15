import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Login from './pages/auth/login/Login.jsx'
import Signup from './pages/auth/singnup/Signup.jsx'
import Toast from './Toast.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Homepage from './pages/Home/Homepage/Homepage.jsx'

const Router = createBrowserRouter([
  {
    path:'/',
    element: <App/>
  },
  {
    path:'/login',
    element:<Login />
  },
  {
    path:"/signup",
    element:<Signup />
  },
  {
    path:'/home',
    element: <Homepage/>
  },
  {
    path:'/toast',
    element:<Toast />
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router}>

    </RouterProvider>

  </StrictMode>,
)
