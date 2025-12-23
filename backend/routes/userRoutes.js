import express from 'express';
import { loginUser, registerUser } from '../controllers/userController';

const userRouter = express.Router();

// Route for user registration public links
userRouter.post ('/register',registerUser);
userRouter.post('/login',loginUser);

//protected routes private links
userRouter.get('/me', getCurrentUser);
userRouter.put('/profile',updateProfile);
userRouter.put('/password',updatePassword);
