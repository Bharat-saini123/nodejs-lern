import UserData from "../models/User.js";
import bcrypt from "bcrypt";
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  const hashPassword = await bcrypt.hash(password, 10);
  try {
    const user = new UserData({ name, email, password: hashPassword });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default createUser;
