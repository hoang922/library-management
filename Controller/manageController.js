const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const User = require('../Model/userModel');
const Book = require('../Model/bookModel');
const Borrowing = require('../Model/borrowingModel');
const { Op } = require('sequelize');

//[LIBRARIAN] Manage borrowed list
exports.borrowedList = catchAsync(async (req, res, next) => {
    const list = await Borrowing.findAll();
    res.status(200).json({
        status: 'Success',
        list,
    });
})


//[USER] Check list of book borrowed
exports.bookBorrowed = catchAsync(async (req, res) => {
    console.log(req.user.email);
    const list = await User.findOne({
        where: {
            email: req.user.email,
        },
        include: {
            model: Book,
            attributes: ['name'],
            through: {
                model: Borrowing,
                attributes: ['dateBorrowed', 'dateReturned', 'BookId'],
                where:{
                    dateReturned: {
                        [Op.eq]: null,
                    }
                }
            }
        },
        attributes: []
    })
    res.status(200).json({
        status: 'Success',
        list,
    })
})

//[USER] Borrow Book
exports.borrowBook = catchAsync(async (req, res, next) => {
    const book = await Book.findOne({
        where: {
            id: req.body.book_id,
        }
    });
    //Book not exist
    if(!book) return next(new AppError('Book not found !', 404));
    //Check book already borrow
    const check = await Borrowing.findOne({
        where:{
            UserEmail: req.user.email,
            BookId: req.body.book_id,
        }
    });
    if(check && !check.dateReturned) return next(new AppError('This book is already borrow!'));
    //Check book quantity and save new quantity
    let message;
    if(book.dataValues.quantity > 0){
        message = `${req.user.user_name} borrowed ${book.dataValues.name}`;
        book.quantity--;
        book.save();
        // await Borrowing.create({
        //     BookId: req.body.book_id,
        //     UserEmail: req.user.email,
        // });
    }else
        message = 'Stock out of book!'
    
    res.status(200).json({
        status: 'Success',
        message,
    })
})

//[LIBRARIAN] return book
exports.returnBook = catchAsync(async (req, res, next) => {
    const transaction = Borrowing.update({
        dateReturned: new Date(Date.now()),
    },{
        where: {
            UserEmail: req.user.email,
            BookId: req.body.book_id,
        }
    })
    if(transaction < 1) return next(new AppError("You haven't borrowed this book yet", 400));

    //Increase book quantity
    const book = await Book.findOne({
        where: {
            id: req.body.book_id,
        }
    });
    book.quantity++;
    book.save();

    res.status(200).json({
        status: 'Success',
        message: `${req.user.user_name} return ${book.name} success`
    });
})