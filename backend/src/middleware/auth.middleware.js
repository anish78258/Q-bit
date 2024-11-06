import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJwt = async (req, res, next) => {
    try {
        // Extract token from cookies or Authorization header
        const token = req.cookies?.accessToken || req.headers?.authorization?.replace("Bearer ", "");

        console.log(token);

        if (!token) {
            return res.status(401).json({
                message: "Unauthorized: No token provided",
            });
        }

        // Verify the token and decode
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // Fetch user data without sensitive fields
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            return res.status(401).json({
                message: "Invalid token: User not found",
            });
        }

        // Attach user to request and continue
        req.user = user;
        next();
    } catch (error) {
        console.error("JWT Verification Error:", error);
        return res.status(401).json({
            message: "Unauthorized: Token verification failed",
        });
    }
};
