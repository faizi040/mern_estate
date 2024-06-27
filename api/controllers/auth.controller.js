import User from "../models/user.model.js";
import brcyptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js"
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = brcyptjs.hashSync(password, 10);
    //upper line doing hashing of password by taking original passowrd and 10 as salt for hasing 
    const newUser = new User({ username, email, password: hashedPassword })

    try {
        await newUser.save();
        res.status(201).json('User created Suceessfully!')
    } catch (error) {
        next(error);  //way of using middleware written for handling errors
    }

}


export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) return next(errorHandler(404, 'User nor found!'))
        //using custom error function to generate error and custom middleware to throw it
        const validPassword = brcyptjs.compareSync(password, validUser.password)
        if (!validPassword) return next(errorHandler(401, 'Wrong Credentials!'))
        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    const {password:pass,...rest} = validUser._doc;    
    //upper line separataing password and all other information as we dont want to send password back in response
        res.cookie('access_token', token, { httpOnly: true }).status(200).json(rest);
    } catch (error) {
        next(error);  //way of using middleware written for handling errors
    }

}
// const validUser = await User.findOne({ email });
// if (!validUser) return next(errorHandler(404, 'User not found!'));
// const validPassword = bcryptjs.compareSync(password, validUser.password);
// if (!validPassword) return next(errorHandler(401, 'Wrong credentials!'));
// const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
// const { password: pass, ...rest } = validUser._doc;
// res
//   .cookie('access_token', token, { httpOnly: true })
//   .status(200)
//   .json(rest);