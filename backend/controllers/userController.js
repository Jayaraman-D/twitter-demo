// userController.js

import User from "../models/userModel.js"
import bcrypt from 'bcrypt'
import cloudinary from 'cloudinary'
import Notifications from '../models/notificationModel.js'

export const getProfile = async (req, res) => {
    try {

        const { username } = req.params
        const user = await User.findOne({ username }).select('-password')

        if (!user) {
            return res.status(404).json({ error: " User not found" })
        }

        res.status(200).json(user)

    } catch (error) {
        console.log(`Error occured in getProfile controller: ${error.message}`)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const followUnfollow = async (req, res) => {
    try {
        const { id } = req.params
        const myId = req.user._id;
        const userToModify = await User.findById(id)
        if (!userToModify) {
            return res.status(404).json({ error: "user not found" })
        }
        const currentUser = await User.findById(myId)
        if (!currentUser) {
            return res.status(404).json({ error: "user not found" })
        }
        if (id.toString() === myId.toString()) {
            return res.status(400).json({ error: "Cannot follow or unfollow yourself" })
        }

        const isFollowing = currentUser.following.includes(id)
        if (isFollowing) {
            //unfollow
            await User.findByIdAndUpdate(myId, { $pull: { following: id } })
            await User.findByIdAndUpdate(id, { $pull: { followers: myId } })

            res.status(200).json({ message: "Successfully Unfollow the user" })
        }
        else {
            //follow
            await User.findByIdAndUpdate(id, { $push: { followers: myId } })
            await User.findByIdAndUpdate(myId, { $push: { following: id } })

            const newNotification = new Notifications({
                from:myId,
                to:id,
                type:"follow"
            })

            await newNotification.save()

            res.status(200).json({ message: "succesfully follow the user" })
        }



    } catch (error) {
        console.log(`Error occured in followUnfollow controller: ${error.message}`)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const suggestedUsers = async (req, res) => {
    try {
        const myId = req.user._id
        const user = await User.findById(myId).select('-password')
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        const allUsers = await User.aggregate([
            { $match: { _id: { $ne: myId } } },
            { $sample: { size: 10 } },
            { $project: { password: 0 } }
        ])

        const suggestions = allUsers
            .filter((u) => !user.following.includes(u._id.toString()))
            .slice(0, 4)
        res.status(200).json(suggestions)

    } catch (error) {
        console.log(`Error occured in suggestedUsers controller: ${error.message}`)
        res.status(500).json({ error: "Internal server error" })
    }
}

export const updateUser = async (req, res) => {
    try {
        let { username, email, currentPassword, newPassword, fullname, bio, link, } = req.body;
        let { profileImg, coverImg } = req.body
        const myId = req.user._id;

        let user = await User.findById(myId)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }


        if ((currentPassword && !newPassword) || (!currentPassword && newPassword)) {
            return res.status(400).json({ error: "Need to fill the both password fields" })
        }

        if (currentPassword && newPassword) {
            if (newPassword.length < 6) {
                return res.status(400).json({ error: "password must have 6 characters" })
            }

            const ismatch = await bcrypt.compare(currentPassword, user.password)
            if (!ismatch) {
                return res.status(400).json({ error: "Password does not match" })
            }

            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(newPassword, salt)

        }

        if (profileImg) {
            if (user.profileImg) {
                await cloudinary.uploader.destroy(user.profileImg.split('/').pop().split('.')[0])
            }
            else {

                const uploadedResponse = await cloudinary.uploader.upload(profileImg)
                profileImg = uploadedResponse.secure_url;

            }
        }

        if (coverImg) {
            if (user.coverImg) {
                await cloudinary.uploader.destroy(user.coverImg.split('/').pop().split('.')[0])
            }
            else {
                await cloudinary.uploader.upload(coverImg)
            }
        }

        user.fullname = fullname || user.fullname
        user.email = email || user.email
        user.username = username || user.username
        user.bio = bio || user.bio
        user.link = link || user.link
        user.profileImg = profileImg || user.profileImg
        user.coverImg = coverImg || user.coverImg

        user = await user.save()
        user.password = null
        res.status(200).json(user)

    } catch (error) {
        console.log(`Error occured in updateUser controller: ${error.message}`)
        res.status(500).json({ error: "Internal server error" })
    }
}