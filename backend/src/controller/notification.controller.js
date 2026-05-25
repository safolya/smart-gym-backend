const notificationService = require('../services/notification.service');

exports.getNotifications = async (req, res) => {
    try{
        const userId = req.user.id;
        const notifications = await notificationService.getUserNotifications(userId);
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

exports.markAsRead = async (req, res) => {
    try {
        const notificationId = req.params.id; 
        const userId=req.user.id;
        await notificationService.readNotification(notificationId,userId);
        res.json({ message: 'Notification marked as read' });
    }   
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}   