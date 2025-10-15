//token.js

import jwt from 'jsonwebtoken'

const generateToken = (userId, res) => {
    try {

        const token = jwt.sign({ userId }, process.env.SECRET_KEY, { expiresIn: '15d' })

        res.cookie('jwt', token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV != 'development'
        })

    } catch (error) {
        console.log(`Error occured in token: ${error.message}`)
    }
}

export default generateToken