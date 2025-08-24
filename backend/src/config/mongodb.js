import mongoose from "mongoose";

const connectDB=async()=>{

    mongoose.connection.on('connected',()=>{
        console.log("connection estiblished");
    })
    await mongoose.connect(`${process.env.MONGODB_URI}/TrackMyGrade`);
}

export default connectDB