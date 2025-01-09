import Users from "../models/users.model.js";
import { ApiError } from "../utils/index.js";

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await Users.findById(userId)

        if (!user) throw new ApiError('User not found.', 404)

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save();

        return { accessToken, refreshToken };

    } catch (error) {
        console.error(`Error generating the access and refresh tokens: ${error.message}`);
        throw new ApiError('Something went wrong while generating the access and refresh tokens.', 500);
    }
}

export default generateAccessAndRefreshToken