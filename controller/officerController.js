import pool from "../db/index.js";
import {
  getAllRequests,
  updateRequestStatus,
  getRequestsByServiceName,
} from "../models/officerModel.js";
//import { getAllServices } from "../models/serviceModel.js";
//get Requests
export const getRequests = async (req, res) => {
  try {
    const requests = await getAllRequests();
    const username = req.session.username;
    //console.log(requests); //for test code
    //res.json(requests);
    res.render("officer/requestManage", { requests, username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};
//status
export const changeRequestStatus = async (req, res) => {
  const requestId = parseInt(req.body.requestId, 10); // تبدیل به عدد صحیح
  const newStatus = req.body.newStatus;
  if (isNaN(requestId)) {
    return res.status(400).json({ error: "Invalid request ID" });
  }

  try {
    const updatedRequest = await updateRequestStatus(requestId, newStatus);
    // بارگذاری دوباره صفحه با پیام موفقیت
    res.render("officer/requestManage", {
      requests: await getAllRequests(), // بارگذاری مجدد درخواست‌ها
      successMessage: "Status updated successfully!", // اضافه کردن پیام موفقیت
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to update status");
  }
};
//filter
export const getfilterRequests = async (req, res) => {
  try {
    const requests = await getAllRequests();
    //console.log(requests); //for test code
    //res.json(requests);
    res.render("officer/filterRequests", { requests });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};

export const filterRequestsByServiceName = async (req, res) => {
  const { serviceName } = req.query;
  console.log("Service Name:", serviceName);

  try {
    const requests = await getRequestsByServiceName(serviceName);
    console.log("Filtered requests:", requests);
    res.render("officer/filterRequests", { requests, serviceName });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch requests");
  }
};
