import React from 'react'
import './Post.css'
import postimg from '/logos/x-logo.png'

const Post = () => {
  return (
    <div className='post'>
        <div className="posted">
            <h3>This is a post 1</h3>
            <div className="buttons">
                <button>like</button>
                 <button>Comment</button>
                  <button>share</button>
            </div>
        </div>

        <div className="posted">
            <h3>This is a post 2</h3>
            <div className="buttons">
                <button>like</button>
                 <button>Comment</button>
                  <button>share</button>
            </div>
        </div>

        <div className="posted">
            <h3>This is a post 4</h3>
            <div className="buttons">
                <button>like</button>
                 <button>Comment</button>
                  <button>share</button>
            </div>
        </div>
    </div>
  )
}

export default Post