import React from 'react'
import coverImage from '/logos/x-cover-image.png'
import profilePic from '/logos/default-user-image.png'
import './UserProfile.css'
import { useUser } from '../../src/context/UserContext'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-dom'

const UserProfile = ({ setActiveSection }) => {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div className='user-profile-component'>
      <div className="user-information">
        <i className="bi bi-arrow-left" onClick={() => navigate('/')}></i>
        <h2 className="user-profile-username">{user?.username}</h2>
      </div>

      <div className="user-profile-images">
        <div className="cover-image">
          <img src={user?.coverImg || coverImage} alt="cover-image" />
        </div>
        <div className="user-profile-pic">
          <img src={user?.profileImg || profilePic} alt="profile-pic" />
        </div>
        <div className="user-profile-edit-btn">
          <button onClick={() => setActiveSection('editprofile')}>Edit Profile</button>
        </div>
      </div>

      <div className="user-profile-information">
        <h3 className="user-profile-username"> @ {user?.username}</h3>
        <h5 className="user-profile-fullname">{user?.fullname}</h5>
        <p className="user-profile-bio">{user?.bio || 'No Bio'}</p>

        <div className="link-and-date">
          <p className="user-profile-link">{user?.link || "No Link"}</p>
          <p className="user-profile-created">
            {user?.createdAt ? format(new Date(user.createdAt), "do MMMM yyyy") : "Unknown date"}
          </p>
        </div>

        <div className="following-followers-count">
          <p className="user-profile-following-count">{user?.following?.length || 0} Following</p>
          <p className="user-profile-followers-count">{user?.followers?.length || 0} Followers</p>
        </div>
      </div>
    </div>
  )
}

export default UserProfile
