const notificationRepository = require('../repository/notification.repository');

exports.createNotification = async (data) => {
  return notificationRepository.createNotification(data);
};

exports.getUserNotifications = async (userId) => {
  return notificationRepository.getNotificationsForUser(userId);
};

exports.readNotification = async (notificationId, userId) => {
  return notificationRepository.markNotificationRead(notificationId, userId);
};