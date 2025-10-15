import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { BaseURL } from '../../../../BaseUrl/BaseURL';
import { ToastContainer, toast } from 'react-toastify';
import logo from '/logos/x-logo.png' // if file in public/logos folder
import {useNavigate} from 'react-router-dom'
const Login = () => {
  const [userdata, setUserdata] = useState({
    username: '',
    password: ''
  })

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      console.log('Logging in with:', userdata);
      const res = await axios.post(`${BaseURL}/api/auth/login`, { username: userdata.username, password: userdata.password }, { withCredentials: true });
      console.log(res.data);
      toast.success(res.data.message);

      setUserdata({
      username: '',
      password: ''
    })

    setTimeout(()=>{
      navigate('/');
    },1000)

    } catch (error) {
      console.log(error.message);
      toast.error(error.response.data.error);
    }

  }

  const isFormValid = userdata.username.trim() && userdata.password.trim()

  return (
    <>
      <div className="login-container">
        <div className="logo">
          <img className='login-image-logo' src={logo} alt='logo' />
        </div>
        <div className="login">
          <form onSubmit={(e) => e.preventDefault()}>
            <h2>Log in to X</h2>
            <input
              type='text'
              placeholder='Username'
              value={userdata.username}
              onChange={(e) =>
                setUserdata({ ...userdata, username: e.target.value })
              }
            />
            <input
              type='password'
              placeholder='Password'
              value={userdata.password}
              onChange={(e) =>
                setUserdata({ ...userdata, password: e.target.value })
              }
            />
            <button
              type='button'
              onClick={handleLogin}
              disabled={!isFormValid}
            >
              Login
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position='top-center' autoClose={1000} theme='dark' />
    </>
  )

}

export default Login
