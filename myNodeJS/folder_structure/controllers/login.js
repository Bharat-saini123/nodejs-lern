import dotenv from "dotenv";
dotenv.config({ quiet: true });
import UserData from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }
    const user = await UserData.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", id: user._id, token });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default login;
