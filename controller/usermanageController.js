import pool from "../db/index.js";
import {
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../models/usermanageModel.js";
//get
export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    console.log("✅ getUsers is running");

    res.render("admin/userManage", { users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};
export const addUser = async (req, res) => {
  console.log("Request body:", req.body);
  try {
    const {
      userId,
      userName,
      userRole,
      firstName,
      lastName,
      userPhone,
      userEmail,
      date_birth,
    } = req.body;

    const newService = await createUser({
      userId,
      userName,
      userRole,
      firstName,
      lastName,
      userPhone,
      userEmail,
      date_birth,
    });
    res.redirect("/admin/userManage"); // هدایت به صفحه requests
    //res.status(201).json(newRequest);
  } catch (error) {
    console.error("Error adding user:", error); //
    res.status(500).json({ error: "Failed to create user" });
  }
};
//edituser.ejs
export const getEdituserPage = async (req, res) => {
  const { userId } = req.params; //
  console.log("Fetching user with ID:", userId);
  try {
    const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);

    if (userResult.rows.length > 0) {
      const user = userResult.rows[0]; //
      res.render("admin/edituser", { user }); //
    } else {
      res.status(404).send("user not found");
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Failed to fetch user" });
  }
};
//edit
export const updateUserData = async (req, res) => {
  const { userId } = req.params; //
  const userData = req.body; //

  try {
    await updateUser(userId, userData); //
    res.redirect("/admin/userManage"); //
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Failed to update user" });
  }
};
//delete

export const removeUser = async (req, res) => {
  const { id } = req.body;
  try {
    const deleted = await deleteUser(id);

    if (!deleted) {
      return res.status(404).json({ error: "user not found" });
    }
    res.redirect("/admin/userManage"); //
  } catch (error) {
    res.status(500).json({ error: "Failed to delete user" });
  }
};
