import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js"
dotenv.config();
const app = express();  //created an express server
app.use(express.json())   //for to use jsn as input in req body


//usig mongodb atlas for connecting 
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to mongoDB')
}).catch((err)=>{
    console.log(err)
})



app.use('/api/user' , userRouter)
app.use('/api/auth' , authRouter)

//middleware to handle errors

app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})

// now listening server on port 3000
app.listen(3000,()=>{
    console.log('server is runiing on port 3000')
})




