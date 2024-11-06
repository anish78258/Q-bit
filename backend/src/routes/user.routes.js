import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, refreshAccessToken, registerUser, updateAccountDetail, updateUserAvatar ,  } from "../controllers/user.controller.js";

import { upload } from "../middleware/multer.middleware.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
const router = Router();

// Route for user registration

router.route("/register").post(
    upload.fields([
        { name: "avatar", maxCount: 1 },
        { name: "coverImage", maxCount: 1 }
    ]),
    registerUser
);
router.route("/login").post(loginUser)

//secured Routes
router.route("/logout").post(verifyJwt , logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/get-user").post(verifyJwt , getCurrentUser)
router.route("/update").post(verifyJwt , updateAccountDetail)
router.route("/update-avatar").post( verifyJwt, upload.fields([{name : "avatar" , maxCount : 1}]) , updateUserAvatar)





export default router;
