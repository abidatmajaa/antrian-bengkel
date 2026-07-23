const express = require("express");

const authController = require("../controllers/auth.controller");

const authenticate = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/auth/register", authController.register);
router.post("/auth/login", authController.login);
router.get("/auth/me", authenticate, authController.getCurrentUser);

module.exports = router;
