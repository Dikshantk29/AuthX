import express from "express";

import { register, login, logout, verifyEmail, sendVerifyOtp, isAuthenticated, sendResetOtp, resetPassword } from "../controllers/user.controller.js";
import userAuth from "../middleware/user.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/send-verify-otp", userAuth, sendVerifyOtp);
router.post("/verify-email", userAuth, verifyEmail);
router.post("/is-auth", userAuth, isAuthenticated);
router.post("/send-reset-otp", sendResetOtp);
router.post("/reset-password", resetPassword);

export default router;
