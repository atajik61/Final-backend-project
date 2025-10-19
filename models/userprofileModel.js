import pool from "../db/index.js";

// Get User by ID
export const getUserById = async (userId) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [
      userId,
    ]);
    console.log(result.rows); //
    return result.rows[0]; //
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};
