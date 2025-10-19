import express from "express";
import {
  getServices,
  addServices,
  getAddServicePage,
  getEditServicePage,
  updateServiceData,
  removeService,
} from "../controller/seviceController.js";

const router = express.Router(); ///////

console.log(typeof getServices);

//show requests
router.get("/admin/services", getServices);

//add department
router.get("/admin/addservice", getAddServicePage); //
//add
router.post("/admin/services", addServices);

//edit
router.get("/admin/editservice/:serviceId/edit", getEditServicePage); //
router.post("/admin/services/:serviceId", updateServiceData);

//delete
router.post("/services/delete", removeService);
export default router;
