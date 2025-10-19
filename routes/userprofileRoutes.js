import express from "express";
import {
  getUserProfile,
  getOfficerProfile,
} from "../controller/userprofileController.js";
import { requireLogin } from "../app.js";
const router = express.Router(); ///////

//show requests

router.get("/user/profile/:id", getUserProfile);
router.get("/officer/officerProfile/:id", requireLogin, getOfficerProfile);

export default router;
