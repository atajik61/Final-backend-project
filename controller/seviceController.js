import pool from "../app.js";
import {
  getAllServices,
  createService,
  updateService,
  deleteService,
} from "../models/serviceModel.js";
import { getDepartments } from "../models/departmentModel.js";

//get
export const getServices = async (req, res) => {
  try {
    const services = await getAllServices();
    console.log("✅ getServices is running");
    //console.log(requests); //for test code
    //res.json(requests);
    res.render("admin/services", { services });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch requests" });
  }
};
//add deepartment to addservice.ejs

export const getAddServicePage = async (req, res) => {
  try {
    const departments = await getDepartments(); // دریافت دیپارتمنت‌ها
    res.render("admin/addservice", { departments }); // ارسال به صفحه
  } catch (error) {
    console.error("Failed to fetch departments:", error);
    res.status(500).json({ error: "Failed to load departments" });
  }
};
//post

export const addServices = async (req, res) => {
  try {
    const { serviceId, serviceName, serviceDescribtion, departmentId, date } =
      req.body;
    console.log("Title:", serviceName);
    //console.log("Date:", date);
    const newService = await createService({
      serviceId,
      serviceName,
      serviceDescribtion,
      departmentId,
      date,
    });
    res.redirect("/admin/services"); // هدایت به صفحه requests
    //res.status(201).json(newRequest);
  } catch (error) {
    res.status(500).json({ error: "Failed to create request" });
  }
};
//put

export const getEditServicePage = async (req, res) => {
  const { serviceId } = req.params; // دریافت serviceId از پارامترهای URL
  try {
    const serviceResult = await pool.query(
      "SELECT * FROM services WHERE service_id = $1",
      [serviceId]
    );
    const departments = await getDepartments(); // فرض بر اینکه تابعی برای دریافت دیپارتمنت‌ها دارید
    if (serviceResult.rows.length > 0) {
      const service = serviceResult.rows[0]; // دریافت اطلاعات سرویس
      res.render("admin/editservice", { service, departments }); // ارسال اطلاعات به صفحه
    } else {
      res.status(404).send("Service not found");
    }
  } catch (error) {
    console.error("Error fetching service:", error);
    res.status(500).json({ error: "Failed to fetch service" });
  }
};
//edit
export const updateServiceData = async (req, res) => {
  const { serviceId } = req.params; // دریافت serviceId از پارامترهای URL
  const serviceData = req.body; // دریافت اطلاعات سرویس از بدنه درخواست

  try {
    await updateService(serviceId, serviceData); // به‌روزرسانی سرویس
    res.redirect("/admin/services"); // هدایت به صفحه خدمات بعد از به‌روزرسانی
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Failed to update service" });
  }
};
//delete

export const removeService = async (req, res) => {
  const { id } = req.body;

  try {
    const deleted = await deleteService(id);

    if (!deleted) {
      return res.status(404).json({ error: "service not found" });
    }
    res.redirect("/admin/services"); //
  } catch (error) {
    res.status(500).json({ error: "Failed to delete service" });
  }
};
