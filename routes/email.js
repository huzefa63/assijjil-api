import express from 'express';
import { sendLoginEmail } from '../controller/email.js';

const route = new express.Router();

route.post('/sendSigninEmail',sendLoginEmail);

export default route;