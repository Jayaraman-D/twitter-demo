import React from 'react'
import './Post.css'
import postimg from '/logos/x-logo.png'

const Post = () => {
    return (
        <div className='post'>
            <div className="new-post">
                <div className="text-area">
                    <div className="user-info">
                        <img src={postimg} alt="dp" />
                        <h3 className="username">ram</h3>
                    </div>
                    <input type="text" placeholder="What is happening?" />
                </div>

                <div className="post-btn">
                    <div className="icons">
                        <i className="bi bi-image"></i>
                        <i className="bi bi-emoji-smile"></i>
                    </div>
                    <button type="button">Post</button>
                </div>
            </div>


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