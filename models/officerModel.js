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
//update status
export const updateRequestStatus = async (requestId, newStatus) => {
  try {
    const query = `
      UPDATE requests
      SET status = $1
      WHERE request_id = $2
      RETURNING *`;

    const result = await pool.query(query, [newStatus, requestId]);
    return result.rows[0]; //
  } catch (error) {
    console.error("Database update error:", error);
    throw error;
  }
};
//filter
export const getRequestsByServiceName = async (serviceName) => {
  try {
    const query = `
      SELECT requests.*, services.service_name
      FROM requests
      LEFT JOIN services ON requests.service_id = services.service_id
      WHERE services.service_name ILIKE $1`; //

    const result = await pool.query(query, [`%${serviceName}%`]);
    console.log("Database query result:", result.rows);
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};
