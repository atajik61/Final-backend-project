import pool from "../db/index.js";
import {
  getAllRequests,
  createRequest,
  updateRequest,
  deleteRequest,
} from "../models/requestModel.js";
import { getAllServices } from "../models/serviceModel.js";
//get Requests
export const getRequests = async (req, res) => {
  try {
    const requests = await getAllRequests();
    const username = req.session.username;
    res.render("user/requests", { requests, username });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};

//add services to add.ejsلیست کشویی سرویسها

export const getAddPage = async (req, res) => {
  console.log(" getAddPage called");
  try {
    const services = await getAllServices(); // دریافت
    const userId = req.session.userId;
    const username = req.session.username;
    res.render("user/add", { services, userId, username }); // ارسال به صفحه
  } catch (error) {
    console.error("Failed to fetch services:", error);
    res.status(500).json({ error: "Failed to load services" });
  }
};
//post request
export const addRequests = async (req, res) => {
  try {
    const { userId, serviceId, title, date } = req.body;

    const documentPath = req.file.path;
    console.log("Uploaded Document Path:", documentPath);

    const newRequest = await createRequest({
      userId,
      serviceId,
      title,
      date,
      documentPath,
    });
    res.redirect("/user/requests"); // هدایت به صفحه requests
  } catch (error) {
    res.status(500).json({ error: "Failed to create request" });
  }
};
//update request
export const getEditRequestPage = async (req, res) => {
  const { requestId } = req.params; //
  console.log("Request ID:", requestId); // برا
  try {
    const requestResult = await pool.query(
      "SELECT * FROM requests WHERE request_id = $1",
      [requestId]
    );
    const request = requestResult.rows[0]; // دریافت اطلاعات درخواست

    // دریافت نام سرویس بر اساس service_id
    const serviceResult = await pool.query(
      "SELECT service_name FROM services WHERE service_id = $1",
      [request.service_id]
    );

    const currentServiceName = serviceResult.rows[0]?.service_name || ""; // نام سرویس فعلی
    const username = req.session.username;
    const services = await getAllServices(); //
    if (requestResult.rows.length > 0) {
      const request = requestResult.rows[0]; //
      res.render("user/edit", {
        request,
        currentServiceName,
        services,
        username,
      }); //
    } else {
      res.status(404).send("request not found");
    }
  } catch (error) {
    console.error("Error fetching request:", error);
    res.status(500).json({ error: "Failed to fetch request" });
  }
};
//edit
export const updateRequestData = async (req, res) => {
  const { requestId } = req.params; // دریافت requestId از پارامترهای URL
  const requestData = req.body; // دریافت اطلاعات  از بدنه درخواست
  const file = req.file; // دریافت فایل آپلود شده
  console.log("Request Data:", requestData);
  console.log("Uploaded File:", file);
  try {
    if (file) {
      requestData.document_path = file.filename;
    }
    await updateRequest(requestId, requestData); //
    res.redirect("/user/requests"); //
  } catch (error) {
    console.error("Error updating request:", error);
    res.status(500).json({ error: "Failed to update request" });
  }
};

//delete

export const removeRequest = async (req, res) => {
  const { id } = req.body;
  try {
    const deleted = await deleteRequest(id);

    if (!deleted) {
      return res.status(404).json({ error: "Request not found" });
    }
    res.redirect("/user/requests"); //
  } catch (error) {
    res.status(500).json({ error: "Failed to delete request" });
  }
};
