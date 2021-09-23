const { sequelize, Sequelize } = require('../config/DBconfig');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');


const User = sequelize.define('User', {
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
        primaryKey: true,
    },
    user_name: {
        type: DataTypes.STRING(25),
        allowNull: false,
        isAlpha: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('admin', 'librarian', 'user'),
        defaultValue: 'user',
    },
},
{
    timestamps: true,
})

User.beforeSave(async user => {
    user.password = await bcrypt.hash(user.password, 12);
})

User.prototype.matchPassword = async (candidatePassword, userPassword) => bcrypt.compare(candidatePassword, userPassword);

module.exports = User;