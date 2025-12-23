import jwt from "jsonwebtoken";
import User from "../model/userModel";

const JWT_SECRET = process.env.JWT_SECRET || "your jwt secret key ";

// Authentication middleware
export default async function authMiddleware(req,res,next){
    
}