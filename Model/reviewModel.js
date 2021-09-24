const { sequelize, Sequelize } = require('../config/DBconfig');
const { DataTypes } = require('sequelize');
const User = require('./userModel');
const Book = require('./bookModel');


const Review = sequelize.define('Review', {
    id:{
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    content: DataTypes.TEXT,
    averageReview: {
        type: DataTypes.FLOAT(3),
        validate: {
            max: 5,
            min: 1,
        }
    },
    BookId: {
        type: DataTypes.UUID,
        allowNull: false,
    },
});

Book.hasMany(Review);
Review.belongsTo(Book, {
    foreignKey: 'BookId',
});

module.exports = Review;