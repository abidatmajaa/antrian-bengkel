const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/role.middleware');
const { createAntrian, createAntrianOffline, getMyAntrian, getTodayAntrian, getAvailability, getAntrianById, updateStatus, updateTagihan, getReport } = require('../controllers/antrian.controller');

router.post('/antrian', authenticate, createAntrian);

router.post('/antrian/offline', authenticate, authorizeRoles('admin'), createAntrianOffline);

router.get('/antrian/my', authenticate, getMyAntrian);

router.get('/antrian/report', authenticate, authorizeRoles('admin'), getReport);

router.get('/antrian/today', getTodayAntrian);
router.get('/antrian/availability', getAvailability);

router.get('/antrian/:id', authenticate, getAntrianById);

router.put('/antrian/:id/status', authenticate, authorizeRoles('admin'), updateStatus);

router.put('/antrian/:id/tagihan', authenticate, authorizeRoles('admin'), updateTagihan);

module.exports = router;
