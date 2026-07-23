const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Setting = sequelize.define('Setting', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    key: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: 'Nama setting, misal: max_antrian_per_hari',
    },
    value: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Nilai setting (selalu string, parse sesuai kebutuhan)',
    },
    label: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Label tampilan untuk UI admin',
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: 'Deskripsi singkat tentang setting ini',
    },
}, {
    tableName: 'settings',
    timestamps: true,
});

module.exports = Setting;
