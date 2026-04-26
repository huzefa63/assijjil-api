import resend from "../libs/resend.js";
import catchAsync from "../utils/catchAsync.js";
import User from "../models/user.js";
import Otp from "../models/otp.js";
import AppError from "../utils/AppError.js";

export const generateOtp = () => {
  let otp = "";
  for (let i = 0; i <= 5; i++) {
    otp = otp + Math.floor(Math.random() * 10);
  }
  return otp;
};
export const sendLoginEmail = catchAsync(async (req, res, next) => {
  const email = req.body?.email;
  const OTP = generateOtp();
  if(!email) return next(new AppError('email is required',400))
  const doc = await Otp.findOneAndUpdate(
    { email },
    { otp: OTP,email,expiresAt:new Date(Date.now() + 5 * 60 * 1000) },
    { returnDocument:true},
  );
  if (!doc) await Otp.create({ email, otp: OTP });
  await resend.emails.send({
    from: "As-Sijjil <hello@my-bazarr.in>", // must be a verified sender
    to: email, // user’s email
    subject: "Your As-Sijjil OTP Code",
    text: `Hello!\n\nYour OTP code is: ${OTP}\n\nIt will expire in 5 minutes.\n\nIf you did not request this, please ignore this email.`,
    html: `
    <div style="font-family: Arial, sans-serif; color: #333; padding: 20px;">
      <h2 style="color:#2c3e50;">Verify Your Email</h2>
      <p>Hello,</p>
      <p>Your OTP code is:</p>
      <p style="font-size:22px; font-weight:bold; color:#3498db; letter-spacing: 3px;">
        ${OTP}
      </p>
      <p style="margin-top: 15px;">This code will expire in <b>5 minutes</b>.</p>
      <hr style="margin: 20px 0;" />
      <p style="font-size:14px; color:#888;">
        If you did not request this OTP, you can safely ignore this email.<br />
      </p>
    </div>
  `,
  });
  res.status(200).json({ ok: true });
});
