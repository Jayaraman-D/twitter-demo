import React, { useEffect, useState } from 'react';
import './Sidebar.css';
import axios from 'axios';
import logo from '/logos/x-logo.png';
import { BaseURL } from '../../BaseUrl/BaseURL.js'
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import { useUser } from '../../src/context/UserContext.jsx';

const Sidebar = ({setActiveSection}) => {
    const {user} = useUser();
    const navigate = useNavigate();
  
    
    const handleLogout = async () => {
        try {

            const res = await axios.get(`${BaseURL}/api/auth/logout`, { withCredentials: true });
            toast.success(res.data.message);
            setTimeout(() => {
                navigate('/login');
            }, 1000)

        } catch (error) {
            console.log(`Error Occured in Logout:  ${error.message}`);
            toast.error(error.response.data.error);
        }
    }

    return (
        <>
            <div className='sidebar'>
                <div className="container1">
                    <div className="logo">
                        <img src={logo} alt='logo' />
                    </div>
                    <div className="bars">
                        <div className="home" onClick={()=>setActiveSection('home')}>
                            <i className="bi bi-house-door-fill"></i>
                            <p>Home</p>
                        </div>
                        <div className="notification" onClick={()=> setActiveSection('notification')}>
                            <i className="bi bi-bell-fill"></i>
                            <p>Notification</p>
                        </div>
                        <div className="profile" onClick={()=> setActiveSection('profile')}>
                            <i className="bi bi-person-fill"></i>
                            <p>Profile</p>
                        </div>

                    </div>
                </div>

                <div className="container2">
                    <div className="profile-img">
                        <img src={user.profileImg || logo} alt='dp' />
                        <h2>{user.username}</h2>
                    </div>
                    <i className=" logout bi bi-box-arrow-right" onClick={handleLogout}></i>
                      
                </div>
                
            </div>

            <ToastContainer position='top-center' autoClose={1000} theme='dark' />
        </>
    )
}
export default Sidebar;
