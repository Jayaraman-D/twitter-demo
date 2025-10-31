import React, { useState } from 'react'
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '/logos/x-logo.png'
import axios from 'axios'
import { BaseURL } from '../../../../BaseUrl/BaseURL'
import { ToastContainer, toast } from 'react-toastify'

const Signup = () => {
  const [userdata, setUserdata] = useState({
    username: '',
    email: '',
    password: '',
    fullname: ''
  })
  const navigate = useNavigate()
  const [message, setMessage] = useState('')

  const isFormValid =
    userdata.username.trim() &&
    userdata.email.trim() &&
    userdata.password.trim() &&
    userdata.fullname.trim()

  const handleSignupButton = async () => {
    if (!isFormValid) {
      setMessage("Please fill all the input fields")
      return
    }

    try {
      const res = await axios.post(`${BaseURL}/api/auth/signup`, userdata, { withCredentials: true })
      toast.success(res.data.message)
      setTimeout(() => navigate('/'), 1000)
      setUserdata({ username: '', email: '', password: '', fullname: '' })
    } catch (error) {
      console.log(error.message)
      toast.error(error.response?.data?.error || 'Signup failed')
    }
  }

  return (
    <>
      <div className="signup-page">
        {/* Left Section - Big X Logo */}
        <div className="signup-left">
          <img src={logo} alt="X logo" className="big-x-logo" />
        </div>

        {/* Right Section - Signup Form */}
        <div className="signup-right">
          <div className="signup-card">
            <h2>Create your account</h2>

            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label htmlFor="fullname">Full Name</label>
                <input
                  id="fullname"
                  type="text"
                  placeholder="Enter your full name"
                  value={userdata.fullname}
                  onChange={(e) => setUserdata({ ...userdata, fullname: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={userdata.email}
                  onChange={(e) => setUserdata({ ...userdata, email: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={userdata.password}
                  onChange={(e) => setUserdata({ ...userdata, password: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  id="username"
                  type="text"
                  placeholder="Choose a username"
                  value={userdata.username}
                  onChange={(e) => setUserdata({ ...userdata, username: e.target.value })}
                />
              </div>

              <button
                type="button"
                className="signup-btn"
                onClick={handleSignupButton}
                disabled={!isFormValid}
              >
                Sign up
              </button>

              {message && <p className="error-msg">{message}</p>}

              <div className="login-redirect">
                <p>Already have an account?</p>
                <Link to="/login">Login</Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" autoClose={1000} theme="dark" />
    </>
  )
}

export default Signup
