import React, { useEffect, useState } from 'react'
import './Following.css'
import postimg from '/logos/x-logo.png'
import axios from 'axios'
import { BaseURL } from '../../BaseUrl/BaseURL'
import { toast } from 'react-toastify'

const Following = () => {
    const [followingPost, setFollowingPost] = useState([]);
    const [message , setMessage] = useState('')

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${BaseURL}/api/posts/following`, { withCredentials: true });
                console.log('API RES:', res.data);
                if(Array.isArray(res.data)){
                    setFollowingPost(res.data);
                    setMessage('');
                }
                else{
                    setFollowingPost([]);
                    setMessage(res.data.message);
                }
            } catch (error) {
                console.log(`Error occured in get following posts: ${error.message}`);
                toast.error(error.response?.data?.error || "Something went wrong");
            }
        }
        fetchUser();
    }, [])
    return (
        <div className='post'>
            {followingPost.length === 0 ? (<p>{message}</p>) : (
                followingPost.map((post) => (
                    <div className="posted" key={post._id}>
                        <div className="user-info">
                            <img src={post.user.profileImg || postimg} alt='dp' />
                            <h3 className="username">{post.user.username}</h3>
                        </div>
                        <h3>{post.text}</h3>
                        <div className="buttons">
                            <button>like</button>
                            <button>Comment</button>
                            <button>share</button>
                        </div>
                    </div>
                ))
            )}
       
        </div>
    )
}

export default Following