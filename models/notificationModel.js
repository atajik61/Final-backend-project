import pool from "../db/index.js";

// create
export const createNotification = async (userId, message) => {
  const query = `
    INSERT INTO notification (user_id, message)
    VALUES ($1, $2)`;
  await pool.query(query, [userId, message]);
};

//
export const getNotificationsByUserId = async (userId) => {
  const result = await pool.query(
    `
    SELECT * FROM notification WHERE user_id = $1
    ORDER BY created_at DESC`,
    [userId]
  );
  return result.rows;
};

export const markNotificationsAsRead = async (userId) => {
  await pool.query(
    `
    UPDATE notification SET is_read = TRUE WHERE user_id = $1 AND is_read = FALSE`,
    [userId]
  );
};
