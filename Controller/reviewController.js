const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const Review = require('../Model/reviewModel');
const User = require('../Model/userModel');

exports.getReviewList = catchAsync(async (req, res) => {
    const list = await Review.findAll({
        include: User,
    });
    res.status(200).json({
        status: 'Success',
        reviews: list,
    })
})

exports.createReview = catchAsync(async (req, res) => {
    req.body.UserEmail = req.user.email;
    req.body.BookId = req.params.id;
    const review = await Review.create(req.body);
    res.status(200).json({
        status: 'Success',
        review,
    })
})
