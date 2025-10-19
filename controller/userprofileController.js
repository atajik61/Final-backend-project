import { getUserById } from "../models/userprofileModel.js";

export const getUserProfile = async (req, res) => {
  const userId = req.params.id; //

  try {
    const user = await getUserById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.render("user/profile", { user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
export const getOfficerProfile = async (req, res) => {
  const userId = req.params.id; //

  try {
    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.render("officer/officerProfile", {
      username: user.username,
      id: user.id,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
