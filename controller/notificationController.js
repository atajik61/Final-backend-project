import * as notificationModel from "../models/notificationModel.js";

// تابع برای ارسال نوتیفیکیشن
export const sendNotification = async (req, res) => {
  const { userId, message } = req.body;

  try {
    await notificationModel.createNotification(userId, message);
    res.redirect("/officer/notification");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send notification");
  }
};

// تابع برای نمایش نوتیفیکیشن‌ها
export const showNotifications = async (req, res) => {
  try {
    const notifications = await notificationModel.getNotificationsByUserId(
      req.user.id
    );

    // علامت‌گذاری نوتیفیکیشن‌ها به عنوان خوانده شده
    await notificationModel.markNotificationsAsRead(req.user.id);

    res.render("user/notification", { notifications });
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to fetch notifications");
  }
};
