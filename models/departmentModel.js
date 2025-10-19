import pool from "../db/index.js";

//Get All Departments
export const getDepartments = async () => {
  try {
    const result = await pool.query("SELECT * FROM departments");
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};
