import UserData from "../models/User.js";

const getAllUsers = async (req, res) => {
  try {
    const users = await UserData.find();
    res.json(users);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default getAllUsers;