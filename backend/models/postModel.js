// PostModel.js

import mongoose, { Types } from "mongoose";

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    img: String,
    text: String,
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }],
    comments: [{
        text: {
            type: String
        },

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users",
            required: true
        }

    }]
}, { timestamps: true })

export default mongoose.model("posts", postSchema)