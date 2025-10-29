import React from 'react'
import coverImage from '/logos/cover-image.png'
import profilePic from '/logos/profile-pic.png'
import './UserProfile.css'

const UserProfile = () => {
    return (
        <div className='user-profile-component'>
            <div className="user-information">
                <i className="bi bi-arrow-left"></i>
                <h2 className="userProfile-username">Bala</h2>
                <p className="post-count">4 posts</p>
            </div>

            <div className="user-profile-images">
                <div className="cover-image">
                    <img src={coverImage} alt="cover-image" />
                </div>
                <div className="user-profile-pic">
                    <img src={profilePic} alt="profile-pic" />
                </div>

                <div className="user-profile-edit-btn">
                    <button>Edit Profile</button>
                </div>
            </div>

            <div className="user-profile-information">
                <h3 className="user-profile-username">Jai</h3>
                <h5 className="user-profile-fullname">Jairam</h5>
                <p className="user-profile-bio">Developer</p>
                <div className="link-and-date">
                    <p className="user-profile-link">www.youtube.com</p>
                    <p className="user-profile-created">6 September 2025</p>
                </div>

                <div className="following-followers-count">
                    <p className="user-profile-following-count">10 Following</p>
                    <p className="user-profile-followers-count">20 Following</p>
                </div>

            </div>

        </div>
    )
}

export default UserProfile