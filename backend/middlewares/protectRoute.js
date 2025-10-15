// protectRoute.js

import jwt from 'jsonwebtoken'
import User from '../models/userModel.js';

const protectRoute = async (req, res, next) => {
    try {

        const token = req.cookies.jwt;
        if (!token) {
            return res.status(404).json({ error: "Token not Found" })
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        if (!decoded) {
            return res.status(400).json({ error: "Unauthorized Token" })
        }
        const user = await User.findOne({ _id: decoded.userId })

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        req.user = user
        next()

    } catch (error) {
        console.log(`Error occured in protectRoute controller: ${error.message}`)
        res.status(500).json({ error: "Internal server error" })
    }
}

export default protectRoute