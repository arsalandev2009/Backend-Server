import mongoose from 'mongoose'

export const  ConnectDB=()=>{
    try {
        mongoose.connect(process.env.MONGODB_URL)
        console.log('MongoDB Connected')
    } catch (error) {
        console.log('Error Connecting MongoDB',error)
    }
}