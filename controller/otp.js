import catchAsync from "../utils/catchAsync.js";
import Otp from '../models/otp.js';
import User from '../models/user.js';
import jwt from "jsonwebtoken";
export const verifyOtp = catchAsync(async (req, res, next) => {
    const {otp,email} = req.body;
    console.log(otp,email)
    const userOtp = await Otp.findOne({email,otp});
    if(!userOtp) {
        console.log(userOtp);
        return next(new Error("invalid req"));
    }
    if(userOtp.expiresAt < new Date()) {
        console.log(userOtp?.expiresAt)
        return res.status(400).json({ ok: false, expired: true });
    }
    const user = await User.findOne({email});
    if(!user) await User.create({email});
    const token = await jwt.sign({email,id:user._id},process.env.JWT_SECRET,{expiresIn:'10d'});
    res.cookie('jwt',token,{sameSite:'none',httpOnly:false}).status(200).json({jwt:token});
});
