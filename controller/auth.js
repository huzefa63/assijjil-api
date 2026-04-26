import resend from "../libs/resend.js";
import catchAsync from "../utils/catchAsync.js";
import User from '../models/user.js';
import Otp from '../models/otp.js';
import AppError from '../utils/AppError.js'
import jwt from 'jsonwebtoken';
import util from 'util';

export const loginUser = catchAsync(async (req,res,next) => {
  const email = req.body?.email;
  console.log(email);
  const isEmail = await User.findOne({email});
  if(!isEmail) await User.create({email});
    res.status(200).json({ok:true});
})

export const protectRoute = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  // console.log(req.headers.authorization.split(" ")[1]);
  if (!token) {
    return res.status(401).json({
      message: "jwt not provided",
    });
  }

  let payload;

  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "invalid or expired jwt",
    });
  }
  req.user = payload.id

  return next();
};

