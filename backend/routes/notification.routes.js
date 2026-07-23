const express = require('express');
const router = express.Router();
const notificationController = require('../controllers/notification.controller');
const authenticate = require('../middlewares/auth.middleware');

router.get('/notifications', authenticate, notificationController.getMyNotifications);
router.put('/notifications/read-all', authenticate, notificationController.markAllAsRead);
router.put('/notifications/:id/read', authenticate, notificationController.markAsRead);

module.exports = router;
