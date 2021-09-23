const User = require('../Model/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

const signToken = email => {
    return jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

exports.register = catchAsync( async (req, res) =>{
    const user = await User.create(req.body);
    res.status(200).json({
        status: 'Success',
        user,
        token: signToken(user.email),
    });
}) 

exports.login = catchAsync(async (req, res, next ) => {
    const { email, password } = req.body;
    const user = await User.findOne({
        where: {
            email: email,
        }
    });
    if(!user || !await User.prototype.matchPassword(password, user.dataValues.password))
        return next(new AppError('Email or password is invalid !', 400));
    res.status(200).json({
        status: 'Success',
        user,
        token: signToken(user.email),
    });
});

exports.protect = catchAsync(async (req, res, next) => {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
        token = req.headers.authorization.split(' ')[1];
    if(!token)
        return next(new AppError('You are not login !', 401));
    const email = jwt.decode(token).email;
    const currentUser = await User.findOne({
        where: {
            email: email,
        }
    });
    if(!currentUser) return next(new AppError('User not belong exist!', 404));
    req.user = currentUser;
    next();
});

exports.restrictTo = (...roles) => {
    return (req, res, next) => {
        if(!roles.includes(req.user.role))
            return next(new AppError('You can not permission to perform this action !', 403));
        next();
    }
}


