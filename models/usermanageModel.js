import pool from "../db/index.js";

//Get All Users
export const getAllUsers = async () => {
  try {
    const result = await pool.query("SELECT * FROM users");
    return result.rows;
  } catch (error) {
    console.error("Database query error:", error);
    throw error;
  }
};
//POST or Add new Service
export const createUser = async ({
  userId,
  userName,
  userRole,
  firstName,
  lastName,
  userPhone,
  userEmail,
  date_birth,
}) => {
  console.log("thi is create function");
  try {
    const result = await pool.query(
      "INSERT INTO users (id,username,role,first_name,last_name,phone_number,email,date_of_birth) VALUES($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *",
      [
        userId,
        userName,
        userRole,
        firstName,
        lastName,
        userPhone,
        userEmail,
        date_birth,
      ]
    );
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};
//edit user

export const updateUser = async (userId, userData) => {
  const {
    userName,
    userRole,
    firstName,
    lastName,
    userPhone,
    userEmail,
    date_birth,
  } = userData;
  try {
    await pool.query(
      "UPDATE users SET username = $1, role = $2, first_name = $3, last_name = $4 ,phone_number=$5,email=$6 ,date_of_birth=$7 WHERE id = $8",
      [
        userName,
        userRole,
        firstName,
        lastName,
        userPhone,
        userEmail,
        date_birth,
        userId,
      ]
    );
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};
//delete

export const deleteUser = async (id) => {
  const result = await pool.query(
    `DELETE FROM users
     WHERE id = $1
     RETURNING *`,
    [id]
  );
  return result.rows[0];
};
