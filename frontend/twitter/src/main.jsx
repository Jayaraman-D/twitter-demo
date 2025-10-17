import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import App from './App.jsx';
import Login from './pages/auth/login/Login.jsx';
import Signup from './pages/auth/singnup/Signup.jsx';
import { UserProvider } from './context/UserContext.jsx';
import ProtectedRoute from './protectedRoute/ProtectedRoute.jsx';

// Top-level layout that wraps all routes with UserProvider
const RootLayout = () => (
  <UserProvider>
    <Outlet />
  </UserProvider>
);

const Router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: (
          <ProtectedRoute>
            <App />
          </ProtectedRoute>
        )
      },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },

    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={Router} />
  </StrictMode>
);
