//connect DB

import mongoose from "mongoose"

const connectDB = async ()=>{
    try {
        mongoose.connect(process.env.MONGO_URL)
        console.log('MongoDB Connected')
        
    } catch (error) {
        console.log(`Error occured in connectDB: ${error.message}`)
    }
}

export default connectDB