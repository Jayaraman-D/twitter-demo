import React, { useState, useEffect, createContext, useContext } from 'react'
import axios from 'axios'
import { BaseURL } from '../../BaseUrl/BaseURL'
import { toast } from 'react-toastify'

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        username: '',
        profileImg: '',
        bio: ''
    });

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${BaseURL}/api/auth/me`, { withCredentials: true });
                setUser({
                    username: res.data.username,
                    bio: res.data.bio,
                    profileImg: res.data.profileImg
                });
            } catch (error) {
                console.log('User fetch error: ', error.message);
                toast.error(error.response?.data?.error || "Failed to load the user info");
            }
        }
        fetchUser();
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );

};

export const useUser = () => useContext(UserContext);