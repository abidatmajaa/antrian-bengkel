const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const DateQuota = sequelize.define('DateQuota', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    date: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        unique: true,
    },
    max_quota: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    note: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, {
    tableName: 'date_quotas',
    timestamps: true,
});

module.exports = DateQuota;
