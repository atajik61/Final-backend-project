import pool from "../db/index.js";

//Get All Requests
export const getAllServices = async () => {
  try {
    const result = await pool.query(`
    SELECT services.*, departments.department_id AS department_id, departments.department_name AS department_name
    FROM services
    LEFT JOIN departments ON services.department_id = departments.department_id
        `);
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

//POST or Add new Service
export const createService = async ({
  serviceId,
  serviceName,
  serviceDescribtion,
  departmentId,
  date,
}) => {
  console.log("thi is create function");
  try {
    const result = await pool.query(
      "INSERT INTO services (service_id,service_name,describtion,department_id,created_at) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [serviceId, serviceName, serviceDescribtion, departmentId, date]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating request:", error);
    throw error;
  }
};

//edit service
// تابع برای به‌روزرسانی یک سرویس
export const updateService = async (serviceId, serviceData) => {
  const { serviceName, serviceDescribtion, departmentId, date } = serviceData;
  try {
    await pool.query(
      "UPDATE services SET service_name = $1, describtion = $2, department_id = $3, created_at = $4 WHERE service_id = $5",
      [serviceName, serviceDescribtion, departmentId, date, serviceId]
    );
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

//delete

export const deleteService = async (id) => {
  // حذف رکوردهای وابسته در جدول requests
  await pool.query(`DELETE FROM requests WHERE service_id = $1`, [id]);
  const result = await pool.query(
    `DELETE FROM services
     WHERE service_id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
};
