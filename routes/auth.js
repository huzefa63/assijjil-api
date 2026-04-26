import express from 'express';
import { loginUser } from '../controller/auth.js';
import { verifyOtp } from '../controller/otp.js';

const route = new express.Router();

route.post('/signin',loginUser);
route.post('/verifyOtp',verifyOtp);

export default route;