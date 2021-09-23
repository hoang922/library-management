const express = require('express');
const bookRouter = express.Router();
const bookController = require('../Controller/bookController');
const authController = require('../Controller/authController');

//CREATE BOOK
bookRouter.post('/', authController.protect, authController.restrictTo('librarian'), bookController.createBook);
//GET BOOK LIST
bookRouter.post('/list', bookController.bookList);
//UPDATE BOOK
bookRouter.patch('/:id', authController.restrictTo('librarian'), bookController.updateBook);
//DELETE BOOK
bookRouter.delete('/:id', authController.restrictTo('librarian'), bookController.deleteBook);

module.exports = bookRouter;