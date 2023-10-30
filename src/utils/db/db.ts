import fs from 'fs'
import mongoose from 'mongoose'


const connectDB = async () => {
    const uri: string = process.env.MONGODB_URI as string
    const client = await mongoose.connect(uri)

    return client
}

export default connectDB