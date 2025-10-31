import React, { useState } from 'react'
import UserProfile from '../userProfile/UserProfile.jsx'
import Posts from '../PostsComponent/Posts.jsx'
import EditProfile from '../editProfileComponent/EditProfile.jsx'

const Profile = () => {
  const [activeSection, setActiveSection] = useState('userprofile');

  return (
    <div>
      {activeSection === 'userprofile' && (
        <>
          <UserProfile setActiveSection={setActiveSection} />
          <Posts />
        </>
      )}

      {activeSection === 'editprofile' && (
        <EditProfile setActiveSection={setActiveSection} />
      )}
    </div>
  );
};

export default Profile;
