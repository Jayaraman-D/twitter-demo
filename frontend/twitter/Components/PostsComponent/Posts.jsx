import React, { useState } from 'react';
import './Posts.css';
import Post from './Post';
import Following from './Following';

const Posts = () => {
  const [feedtype, setFeedtype] = useState('foryou');

  const showForYou = () => {
    console.log(`For You button was clicked`);
    setFeedtype('foryou');
  };

  const showFollowing = () => {
    console.log('Following posts button was clicked')
    setFeedtype('following');
  };

  return (
    <div className="posts">
      <div className="feedtype">
        <button type="button" onClick={showForYou}>For You</button>
        <button type="button" onClick={showFollowing}>Following</button>
      </div>

      {feedtype === 'foryou' ? <Post /> : <Following />}
    </div>
  );
};

export default Posts;
