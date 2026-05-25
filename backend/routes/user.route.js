import express from 'express'
const userRoute = express.Router()

import * as auth from '../controllers/user.controller.js'
import { requireAdmin, requireSignIn } from '../middlewares/authMiddleware.js'
import upload from '../middlewares/uploadS3.js';
userRoute.post("/add", requireSignIn, auth.addToWishlist);
userRoute.post("/remove", requireSignIn, auth.removeWishlist);
userRoute.get("/get-wishlist", requireSignIn, auth.getWishlist);

userRoute.get("/all", auth.fetchAllUsers)

userRoute.post("/pre-signup", auth.preSignup)

userRoute.put("/profile", requireSignIn, auth.getProfile);
userRoute.put("/update-profile", requireSignIn, upload.single("avatar"), auth.updateProfile);
userRoute.post("/signup", auth.signup)
userRoute.post("/login", auth.login)
userRoute.post("/otp", auth.forgetPassword_otp)
userRoute.post("/decode-otp", auth.decodeOTP)
userRoute.put("/reset-password/:id", auth.resetPassword)
userRoute.post("/change-password", auth.changePassword)
userRoute.delete("/:id", requireSignIn, requireAdmin, auth.deleteUser)
userRoute.patch("/:id/role", requireSignIn, requireAdmin, auth.updateUserRole)
export default userRoute