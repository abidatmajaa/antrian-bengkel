const express = require('express');

const userController = require('../controllers/user.controller');
const authenticate = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/role.middleware');

const router = express.Router();

router.get('/users', authenticate, authorizeRoles('admin'), userController.getAllUser);
router.get('/users/:id', authenticate, authorizeRoles('admin'), userController.getUserById);
router.post('/users', authenticate, authorizeRoles('admin'), userController.createUser);
router.put('/users/:id', authenticate, authorizeRoles('admin'), userController.updateUser);
router.delete('/users/:id', authenticate, authorizeRoles('admin'), userController.deleteUser);

module.exports = router;