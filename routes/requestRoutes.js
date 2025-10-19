import express from "express";
import { upload } from "../middleware/upload.js"; // مسیر صحیح را تنظیم کنید
import {
  getRequests,
  addRequests,
  getAddPage,
  getEditRequestPage,
  updateRequestData,
  removeRequest,
} from "../controller/requestController.js";
import { requireLogin } from "../app.js";
const router = express.Router(); ///////

//show requests
router.get("/user/requests", requireLogin, getRequests);

//add page لیست کشویی سرویسها
router.get("/user/add", requireLogin, getAddPage);

router.post("/user/requests", upload, addRequests); ///////////
//show edit page
//router.get("user/edit/:id",);
router.get("/user/edit/:requestId", requireLogin, getEditRequestPage);

router.post("/user/requests/:requestId", upload, updateRequestData); ////requestId
//delete
router.post("/delete", removeRequest);
export default router;
