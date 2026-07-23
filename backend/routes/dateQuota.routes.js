const express = require('express');
const router = express.Router();
const { getMonthQuotas, setDateQuota, deleteDateQuota } = require('../controllers/dateQuota.controller');
const authenticate = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/role.middleware');

router.get('/date-quotas', getMonthQuotas);

router.put('/date-quotas/:date', authenticate, authorizeRoles('admin'), setDateQuota);

router.delete('/date-quotas/:date', authenticate, authorizeRoles('admin'), deleteDateQuota);

module.exports = router;
