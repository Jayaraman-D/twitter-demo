import React from 'react';
import './Homepage.css';
import Sidebar from '../../../../Components/sidebarComponent/Sidebar';
import Posts from '../../../../Components/PostsComponent/Posts';
import Suggestions from '../../../../Components/SuggestionsComponent/Suggestions';

const Homepage = () => {
  return (
    <div className='homepage-container'>
      <Sidebar />
      <main className='main-content'>
        <Posts />
      </main>
      <aside className='suggestions-container'>
        <Suggestions />
      </aside>
    </div>
  );
};

export default Homepage;
