import React, { useState } from 'react';
import './Homepage.css';
import Sidebar from '../../../../Components/sidebarComponent/Sidebar';
import Posts from '../../../../Components/PostsComponent/Posts';
import Suggestions from '../../../../Components/SuggestionsComponent/Suggestions';
import Profile from '../../../../Components/profileComponent/Profile';
import Notification from '../../../../Components/notificationComponent/Notification';

const Homepage = () => {
  const [activeSection, setActiveSection] = useState('home');
  return (
    <div className='homepage-container'>
      <Sidebar setActiveSection={setActiveSection} />
      <main className='main-content'>
        {activeSection === 'home' && <Posts />}
        {activeSection === 'notification' && <Notification />}
        {activeSection === 'profile' && <Profile />}
        {activeSection === 'suggestion' && <Suggestions />}
      </main>
      <aside className='suggestions-container'>
        <Suggestions />
      </aside>
    </div>
  );
};

export default Homepage;
