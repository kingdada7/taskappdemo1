import jwt from "jsonwebtoken";
import User from "../model/userModel";

const JWT_SECRET = process.env.JWT_SECRET || "your jwt secret key ";

// Authentication middleware
export default async function authMiddleware(req, res, next) {
  // grab the bearer token from the authorization header
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ sucess: false, message: "not authorized token missing" });
  }
  const token = authHeader.split(" ")[1];
  //verfiy and attach user object
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(payload.id).select("-password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("JWT verfication failed", error);
    return res
      .status(401)
      .json({ success: false, message: "token invalid or expired" });
  }
}
