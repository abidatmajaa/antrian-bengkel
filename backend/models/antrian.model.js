const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./user.model');

const Antrian = sequelize.define('Antrian', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    booking_id: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'Kode unik booking, misal: MG-A1B2C',
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    is_offline: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
        comment: 'false = online (booking mandiri) | true = offline (input oleh admin)',
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    motor_brand: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    motor_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    year: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    plate: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    services: {
        type: DataTypes.JSON,
        allowNull: false,
        defaultValue: [],
        comment: 'Array ID layanan yang dipilih',
    },
    estimated_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    final_items: {
        type: DataTypes.JSON,
        allowNull: true,
        comment: 'Daftar item final yang diinput admin',
    },
    final_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: 'Total harga final',
    },
    booking_date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        comment: 'Tanggal booking (YYYY-MM-DD)',
    },
    queue_number: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Nomor antrian yang digenerate, misal: A-047',
    },
    status: {
        type: DataTypes.ENUM('waiting', 'in_progress', 'done', 'cancelled'),
        allowNull: false,
        defaultValue: 'waiting',
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
}, {
    tableName: 'antrians',
    timestamps: true,
    indexes: [
        {
            unique: true,
            fields: ['booking_id']
        }
    ]
});

Antrian.belongsTo(User, { foreignKey: 'user_id', as: 'user' });
User.hasMany(Antrian, { foreignKey: 'user_id', as: 'antrians' });

Antrian.beforeCreate(async (antrian) => {
    if (!antrian.booking_date) {
        const d = new Date(new Date().getTime() + 7 * 3600 * 1000);
        antrian.booking_date = d.toISOString().split('T')[0];
    }

    const count = await Antrian.count({
        where: { booking_date: antrian.booking_date },
    });

    const day = antrian.booking_date.split('-')[2];
    antrian.queue_number = `A-${day}-${String(count + 1).padStart(3, '0')}`;
});

module.exports = Antrian;
