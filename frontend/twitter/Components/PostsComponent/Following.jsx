import React, { useEffect, useState } from 'react'
import './Following.css'
import postimg from '/logos/x-logo.png'
import axios from 'axios'
import { BaseURL } from '../../BaseUrl/BaseURL'
import { toast } from 'react-toastify'
import { formatDistanceToNow } from 'date-fns'
import { motion, AnimatePresence } from 'framer-motion'
import CommentSection from '../commentSection/CommentSection'

const Following = () => {
    const [followingPost, setFollowingPost] = useState([]);
    const [message, setMessage] = useState('');
    const [activePost, setActivePost] = useState(null);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`${BaseURL}/api/posts/following`, { withCredentials: true });
                if (Array.isArray(res.data)) {
                    setFollowingPost(res.data);
                    setMessage('');

                }
                else {
                    setFollowingPost([]);
                    setMessage(res.data.message);
                }
            } catch (error) {
                console.log(`Error occured in get following posts: ${error.message}`);
                toast.error(error.response?.data?.error || "Something went wrong");
            }
        }
        fetchUser();
    }, [refresh])

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


    return (
        <div className='post'>
            {followingPost.length === 0 ? (<p>{message}</p>) : (
                followingPost.map((post) => (
                    <div className="posted" key={post._id}>
                        <div className="user-info">
                            <img src={post.user.profileImg || postimg} alt='dp' />
                            <h3 className="username">{post.user.username}</h3>
                            <h6 className='time'>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}</h6>
                        </div>
                        {post.text && <h3 className='username'>{post.text}</h3>}
                        {post.img && (
                            <div className="post-image">
                                <img src={post.img} alt="following post" />
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
                                        onCommentAdded={() => setRefresh(prev => !prev)}
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

export default Following