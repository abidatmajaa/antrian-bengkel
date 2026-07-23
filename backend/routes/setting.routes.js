const express = require('express');
const router = express.Router();
const { getAllSettings, updateSetting } = require('../controllers/setting.controller');
const authenticate = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/role.middleware');

router.get('/settings', getAllSettings);

router.put('/settings/:key', authenticate, authorizeRoles('admin'), updateSetting);

module.exports = router;
