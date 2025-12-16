import userModel from "../model/userModel";
import bcrypt from "bcryptjs";
import validator from "validator";
import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "your jwt secret key ";
const createToken = (userId) =>
  jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: TOKEN_EXPIRES });
//register user
export async function registerUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  if (!validator.isEmail(email)) {
    return res
      .status(400)
      .json({ success: false, message: "Invalid email format" });
  }
  if (password.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be at least 8 characters long",
    });
  }

  try {
    if (await userModel.findOne({ email })) {
      return res
        .status(409)
        .json({ success: false, message: "Email already in use" });
    }
    const hashed = await bcrypt.hash(password, 10);
    const user = await user.create({ name, email, password: hashed });
    const token = createToken(user._id);
    res.staus(201).json({
      success: true,
      token,
      user: { name: user.name, email: user.email, id: user._id },
    });
  } catch (error) {
    console.log("Error registering user:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
}

//login user
export async function loginUser(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "All fields are required" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
    const token = createToken(user._id);
    res.json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ sucess: false, message: "Internal server error" });
  }
}
