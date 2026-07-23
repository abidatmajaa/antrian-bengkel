const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const authenticate = require('../middlewares/auth.middleware');
const authorizeRoles = require('../middlewares/role.middleware');

router.post('/reviews', authenticate, reviewController.createReview);
router.get('/reviews/featured', reviewController.getFeaturedReviews);
router.get('/admin/reviews', authenticate, authorizeRoles('admin'), reviewController.getAllReviews);

module.exports = router;
