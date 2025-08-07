import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    
    if (tokenDecode.id) {
    //   // Option 1: Use req.user (recommended)
    //   req.user = { userId: tokenDecode.id };
      
      // Option 2: If you must use req.body, ensure it exists
      req.body = req.body || {};
      req.body.userId = tokenDecode.id;
      
      return next();
    } else {
      return res.status(401).json({ success: false, message: "Invalid token payload" });
    }
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default userAuth;
