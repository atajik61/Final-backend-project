import express from "express";
//import { upload } from "../middleware/upload.js"; //
import {
  getRequests,
  changeRequestStatus,
  filterRequestsByServiceName,
  getfilterRequests,
} from "../controller/officerController.js";
import { requireLogin } from "../app.js";

const router = express.Router(); ///////

//show requests
router.get("/officer/requestManage", requireLogin, getRequests);
//status
router.post("/officer/update-status", changeRequestStatus);

//filter
router.get("/officer/filterRequests", getfilterRequests);
router.get("/officer/filter", filterRequestsByServiceName);
export default router;
