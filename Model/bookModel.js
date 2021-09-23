const { sequelize, Sequelize } = require('../config/DBconfig');
const { DataTypes } = require('sequelize');

const Book = sequelize.define('Book', {
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV1,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        default: 'Add more description',
    },
    photo: {
        type: DataTypes.TEXT
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
    }, 
}, 
{
    timestamps: true
});


Book.beforeCreate(function(book){
    book.status = book.quantity > 0 ? 'stocking' : 'out of stock';
})

module.exports = Book
