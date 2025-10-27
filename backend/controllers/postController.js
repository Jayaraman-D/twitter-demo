// post controller.js

import Notification from '../models/notificationModel.js';
import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import cloudinary from 'cloudinary'

export const createPost = async (req, res) => {
    try {
        let { img, text } = req.body;
        const myId = req.user._id;

        let user = await User.findById(myId)

        if (!user) {
            return res.status(404).json({ error: " User not found" })
        }

        if (!img && !text) {
            return res.status(400).json({ error: "Image or text is required to create a post" })
        }

        if (img) {
            const uploadedResponse = await cloudinary.uploader.upload(img)
            img = uploadedResponse.secure_url;
        }

        const newPost = new Post({
            user: myId,
            img,
            text
        })

        await newPost.save()
        res.status(201).json({ message: "successfully posted" })

    } catch (error) {
        console.log(`Error occured in create post controller: ${error.message}`)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const deletePost = async (req, res) => {
    try {

        const { id } = req.params
        const myId = req.user._id;

        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }

        const user = await User.findById(myId)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        if (post.user._id.toString() !== req.user._id.toString()) {
            return res.status(400).json({ error: "you cannot delete the post" })
        }

        await Post.findByIdAndDelete(id)
        res.status(200).json({ message: "Successfully deleted the post" })

    } catch (error) {
        console.log(`Error occured in delete post controller: ${error.message}`)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const likeUnlike = async (req, res) => {
    try {

        const { id } = req.params
        const myId = req.user._id

        const post = await Post.findById(id)
        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }

        const user = await User.findById(myId)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        const alreadyLiked = user.likedPosts.includes(id)

        if (alreadyLiked) {
            //unlike
            await Post.findByIdAndUpdate(id, { $pull: { likes: myId } })
            await User.findByIdAndUpdate(myId, { $pull: { likedPosts: id } })

            res.status(200).json({ message: "UnLiked the post" })
        }
        else {
            //like

            await Post.findByIdAndUpdate(id, { $addToSet: { likes: myId } })
            await User.findByIdAndUpdate(myId, { $addToSet: { likedPosts: id } })

            const sendNotification = new Notification({
                from: myId,
                to: post.user,
                type: "like"
            })

            await sendNotification.save()
            res.status(200).json({ message: "Liked the post" })
        }

    } catch (error) {
        console.log(`Error occured in like&Unlike post controller: ${error.message}`)
        res.status(500).json({ error: "Internal server error" })
    }
}

// export const addComments = async (req, res) => {
//     try {

//         const { id } = req.params
//         const myId = req.user._id
//         const { text } = req.body

//         const post = await Post.findById(id)
//         if (!post) {
//             return res.status(404).json({ error: "Post Not found" })
//         }

//         const user = await User.findById(myId)
//         if (!user) {
//             return res.status(404).json({ error: "User not found" })
//         }

//         if (!text) {
//             return res.status(400).json({ error: "Please enter the comments" })
//         }

//         const addComment = {
//             text,
//             user: myId
//         }

//         post.comments.push(addComment)
//         await post.save()

//         res.status(200).json({ message: "Successfully posted the comments" })

//     } catch (error) {
//         console.log(`Error occured in add comments  controller: ${error.message}`)
//         res.status(500).json({ error: "Internal server error" })
//     }
// }

export const addComments = async (req, res) => {
    try {
        const { id } = req.params;
        const myId = req.user._id;
        const { text } = req.body;

        const post = await Post.findById(id);
        if (!post) return res.status(404).json({ error: "Post Not found" });

        const user = await User.findById(myId).select("username profileImg");
        if (!user) return res.status(404).json({ error: "User not found" });

        if (!text) return res.status(400).json({ error: "Please enter a comment" });

        const addComment = {
            text,
            user: myId
        };

        post.comments.push(addComment);
        await post.save();

        // Get the last added comment (the one we just pushed)
        const newComment = post.comments[post.comments.length - 1];

        // Attach user info so frontend doesn’t break
        const populatedComment = {
            ...newComment.toObject(),
            user: user
        };

        res.status(200).json({
            message: "Successfully posted the comment",
            comment: populatedComment
        });

    } catch (error) {
        console.log(`Error occurred in addComments controller: ${error.message}`);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const allPosts = async (req, res) => {
    try {

        const posts = await Post.find().sort({ createdAt: -1 })
            .populate({ path: "user", select: "-password" })
            .populate({ path: "comments.user", select: ["-password", "-followers", "-following", "-bio", "-link"] })
        if (posts.length === 0) {
            res.json([])
        }
        res.status(200).json(posts)
    } catch (error) {
        console.log(`Error occured in  allPosts  controller: ${error.message}`)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const followingPosts = async (req, res) => {
    try {
        const myId = req.user._id

        const user = await User.findById(myId)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        const following = user.following

        const posts = await Post.find({ user: { $in: following } })
            .sort({ createdAt: -1 })
            .populate({ path: "user", select: "-password" })
            .populate({ path: "comments.user", select: ["-password", "-followers", "-following", "-bio", "-link"] })
        if (posts.length === 0) {
            return res.status(200).json({ message: "No posts from followed users yet" });
        }
        else {
            res.status(200).json(posts)
        }


    } catch (error) {
        console.log(`Error occured in  followingPosts  controller: ${error.message}`)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getLikedPosts = async (req, res) => {
    try {
        const { id } = req.params; // user id

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const likedPostsIds = user.likedPosts; // array of post IDs

        const likedPosts = await Post.find({ _id: { $in: likedPostsIds } })
            .sort({ createdAt: -1 })
            .populate({
                path: 'user',
                select: '-password'
            })
            .populate({
                path: 'comments.user',
                select: '-password -followers -following -bio -link'
            });

        if (likedPosts.length === 0) {
            return res.status(200).json({ message: 'No liked posts yet' });
        }

        res.status(200).json(likedPosts);
    } catch (error) {
        console.error(`Error occurred in getLikedPosts controller: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
};


export const userPosts = async (req, res) => {
    try {

        const { id } = req.params
        const user = await User.findById(id)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        const posts = await Post.find({ user: id })
            .sort({ createdAt: -1 })
            .populate({
                path: 'user',
                select: '-password'
            })
            .populate({
                path: 'comments.user',
                select: '-password -followers -following -bio -link'
            });
        if (posts.length === 0) {
            res.status(200).json({ message: "No posts yet" })
        }

        res.status(200).json(posts)

    } catch (error) {
        console.error(`Error occurred in userPosts controller: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const deleteComment = async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const myId = req.user._id;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const comment = post.comments.id(commentId);
        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.user.toString() !== myId.toString()) {
            return res.status(403).json({ error: "You are not allowed to delete this comment" });
        }

         post.comments.pull(commentId);
        await post.save();

        res.status(200).json({ message: "Successfully deleted the comment" });

    } catch (error) {
        console.error(`Error occurred in delete comment controller: ${error.message}`);
        res.status(500).json({ error: 'Internal server error' });
    }
}