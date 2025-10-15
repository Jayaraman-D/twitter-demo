import React from 'react'
import './Homepage.css'
import Sidebar from '../../../../Components/sidebarComponent/Sidebar'
import Posts from '../../../../Components/PostsComponent/Posts'
import Suggestions from '../../../../Components/SuggestionsComponent/Suggestions'

const Homepage = () => {
  return (
    <div className='homepage'>
        <Sidebar/>
        <Posts/>
        <Suggestions/>
    </div>
  )
}

export default Homepage