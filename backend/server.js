import express from 'express'

import  cors from 'cors'
import 'dotenv/config'
import studentRouter from './src/routes/studentRoute.js';
import connectDB from './src/config/mongodb.js';
import connectCloudinary from './src/config/cloudinary.js';
import './cronUpdate.js';

// app config
const app=express();
const port=process.env.PORT || 4000;
connectDB();
connectCloudinary();


// middlewares
app.use(express.json());
app.use(cors());

// initializing routes
app.use("/api/student",studentRouter)
app.get('/',(req,res)=>{
    res.send('API working')
})

app.listen(port,()=>{
    console.log(`server startd on ${port}`)
})
