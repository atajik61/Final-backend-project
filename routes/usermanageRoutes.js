import express from "express";
import {
  getUsers,
  addUser,
  getEdituserPage,
  updateUserData,
  removeUser,
} from "../controller/usermanageController.js";
const router = express.Router();
//show users
router.get("/admin/userManage", getUsers);

//add page
router.get("/admin/adduser", (req, res) => {
  res.render("admin/adduser"); //
});
//add
router.post("/admin/userManage", addUser);

//edit
router.get("/admin/edituser/:userId", getEdituserPage); //
router.post("/admin/userManage/:userId", updateUserData);

router.post("/userManage/delete", removeUser);
export default router;
