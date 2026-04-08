import UserData from "../models/User.js";

const getUser = async (req, res) => {
  try {
    const user = await UserData.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
export default getUser;
