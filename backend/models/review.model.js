const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');
const Antrian = require('./antrian.model');

const Review = sequelize.define('Review', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    antrian_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: Antrian,
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: 1,
            max: 5,
        }
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
}, {
    tableName: 'reviews',
    timestamps: true,
});

User.hasMany(Review, { foreignKey: 'user_id' });
Review.belongsTo(User, { foreignKey: 'user_id' });

Antrian.hasOne(Review, { foreignKey: 'antrian_id' });
Review.belongsTo(Antrian, { foreignKey: 'antrian_id' });

module.exports = Review;
