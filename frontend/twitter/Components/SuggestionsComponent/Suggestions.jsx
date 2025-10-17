import React, { useEffect, useState } from 'react'
import './Suggestions.css'
import dp from '/logos/x-logo.png'
import axios from 'axios';
import { BaseURL } from '../../BaseUrl/BaseURL';

const Suggestions = () => {
  const [suggestedUsers, setSuggestedUsers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BaseURL}/api/user/suggestions`, { withCredentials: true });
        setSuggestedUsers(res.data);
      } catch (error) {
        console.log(`Error occured in suggested fetch user: ${error.message}`);
      }
    }
    fetchUser();
  }, [])

  return (
  <div className="suggestions">
    {suggestedUsers.length === 0 ? (
      <p>No users</p>
    ) : (
      suggestedUsers.map((user) => (
        <div className="suggestUser" key={user._id}>
          <div className="user-info">
            <img src={user.profileImg || dp} alt="dp" />
            <p className="username">{user.username}</p>
          </div>
          <button type="button">Follow</button>
        </div>
      ))
    )}
  </div>
);

}

export default Suggestions