import React from 'react';
import './Sidebar.css';
import logo from '/logos/x-logo.png';

const Sidebar = () => {
    return (
        <div className='sidebar'>
            <div className="container1">
                <div className="logo">
                    <img src={logo} alt='logo' />
                </div>
                <div className="bars">
                    <div className="home">
                        <i className="bi bi-house-door-fill"></i>
                        <p>Home</p>
                    </div>
                    <div className="notification">
                        <i className="bi bi-bell-fill"></i>
                        <p>Notification</p>
                    </div>
                    <div className="profile">
                        <i className="bi bi-person-fill"></i>
                        <p>Profile</p>
                    </div>

                </div>
            </div>

            <div className="container2">
                <div className="profile-img">
                    <h2>Jai</h2>
                    <h3>Developer</h3>
                </div>

            </div>



        </div>
    )
}
export default Sidebar;
