import React, { useEffect, useState } from 'react'
import './Post.css'
import postimg from '/logos/x-logo.png'
import axios from 'axios';
import { BaseURL } from '../../BaseUrl/BaseURL'

const Post = () => {
    const [usersPost, setUsersPost] = useState([]);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${BaseURL}/api/posts/all`, { withCredentials: true });
                setUsersPost(res.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchUser();
    }, [])
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

            {usersPost.length === 0 ? (<p>No Post</p>) : (
                usersPost.map((post) => (
                    <div className="posted" key={post._id}>
                        <div className="user-info">
                            <img src={post.user.profileImg || postimg} alt='dp' />
                            <h3 className="username">{post.user.username}</h3>
                        </div>
                        <h3>{post.text}</h3>
                        <div className="buttons">
                            <button>like</button>
                            <button>Comment</button>
                            <button>Share</button>
                        </div>
                    </div>
                ))
            )}
            <div className="posted">
                <div className="user-info">
                    <img src={postimg} alt="dp" />
                    <h3 className="username">ram</h3>
                </div>
                <h3>This is a post 1 Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, provident ipsam! Obcaecati ad doloremque quaerat, deserunt officia suscipit temporibus aliquid sit soluta voluptatibus porro, animi illo sint quisquam repellendus inventore.</h3>
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