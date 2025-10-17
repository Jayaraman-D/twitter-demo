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
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);


    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${BaseURL}/api/posts/all`, { withCredentials: true });
                setUsersPost(res.data);
            } catch (error) {
                console.log('Error in fetching users posts:', error.message);
                toast.error(error.response?.data?.error || "Something went wrong")
            }
        }
        fetchUser();
    }, [newPost])
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = () => {
                setImage(reader.result);
                setPreview(reader.result)
            };
        }
    };

    const handleCreatePost = async () => {
        if (!newPost && !image) {
            toast.error("Please add text or an image before posting");
            return;
        }
        try {
            const res = await axios.post(`${BaseURL}/api/posts/create`, { text: newPost, img: image }, { withCredentials: true });
            toast.success(res.data.message);
            setnewPost('');
            setImage(null);
            setPreview(null);
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
                        <img src={user.profileImg || postimg} alt="dp" />
                        <h3 className="username">{user.username}</h3>
                    </div>
                    <input type="text" placeholder="What is happening?"
                        value={newPost} onChange={(e) => setnewPost(e.target.value)} />
                </div>

                {preview && (
                    <div className="image-preview">
                        <img src={preview} alt="preview" />
                        <button className='remove-img'
                            onClick={() => { setImage(null); setPreview(null) }}
                        >X</button>
                    </div>
                )}

                <div className="post-btn">
                    <div className="icons">
                        <input type="file"
                            id='imageUpload'
                            accept='image/*'
                            style={{ display: 'none' }}
                            onChange={handleImageChange} />

                        <label htmlFor='imageUpload'>
                            <i className='bi bi-image'></i>
                        </label>
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
                        {/* Render post text if available */}
                        {post.text && <p className="post-text">{post.text}</p>}

                        {/* Render image if available */}
                        {post.img && (
                            <div className="post-image">
                                <img src={post.img} alt="user post" />
                            </div>
                        )}
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