import express from 'express';
const app = express();  //created an express server

// now listening server on port 3000
app.listen(3000,()=>{
    console.log('server is runiing on port 3000')
})