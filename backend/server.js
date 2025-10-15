// server.js

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import cloudinary from 'cloudinary'

dotenv.config()
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret_key: process.env.CLOUD_SECRET_KEY
})

import connectDB from './db/connectDB.js'
import authRoute from './routes/authRoute.js'
import userRoute from './routes/userRoute.js'
import postRoute from './routes/postRoute.js'
import notificationRoute from './routes/notificationRoute.js'

const PORT = process.env.PORT || 3000
const app = express()

const allowedOrigins = [
    "https://todo-frontend-dbrh.onrender.com",
    "http://localhost:5173",
    "https://www.mongodb.com/docs/atlas/security-whitelist/"
];

app.use(
    cors({
        origin: function (origin, callback) {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error("Not allowed by CORS"));
            }
        },
        credentials: true, // 👈 allows cookies or auth headers
    })
);


app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.send("This is a Server was build by express.js")
})

app.use('/api/auth', authRoute)
app.use('/api/user', userRoute)
app.use('/api/posts', postRoute)
app.use('/api/notifications', notificationRoute)

app.listen(PORT, () => {
    console.log(`Server is running on this port: ${PORT}`)
    connectDB()
})