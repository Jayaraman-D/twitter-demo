import React, { useState } from 'react'
import './Signup.css'
import { Link } from 'react-router-dom'
import logo from '/logos/x-logo.png'

const Signup = () => {
  const [userdata, setUserdata] = useState({
    username: '',
    email: '',
    password: '',
    fullname: ''
  })

  const [message, setMessage] = useState('')

  // Check if all fields are non-empty
  const isFormValid =
    userdata.username.trim() &&
    userdata.email.trim() &&
    userdata.password.trim() &&
    userdata.fullname.trim()

  const handleSignupButton = () => {
    if (!isFormValid) {
      setMessage("Please fill all the input fields")
      return
    }
    console.log('Form submitted:', userdata)
    setMessage("Form submitted successfully!")
    setUserdata({
      username: '',
      email: '',
      password: '',
      fullname: ''
    })
  }

  return (
    <div className="container">
      <div className="logo">
        <img src={logo}alt='logo' />
      </div>
      <div className="signup">
        <form onSubmit={(e) => e.preventDefault()}>
          <h2>Create your account</h2>

          <input
            type='text'
            placeholder='Your fullname'
            value={userdata.fullname}
            onChange={(e) =>
              setUserdata({ ...userdata, fullname: e.target.value })
            }
          />
          <input
            type='email'
            placeholder='Email'
            value={userdata.email}
            onChange={(e) =>
              setUserdata({ ...userdata, email: e.target.value })
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
          <input
            type='text'
            placeholder='Username'
            value={userdata.username}
            onChange={(e) =>
              setUserdata({ ...userdata, username: e.target.value })
            }
          />

          <button
            type="button"
            onClick={handleSignupButton}
            disabled={!isFormValid}
          >
            Signup
          </button>

          {/* Show a message separately */}
          {message && <p>{message}</p>}

          <h3>Already have an account?</h3>
          <Link to='/login'>Login</Link>
        </form>
      </div>
    </div>
  )
}

export default Signup
