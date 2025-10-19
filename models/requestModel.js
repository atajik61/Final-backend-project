import pool from "../db/index.js";

//Get All Requests
export const getAllRequests = async () => {
  try {
    const result = await pool.query(`
        SELECT requests.*, services.service_id AS service_id, services.service_name AS service_name
        FROM requests
        LEFT JOIN services ON requests.service_id = services.service_id
            `);
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};

//post add a new request
export const createRequest = async ({
  userId,
  serviceId,
  title,
  date,
  documentPath,
}) => {
  console.log("this is create function");
  try {
    const result = await pool.query(
      "INSERT INTO requests (user_id,service_id,title,created_at,document_path) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [userId, serviceId, title, date, documentPath]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating request:", error);
    throw error;
  }
};

//edit
export const updateRequest = async (requestId, requestData) => {
  const { title, serviceId, date, documentPath } = requestData;
  try {
    await pool.query(
      "UPDATE requests SET title = $1, service_id = $2, created_at = $3 ,document_path=$4 WHERE request_id = $5",
      [title, serviceId, date, documentPath, requestId]
    );
  } catch (error) {
    console.error("Error updating service:", error);
    throw error;
  }
};

//delete

export const deleteRequest = async (id) => {
  const result = await pool.query(
    `DELETE FROM requests
     WHERE request_id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
};
