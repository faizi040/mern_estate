import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// import User from './models/user.model.js';
import UserRouter from "./routes/user.route.js"
dotenv.config();
const app = express();  //created an express server


//usig mongodb atlas for connecting 
mongoose.connect(process.env.MONGO).then(()=>{
    console.log('connected to mongoDB')
}).catch((err)=>{
    console.log(err)
})



app.use('/api/user' , UserRouter)
// //testing database
// app.post('/test', async (req, res) => {
//     let success = false;
//     // res.status(200).send(req.body);
//     try {
//         // create a new user
//         let user = await User.create({
//             email:"hello@gmail.com" ,
//             username: "Faizi testing",
//             password: "12345"
//         })
//         if (user) {
//             success = true;
//             res.json({ success });
//         }

//     } catch (error) {
//         console.error(error.message);
//         res.status(500).send(success, "some error occure");
//     }
//     // .then(user => res.json(user)).catch(err=>{console.log(err),res.json(err.msg)});

// })


// now listening server on port 3000
app.listen(3000,()=>{
    console.log('server is runiing on port 3000')
})




