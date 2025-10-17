import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';
import { BaseURL } from '../../BaseUrl/BaseURL';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    username: '',
    profileImg: '',
    bio: ''
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const fetchUser = async () => {
    try {
      const res = await axios.get(`${BaseURL}/api/auth/me`, { withCredentials: true });
      setUser({
        username: res.data.username,
        bio: res.data.bio,
        profileImg: res.data.profileImg
      });
      setIsAuthenticated(true);
    } catch (error) {
      // Only log errors if user was previously authenticated
      if (isAuthenticated) {
        console.log('User fetch error:', error.message);
        toast.error(error.response?.data?.error || 'Failed to load user info');
      }
      setIsAuthenticated(false);
      setUser({
        username: '',
        bio: '',
        profileImg: ''
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Only fetch user if NOT on login/signup page
    if (location.pathname !== '/login' && location.pathname !== '/signup' && location.pathname !== '/') {
      fetchUser();
    } else {
      setLoading(false); // prevent blocking UI on login/signup page
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, setIsAuthenticated, loading, fetchUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
