import Users from '../models/users.model.js';
import { AsyncHandler, ApiError, ApiResponse } from '../utils/index.js';
import { sendOTPVerification, generateAccessAndRefreshToken } from '../helpers/index.js';
import jwt from 'jsonwebtoken'


export const handleRegistration = AsyncHandler(async (req, res, next) => {
    if (req.method !== "POST") {
        throw new ApiError('Method not allowed.', 405);
    }

    const { userName, email, password, role } = req.body;

    if (!userName || !email || !password) {
        throw new ApiError('Please provide all required fields.', 400);
    }

    const userExists = await Users.findOne({ $or: [{ email }, { userName }] });
    if (userExists) {
        throw new ApiError('User already exists.', 409);
    }

    const user = new Users({ userName, email, password, role });
    await user.save();

    const createdUser = await Users.findById(user._id).select('-password -otp -refreshToken');
    if (!createdUser) {
        throw new ApiError('Something went wrong while retrieving the user.', 500);
    }

    return res.status(201).json(
        new ApiResponse(true, 'User registered successfully.', null, 201)
    );
});

export const handleLogin = AsyncHandler(async (req, res, next) => {
    if (req.method !== "POST") throw new ApiError('Method not allowed.', 405);

    const { email, password } = req.body;

    if (!email || !password) throw new ApiError('Please provide all required fields.', 400);


    const user = await Users.findOne({ email }).select('-otp -refreshToken');

    if (!user) throw new ApiError('User not found.', 404);

    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) throw new ApiError('Invalid credentials.', 401);

    const otpVerification = await sendOTPVerification(user._id.toString())

    return res.status(200).json(new ApiResponse(true, 'OTP sent successfully.', null, 200));
});

export const handleOTPVerification = AsyncHandler(async (req, res, next) => {
    if (req.method !== "POST") throw new ApiError('Method not allowed.', 405);

    const { email, otp } = req.body;

    if (!email || !otp) throw new ApiError('Please provide all required fields.', 400);

    const user = await Users.findOne({ email });

    if (!user) throw new ApiError('User not found.', 404);

    const isOTPMatched = await user.matchOTP(otp)

    if (!isOTPMatched) throw new ApiError('Invalid OTP.', 401);

    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id.toString());

    res.cookie('accessToken', accessToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 1000 * 60 * 60 * 24 });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: true, sameSite: 'strict', maxAge: 1000 * 60 * 60 * 24 * 7 });

    user.otp = null;
    await user.save();

    return res.status(200).json(new ApiResponse(true, 'OTP verified successfully.', { user }, 200));
});

export const handleForgotPassword = AsyncHandler(async (req, res, next) => {
    if (req.method !== "POST") throw new ApiError('Method not allowed.', 405);

    const { email } = req.body;

    if (!email) throw new ApiError('Please provide email.', 400);

    const user = await Users.findOne({ email });

    if (!user) throw new ApiError('User not found.', 404);

    const otpResponse = await sendOTPVerification(user._id.toString(), 'forgot-password');

    return res.status(200).json(new ApiResponse(true, 'OTP sent successfully.', null, 200));
})

export const handleResetPassword = AsyncHandler(async (req, res, next) => {
    if (req.method !== "PATCH") throw new ApiError('Method not allowed.', 405);

    const { email, password, otp } = req.body;

    if (!email || !password || !otp) throw new ApiError('Please provide all required fields.', 400);

    const user = await Users.findOne({ email });

    if (!user) throw new ApiError('User not found.', 404);

    const isOldPassword = await user.matchPassword(password);

    if (isOldPassword) throw new ApiError('Please provide a new password.', 400);

    const isOTPMatched = await user.matchOTP(otp);

    if (!isOTPMatched) throw new ApiError('Invalid OTP.', 401);

    user.password = password;
    user.otp = null;

    await user.save();

    return res.status(200).json(new ApiResponse(true, 'Password reset successfully.', null, 200));
})

export const handleLogout = AsyncHandler(async (req, res, next) => {
    if (req.method !== "POST") throw new ApiError('Method not allowed.', 405);

    const userId = req.user._id;

    if (!userId) throw new ApiError('You are not authorized to perform this task.', 403);

    const user = await Users.findById(userId);

    if (!user) throw new ApiError('User not found.', 404);

    user.refreshToken = null;
    await user.save();

    res.cookie('accessToken', '', { httpOnly: true, secure: true, sameSite: 'strict', expires: new Date(0) });
    res.cookie('refreshToken', '', { httpOnly: true, secure: true, sameSite: 'strict', expires: new Date(0) });

    return res.status(200).json(new ApiResponse(true, 'Logged out successfully.', null, 200));
})

export const handleAuthCheck = AsyncHandler((req, res) => {
    const user = req?.user
    return res.status(200).json(new ApiResponse(true, 'Authenticated user!', { user }, 200));
});


export const handleGenerateNewAccessToken = AsyncHandler(async (req, res) => {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) throw new ApiError('Please log in again.', 403);

    const decodedToken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);

    const user = await Users.findById(decodedToken._id).select('-password -otp');

    if (!user || user?.refreshToken !== refreshToken) {
        throw new ApiError('Invalid refresh token. Please log in again.', 403);
    }

    const { accessToken, refreshToken: newRefreshToken } = await generateAccessAndRefreshToken(user._id.toString());

    user.refreshToken = newRefreshToken;
    await user.save();

    res.cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24,
    });
    res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json(new ApiResponse(true, 'Tokens refreshed successfully.', { user }, 200));
});
