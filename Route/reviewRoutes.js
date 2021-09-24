const express = require('express');
const reviewRouter = express.Router();
const reviewController = require('../Controller/reviewController');
const authController = require('../Controller/authController');

reviewRouter.get('/', reviewController.getReviewList);

reviewRouter.post('/:id', authController.protect, reviewController.createReview);





module.exports = reviewRouter;