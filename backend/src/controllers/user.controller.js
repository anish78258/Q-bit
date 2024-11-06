import { User } from "../models/user.model.js";
import { uploadClodinary } from "../utils/cloudinary.js";
import jwt from "jsonwebtoken"

// Token generation function
const generateAccessTokenAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
        
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new Error("Error generating tokens");
    }
};

// Register user function
const registerUser = async (req, res) => {
    try {
        const { fullname, username, email, password } = req.body;

        // Validate required fields
        if ([fullname, username, email, password].some(field => !field?.trim())) {
            return res.status(400).json({
                message: "All fields (fullname, username, email, password) are required.",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({
                message: "User with the provided username or email already exists.",
            });
        }

        // Handle file upload for avatar
        const avatarPath = req.files?.avatar?.[0]?.path;
        if (!avatarPath) {
            return res.status(400).json({ message: "Avatar is required." });
        }

        const avatar = await uploadClodinary(avatarPath);
        if (!avatar) {
            return res.status(500).json({ message: "Failed to upload avatar." });
        }

        // Create new user
        const newUser = await User.create({
            fullname,
            username,
            email,
            password,
            avatar,
        });

        // Fetch and return user without sensitive info
        const createdUser = await User.findById(newUser._id).select("-password -refreshToken");
        return res.status(201).json({
            message: "User created successfully",
            user: createdUser,
        });
    } catch (error) {
        console.error("Error during user registration:", error);
        return res.status(500).json({ message: "Internal server error during registration." });
    }
};

// Login user function
const loginUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;

        // Check for empty credentials
        const isEmpty = [email, username, password].some(field => field === "");
        if (isEmpty) {
            console.log("Empty credentials detected");
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        // Find user by username or email
        const user = await User.findOne({ $or: [{ username }, { email }] })

        if (!user) {
            return res.status(404).json({
                message: "User does not exist",
            });
        }

        // Check password
        const isPasswordCorrect = await user.isPasswordCorrect(password);
        console.log("Password correct:", isPasswordCorrect); // Log to check if password matches

        if (!isPasswordCorrect) {
            return res.status(400).json({
                message: "Password is incorrect",
            });
        }

        // Generate tokens
        const { accessToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id);
        console.log("Generated tokens:", { accessToken, refreshToken }); // Log generated tokens

        const options = {
            httpOnly: true,
            secure: true,
        };

        // Set cookies and respond
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .cookie("refreshToken", refreshToken)
            .json({
                message: "Logged in",
                accessToken,
                refreshToken,
            });
    } catch (error) {
        console.error("Error during login:", error);
        return res.status(500).json({
            message: "Internal server error during login.",
        });
    }
};


const logoutUser = async (req, res) => {
    try {
        await User.findByIdAndUpdate(
            req.user._id,
            { $set: { refreshToken: undefined } },
            { new: true }
        );

        const options = {
            httpOnly: true,
            secure: true,
        };

        return res
            .status(200)
            .clearCookie("accessToken", options)
            .clearCookie("refreshToken", options)
            .json({
                message: "Successfully logged out",
            });
    } catch (error) {
        console.error("Error during logout:", error);
        return res.status(500).json({
            message: "Internal server error during logout.",
        });
    }
};

//refresh token
const refreshAccessToken = async (req, res) => {
    try {
        // Check for token in cookies or body
        const token = req.cookies?.refreshToken || req.body?.refreshToken;
        if (!token) {
            return res.status(401).json({
                message: "Unauthorized request: No refresh token provided",
            });
        }

        // Verify refresh token and handle decoding errors
        let decodedToken;
        try {
            decodedToken = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        } catch (error) {
            return res.status(401).json({ message: "Invalid refresh token" });
        }

        // Fetch user and validate stored token
        const user = await User.findById(decodedToken?._id);
        if (!user || token !== user.refreshToken) {
            return res.status(401).json({ message: "Expired or invalid token" });
        }

        // Generate new access and refresh tokens
        const { accessToken, refreshToken: newRefreshToken } = await generateAccessTokenAndRefreshToken(user._id);

        const options = { httpOnly: true, secure: true };

        // Respond with new tokens
        return res
            .status(200)
            .cookie("refreshToken", newRefreshToken, options)
            .cookie("accessToken", accessToken, options)
            .json({
                message: "Token refreshed successfully",
            });
    } catch (error) {
        console.error("Error during token refresh:", error);
        return res.status(500).json({
            message: "Internal server error during token refresh.",
        });
    }
};
// Get current user
const getCurrentUser = async (req, res) => {
    return res.status(200).json({
        user: req.user,
        message: "User fetched successfully",
    });
};

// Update account details
const updateAccountDetail = async (req, res) => {
    try {
        const { fullname, email } = req.body;

        if (!fullname || !email) {
            return res.status(400).json({
                message: "All fields are required",
            });
        }

        // Await the update operation
        
        const user = await User.findByIdAndUpdate(
            req.user?._id,
            {
                $set: { fullname, email },
            },
            { new: true }
        ).select("-password");

        return res.status(200).json({
            message: "Account updated successfully",
            user,
        });
    } catch (error) {
        console.error("Error updating account:", error);
        return res.status(500).json({
            message: "Internal server error during account update",
        });
    }
};

// Update user avatar
const updateUserAvatar = async (req, res) => {
    try {
        // Access the file path from req.files['avatar']
        const avatarLocation = req.files?.avatar?.[0]?.path;

        if (!avatarLocation) {
            return res.status(400).json({
                message: "File is missing",
            });
        }

        // Upload avatar to cloudinary and check if successful
        const avatar = await uploadClodinary(avatarLocation);
        if (!avatar) {
            return res.status(500).json({
                message: "Problem while uploading avatar",
            });
        }

        // Update user avatar in database
        const user = await User.findByIdAndUpdate(
            req.user?._id,
            { $set: { avatar: avatar.url } },
            { new: true }
        ).select("-password");

        return res.status(200).json({
            message: "Avatar updated successfully",
            user,
        });
    } catch (error) {
        console.error("Error updating avatar:", error);
        return res.status(500).json({
            message: "Internal server error during avatar update",
        });
    }
};


export { registerUser, loginUser, logoutUser, refreshAccessToken, getCurrentUser, updateAccountDetail, updateUserAvatar };
