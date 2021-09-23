const express = require('express');
const manageRouter = express.Router();
const manageController = require('../Controller/manageController');
const authController = require('../Controller/authController');

manageRouter.get('/borrowing/list', authController.protect, authController.restrictTo('librarian'), manageController.borrowedList);
manageRouter.post('/borrowing', authController.protect, authController.restrictTo('user'), manageController.borrowBook);   
manageRouter.post('/returning', authController.protect, authController.restrictTo('user'), manageController.returnBook);   
manageRouter.get('/book/borrow/list', authController.protect, authController.restrictTo('user'), manageController.bookBorrowed);


module.exports = manageRouter;