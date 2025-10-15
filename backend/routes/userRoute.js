// user Route.js

import express from 'express'
import protectRoute from '../middlewares/protectRoute.js'
import { getProfile , followUnfollow, suggestedUsers, updateUser} from '../controllers/userController.js'

const router = express.Router()

router.get('/profile/:username', protectRoute, getProfile)
router.get('/suggestions', protectRoute, suggestedUsers)
router.post('/follow/:id', protectRoute , followUnfollow)
router.post('/updateuser',protectRoute, updateUser)


export default router