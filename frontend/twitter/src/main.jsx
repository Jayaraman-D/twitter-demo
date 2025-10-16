import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import Login from './pages/auth/login/Login.jsx';
import Signup from './pages/auth/singnup/Signup.jsx';
import Toast from './Toast.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Homepage from './pages/Home/Homepage/Homepage.jsx';
import { UserProvider } from './context/UserContext.jsx';

const Router = createBrowserRouter([
  {
    path: '/',
    element: (
      <UserProvider>
        <App />
      </UserProvider>
    )
  },
  {
    path: '/login',
    element: (
      <UserProvider>
        <Login />
      </UserProvider>
    )
  },
  {
    path: '/signup',
    element: (
      <UserProvider>
        <Signup />
      </UserProvider>
    )
  },
  {
    path: '/home',
    element: (
      <UserProvider>
        <Homepage />
      </UserProvider>
    )
  },
  {
    path: '/toast',
    element: (
      <UserProvider>
        <Toast />
      </UserProvider>
    )
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>
);
