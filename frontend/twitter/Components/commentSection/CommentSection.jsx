// components/commentSection/CommentSection.jsx
import React, { useState } from "react";
import axios from "axios";
import { BaseURL } from "../../BaseUrl/BaseURL";
import dp from '../../public/logos/x-logo.png';
import { useUser } from "../../src/context/UserContext";
import { toast } from "react-toastify";
import { formatDistanceToNow } from "date-fns";
import "./CommentSection.css";

const CommentSection = ({ postId, existingComments, onCommentAdded }) => {
    const { user } = useUser();
    const [comments, setComments] = useState(existingComments || []);
    const [newComment, setNewComment] = useState("");

    const handleComment = async (e, postId) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        try {
            const res = await axios.post(
                `${BaseURL}/api/posts/comment/${postId}`,
                { text: newComment },
                { withCredentials: true }
            );

            // Add the new comment to UI immediately
            setComments((prev) => [...prev, res.data.comment]);
            setNewComment("");
            if (onCommentAdded) onCommentAdded();
        } catch (error) {
            toast.error(error.response?.data?.error || "Failed to add comment");
        }
    };

    const handleDeleteComment = async (commentId) => {
        try {

            const res = await axios.delete(`${BaseURL}/api/posts/${postId}/comment/${commentId}`, { withCredentials: true });
            toast.success(res.data.message);
            setComments((prev) => prev.filter((c) => c._id !== commentId));

            if (onCommentAdded) onCommentAdded();

        } catch (error) {
            console.log(`Error occured in handle delete comment: ${error.message}`);
        }
    }

    return (
        <div className="commentSection">
            <div className="commentsList">
                {comments.length === 0 ? (
                    <p className="noComments">No comments yet.</p>
                ) : (
                    comments.map((c) => (
                        <div className="commentItem" key={c._id}>
                            <div className="commentUser">
                                <img
                                    src={typeof c.user === "object" ? c.user.profileImg || dp : dp}
                                    alt="user"
                                />
                                <span className="username">
                                    {typeof c.user === "object" ? c.user.username : "Anonymous"}
                                </span>

                                {c.user._id === user._id && <i className="bi bi-trash commentTrash" onClick={() => handleDeleteComment(c._id)} ></i>}

                            </div>
                            <p className="commentText">{c.text}</p>
                            {c.createdAt && (
                                <span className="commentTime">
                                    {formatDistanceToNow(new Date(c.createdAt), { addSuffix: true })}
                                </span>
                            )}
                        </div>
                    ))
                )}
            </div>

            <form onSubmit={(e) => handleComment(e, postId)} className="commentForm">
                <input
                    type="text"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                />
                <button type="submit">Post</button>
            </form>
        </div>
    );
};

export default CommentSection;
