import express from "express";
import * as notificationController from "../controller/notificationController.js";

const router = express.Router();
router.get("/officer/sendNotification", (req, res) => {
  res.render("officer/sendNotification"); //
});
router.post(
  "/officer/sendNotification",
  notificationController.sendNotification
);

router.get("/user/notification", notificationController.showNotifications);

export default router;
