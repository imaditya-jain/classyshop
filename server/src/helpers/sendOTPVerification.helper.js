import Users from "../models/users.model.js";
import { ApiError } from "../utils/index.js";
import transporter from "../config/nodemailer.config.js";

const sendOTPVerification = async (userId, action) => {
    try {
        const otp = Math.floor(100000 + Math.random() * 900000);

        const user = await Users.findById(userId);

        if (!user) throw new ApiError('User not found.', 404);

        user.otp = otp;
        await user.save();

        let subject = action === 'forgot-password' ? 'Password Reset' : 'OTP Verification';

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: user.email,
            subject: subject,
            html: `<p>Your OTP is ${otp}.</p>`
        };

        await transporter.sendMail(mailOptions);

        return { message: 'OTP sent successfully.', status: 200 };

    } catch (error) {
        console.error(`Error sending the OTP: ${error.message}`);
        throw new ApiError('Something went wrong while sending the OTP.', 500);
    }
}

export default sendOTPVerification