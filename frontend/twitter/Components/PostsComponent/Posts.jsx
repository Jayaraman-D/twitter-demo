import React, { useState } from 'react';
import './Posts.css';
import Post from './Post';
import Following from './Following';

const Posts = () => {
  const [feedtype, setFeedtype] = useState('foryou');

  const showForYou = () => {
    setFeedtype('foryou');
  };

  const showFollowing = () => {
    setFeedtype('following');
  };

  return (
    <div className="posts">
      <div className="feedtype">
        <button
          type="button"
          onClick={showForYou}
          className={feedtype === 'foryou' ? 'active' : ''}
        >
          For You
        </button>
        <button
          type="button"
          onClick={showFollowing}
          className={feedtype === 'following' ? 'active' : ''}
        >
          Following
        </button>
      </div>

      {feedtype === 'foryou' ? <Post /> : <Following />}
    </div>
  );
};

export default Posts;
