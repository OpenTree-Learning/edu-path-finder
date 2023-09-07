import mongoose from 'mongoose'


const connectDB = async () => {
    const uri: string = process.env.MONGODB_URI as string

    await mongoose.connect(uri)
}

export default connectDB