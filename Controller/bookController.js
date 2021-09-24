const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const Book = require('../Model/bookModel');
const Borrowing = require('../Model/borrowingModel');
const User = require('../Model/userModel');
const Review = require('../Model/reviewModel');
exports.createBook = catchAsync(async (req, res) => {
    //console.log(req.body)
    const book = await Book.create(req.body);
    res.status(200).json({
        status: 'Success',
        data: {
            book,
        }
    });
})

exports.bookList = catchAsync(async (req, res) => {
    const list = await Book.findAll({
        include: {
            model: Review,
            attributes: ['content', 'averageReview'],
            include: {
                model: User,
                attributes: ['user_name']
            },
        },
    });
    res.status(200).json({
        status: 'Success',
        data:{
            list,
        }
    });
});

exports.updateBook = catchAsync(async (req, res, next) => {
    const book = await Book.update(req.body, {
        where: {
            id: req.params.id,
        }
    });
    if(book < 1) return next(new AppError('Book not found!!', 404));
    res.status(200).json({
        status: 'Success',
    })
});

exports.deleteBook = catchAsync(async (req, res, next) => {
    const book = await Book.destroy({
        where: {
            id: req.params.id,
        }
    });
    if(book < 1) return next(new AppError('Book not found!!', 404));
    res.status(200).json({
        status: 'Success',
    })
});