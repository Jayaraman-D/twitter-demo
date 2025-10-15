import React, { useState } from 'react'
import './Login.css'
import logo from '/logos/x-logo.png' // if file in public/logos folder

const Login = () => {
  const [userdata, setUserdata] = useState({
    username: '',
    password: ''
  })

  const handleLogin = () => {
    console.log('Logging in with:', userdata)
    setUserdata({
      username:'',
      password:''
    })
    // your login logic here
  }

  const isFormValid = userdata.username.trim() && userdata.password.trim()

  return (
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
  )
}

export default Login
