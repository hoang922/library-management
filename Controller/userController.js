const User = require('../Model/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Book = require('../Model/bookModel');
const Review = require('../Model/reviewModel');


exports.deleteUser = catchAsync(async (req, res, next) => {
    const users = await User.destroy({
        where: {
            email: req.params.email,
        },
    });
    if(users < 1) return next(new AppError('User not found !!', 404));
    res.status(200).json({
        status: 'Delete Success',
    })
})

exports.userList = catchAsync(async (req, res) => {
    const list = await User.findAll({
        include: {
            model: Review,
            //attributes: ['name', 'id'],
            //required: true,
        },
        attributes: ['email', 'user_name', 'role'],
    });
    res.status(200).json({
        status: 'Success',
        list,
    });
})

