const express = require('express');
const userRouter  = express.Router();
const userController = require('../Controller/userController');

userRouter.delete('/:email', userController.deleteUser);
userRouter.get('/list', userController.userList);
module.exports = userRouter;