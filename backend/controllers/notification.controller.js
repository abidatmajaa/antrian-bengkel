const Notification = require('../models/notification.model');

const getMyNotifications = async (req, res) => {
    try {
        const notifications = await Notification.findAll({
            where: { user_id: req.user.id },
            order: [['createdAt', 'DESC']],
            limit: 50,
        });

        return res.status(200).json({
            code: 200,
            message: 'Notifikasi berhasil diambil.',
            data: notifications,
        });
    } catch (error) {
        console.error('getMyNotifications error:', error);
        return res.status(500).json({
            code: 500,
            message: 'Internal server error',
        });
    }
};

// Menandai notifikasi sebagai terbaca
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;

        const notification = await Notification.findOne({
            where: { id, user_id: req.user.id },
        });

        if (!notification) {
            return res.status(404).json({
                code: 404,
                message: 'Notifikasi tidak ditemukan.',
            });
        }

        notification.is_read = true;
        await notification.save();

        return res.status(200).json({
            code: 200,
            message: 'Notifikasi ditandai sebagai terbaca.',
        });
    } catch (error) {
        console.error('markAsRead error:', error);
        return res.status(500).json({
            code: 500,
            message: 'Internal server error',
        });
    }
};

const markAllAsRead = async (req, res) => {
    try {
        await Notification.update(
            { is_read: true },
            { where: { user_id: req.user.id, is_read: false } }
        );

        return res.status(200).json({
            code: 200,
            message: 'Semua notifikasi ditandai sebagai terbaca.',
        });
    } catch (error) {
        console.error('markAllAsRead error:', error);
        return res.status(500).json({
            code: 500,
            message: 'Internal server error',
        });
    }
};

module.exports = {
    getMyNotifications,
    markAsRead,
    markAllAsRead,
};
