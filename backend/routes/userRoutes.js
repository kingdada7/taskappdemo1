import express from "express";
import {
  loginUser,
  registerUser,
  getCurrentUser,
  updateProfile,
  updatePassword,
} from "../controllers/userController";
import authMiddleware from "../middleware/auth.js";

const userRouter = express.Router();

// Route for user registration public links
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);

//protected routes private links
userRouter.get("/me", authMiddleware, getCurrentUser);
userRouter.put("/profile", authMiddleware, updateProfile);
userRouter.put("/password", authMiddleware, updatePassword);
