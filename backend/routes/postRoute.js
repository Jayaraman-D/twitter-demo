// post Route.js

import express from 'express'
import protectRoute from '../middlewares/protectRoute.js'
import { createPost, deletePost, likeUnlike , addComments , allPosts, followingPosts, getLikedPosts, userPosts, deleteComment} from '../controllers/postController.js'

const router = express.Router()

router.post('/create', protectRoute, createPost)
router.post('/like/:id', protectRoute , likeUnlike)
router.post('/comment/:id', protectRoute , addComments)
router.delete('/delete/:id', protectRoute, deletePost)
router.get('/all', protectRoute , allPosts)
router.get('/following', protectRoute , followingPosts)
router.get('/likes/:id', protectRoute, getLikedPosts)
router.get('/user/:id', protectRoute, userPosts)
router.delete('/:postId/comment/:commentId', protectRoute , deleteComment)


export default router 