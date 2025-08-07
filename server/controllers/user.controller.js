import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import transport from "../config/nodemailer.js";
import dotenv from "dotenv";
dotenv.config();

//register controller
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = new User({
      name,
      email,
      password: hashedPassword,
    });
    await user.save();

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    //sending welcome email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Welcome to Our App",
      text: `Hello ${user.name},\n\nWelcome to our app! We're glad to have you on board.\n\nBest regards,\nThe Team`,
      html: `<p>Hello ${user.name},</p><p>Welcome to our app! We're glad to have you on board.</p><p>Best regards,<br>The Team</p>`,
    };

    // Send the email
    try {
      await transport.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
    }

    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//login controller
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Check the password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    // Set the token in a cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    return res.status(200).json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error("Error logging in user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//logout controller
export const logout = async (req, res) => {
  try {
    // Perform any necessary cleanup or logging
    // Clear the cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//send verification OTP to user email
export const sendVerifyOtp = async (req, res) => {
  try {
    const { userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isAccountVerified) {
      return res.status(400).json({ message: "Account already verified" });
    }

    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000)); // 6-digit OTP
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    await user.save();

    // Send OTP email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Email Verification OTP",
      text: `Your OTP is ${otp}. It is valid for 10 minutes.`,
    };

    // Send the email
    try {
      await transport.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//verify user email using OTP
export const verifyEmail = async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp) {
    return res.status(400).json({ message: "User ID and OTP are required" });
  }

  try {
    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    if (user.isAccountVerified) {
      return res.status(400).json({ message: "Account already verified" });
    }

    // Check if OTP is valid
    if (user.verifyOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP is expired
    if (Date.now() > user.verifyOtpExpireAt) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Mark the user as verified
    user.isAccountVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    return res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error("Error verifying email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//check if user is authenticated
export const isAuthenticated = (req, res) => {
  try {
    return res
      .status(200)
      .json({ success: true, message: "User is authenticated" });
  } catch (error) {
    console.error("Error checking authentication:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//send reset password OTP
export const sendResetOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000)); // 6-digit OTP
    user.resetOtp = otp;
    user.resetOtpExpireAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiry
    await user.save();

    // Send OTP email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: user.email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is ${otp}. It is valid for 10 minutes.`,
    };

    // Send the email
    try {
      await transport.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Error sending email:", emailError);
    }

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error sending reset OTP:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//reset user password
export const resetPassword = async (req, res) => {
  const { email, newPassword, otp } = req.body;
  if (!email || !newPassword || !otp) {
    return res
      .status(400)
      .json({ message: "Email, new password, and OTP are required" });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if OTP is valid
    if (user.resetOtp !== otp || user.resetOtp === "") {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // Check if OTP is expired
    if (Date.now() > user.resetOtpExpireAt) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // Update the user's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    user.resetOtp = "";
    user.resetOtpExpireAt = 0;
    await user.save();

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



