import React, { useEffect, useState } from 'react'
import './Post.css'
import postimg from '/logos/x-logo.png'
import axios from 'axios';
import { BaseURL } from '../../BaseUrl/BaseURL'
import { useUser } from '../../src/context/UserContext';
import { toast } from 'react-toastify';
import { formatDistanceToNow } from 'date-fns';
import CommentSection from '../commentSection/CommentSection';
import { motion, AnimatePresence } from 'framer-motion';


const Post = () => {
    const [usersPost, setUsersPost] = useState([]);
    const { user } = useUser();
    const [newPost, setnewPost] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);
    const [refresh, setRefresh] = useState(false);
    const [activePost, setActivePost] = useState(null);
    const [showComments, setShowComments] = useState(false);


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
    }, [newPost, refresh])

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

    const handleDeletePost = async (id) => {
        try {
            const res = await axios.delete(`${BaseURL}/api/posts/delete/${id}`, { withCredentials: true });
            toast.success(res.data.message);
            setRefresh(!refresh);
        } catch (error) {
            console.log(`Error occured in delete post: ${error.message}`);
            toast.error(error.response?.data?.error || "Something went wrong");
        }
    }

    const handleLikeAndUnlike = async (id) => {
        try {
            const res = await axios.post(`${BaseURL}/api/posts/like/${id}`, {}, { withCredentials: true });
            toast.success(res.data.message);
            setRefresh(!refresh);
        } catch (error) {
            console.log(`Error occured in like&unlike button: ${error.message}`);
            toast.error(error.response?.data?.error);
        }
    }

    const handleToggleComments = (postId) => {
        setActivePost((prev) => (prev === postId ? null : postId));
    };



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
                            <h6 className='time'>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</h6>
                            {post.user?._id === user?._id && (
                                <i className="bi bi-trash delete" onClick={() => handleDeletePost(post._id)}></i>
                            )}



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
                            <button onClick={() => handleLikeAndUnlike(post._id)}><i className="bi bi-suit-heart"></i> {post.likes?.length || 0}</button>
                            <button onClick={() => setActivePost(activePost === post._id ? null : post._id)}>
                                <i className="bi bi-chat"></i> {post.comments?.length || 0}
                            </button>

                            <button><i className="bi bi-send-arrow-up"></i></button>
                        </div>

                        <AnimatePresence>
                            {activePost === post._id && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <CommentSection
                                        postId={post._id}
                                        existingComments={post.comments}
                                        onClose={() => setActivePost(null)}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                ))
            )}

        </div>
    )
}

export default Post