const { sequelize, Sequelize } = require('../config/DBconfig');
const { DataTypes } = require('sequelize');
const User = require('./userModel');
const Book = require('./bookModel');

const Borrowing = sequelize.define('Borrowing', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    dateBorrowed: DataTypes.DATE,
    dateReturned: DataTypes.DATE,
},
{
    timestamps: false,
    tableName: 'borrowing',
})

Borrowing.beforeCreate(function(borrowing){
    if(!borrowing.dateBorrowed)
        borrowing.dateBorrowed = new Date(Date.now());
})

Book.belongsToMany(User, {
    through: Borrowing,
    unique: false
});

User.belongsToMany(Book, {
    through: Borrowing,
});

module.exports = Borrowing;