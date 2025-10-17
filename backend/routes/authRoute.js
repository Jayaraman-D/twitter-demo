//  authRoute.js

import express from 'express'
const router = express.Router()
import { login, logout, signup, getMe } from '../controllers/authControllers.js'
import protectRoute from '../middlewares/protectRoute.js'

router.post('/signup', signup)
router.post('/login', login)
router.get('/logout', logout)
router.get('/me', protectRoute, getMe)
router.get('/verify' , protectRoute , (req ,res)=>{
    res.status(200).json({message: "User verified", user:req.user});
})
export default router