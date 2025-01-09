import jwt from 'jsonwebtoken';
import Users from '../models/users.model.js';
import { ApiError } from '../utils/index.js';

const authMiddleware = async (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken || req.headers.authorization?.split(' ')[1];

        if (!accessToken) throw new ApiError('Access token not found.', 401);

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        if (!decodedToken) throw new ApiError('Invalid access token.', 401);

        const user = await Users.findById(decodedToken._id).select('-password -otp -refreshToken');
        if (!user) throw new ApiError('Auth user not found.', 404);

        req.user = user;
        next();
    } catch (error) {
        console.error(`Error authorizing user: ${error.message}`);
        throw new ApiError(error.message, error.status || 500)
    }
};

export default authMiddleware;