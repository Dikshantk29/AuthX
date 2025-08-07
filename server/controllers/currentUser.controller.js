import User from "../models/user.model.js";


//get current user 
export const currentUser = async (req, res) => {
  try {
    // Assuming req.user is set by userAuth middleware
    const { userId } = req.body;

    // Find the user by ID
    const user = await User.findById(userId).select("-password -verifyOtp -verifyOtpExpireAt");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ succcess: true, userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    }});
  } catch (error) {
    console.error("Error fetching current user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};