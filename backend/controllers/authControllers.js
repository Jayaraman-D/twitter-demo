// authControllers.js

import User from '../models/userModel.js'
import generateToken from '../utils/token.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const signup = async (req, res) => {
    try {

        const { email, password, username, fullname } = req.body

        const emailRegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegExp.test(email)) {
            return res.status(400).json({ error: "Invalid email" })
        }

        const existingEmail = await User.findOne({ email })
        const existingUser = await User.findOne({ username })

        if (existingEmail || existingUser) {
            return res.status(400).json({ error: " email and user are already exist" })
        }

        if (password.length < 6) {
            return res.status(400).json({ error: "Password must have 6 characters" })
        }

        const salt = await bcrypt.genSalt(10)
        const hassedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            email,
            password: hassedPassword,
            username,
            fullname,
        })

        if (newUser) {

            await newUser.save()
            generateToken(newUser._id, res)
            res.status(201).json({ message: "Successfully Signup" })
        }

    } catch (error) {
        console.log(`Error occured in signup controller: ${error.message}`)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username })

        if (!user) {
            return res.status(404).json({ error: "user not found" })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)
        if (!isPasswordMatch) {
            return res.status(400).json({ error: "Password not match" })
        }

        generateToken(user._id, res)
        res.status(200).json({ message: "Successfully Login" })

    } catch (error) {
        console.log(`Error occured in login controller: ${error.message}`)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const logout = async (req, res) => {
    try {

        res.cookie('jwt', '', { maxAge: 0 })
        res.status(200).json({ message: "Logout Successfull" })

    } catch (error) {
        console.log(`Error occured in logout controller: ${error.message}`)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const getMe = async (req, res) => {
    try {

        const userId = req.user._id;

        const user = await User.findById(userId)

        res.status(200).json(user)

    } catch (error) {
        console.log(`Error occured in getMe controller: ${error.message}`)
        res.status(500).json({ error: "Internal server error" })
    }
}