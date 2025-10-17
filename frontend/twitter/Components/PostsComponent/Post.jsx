import React, { useEffect, useState } from 'react'
import './Post.css'
import postimg from '/logos/x-logo.png'
import axios from 'axios';
import { BaseURL } from '../../BaseUrl/BaseURL'
import { useUser } from '../../src/context/UserContext';
import { toast } from 'react-toastify';

const Post = () => {
    const [usersPost, setUsersPost] = useState([]);
    const { user } = useUser();
    const [newPost, setnewPost] = useState('');


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${BaseURL}/api/posts/all`, { withCredentials: true });
                setUsersPost(res.data);
            } catch (error) {
                console.log('Error in fetching users posts:' ,error.message);
                toast.error(error.response?.data?.error || "Something went wrong")
            }
        }
        fetchUser();
    }, [newPost])
    const handleCreatePost = async () => {
        try {
            const res = await axios.post(`${BaseURL}/api/posts/create`, { text: newPost }, { withCredentials: true });
            toast.success(res.data.message);
            setnewPost('');
        } catch (error) {
            console.log('Error occured in handle create post:', error.message);
            toast.error(error.response?.data.error);
        }
    }

    return (
        <div className='post'>
            <div className="new-post">
                <div className="text-area">
                    <div className="user-info">
                        <img src={user.profileImge || postimg} alt="dp" />
                        <h3 className="username">{user.username}</h3>
                    </div>
                    <input type="text" placeholder="What is happening?"
                        value={newPost} onChange={(e) => setnewPost(e.target.value)} />
                </div>

                <div className="post-btn">
                    <div className="icons">
                        <i className="bi bi-image"></i>
                        <i className="bi bi-emoji-smile"></i>
                    </div>
                    <button type="button" onClick={handleCreatePost}>Post</button>
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
          
        </div>
    )
}

export default Post