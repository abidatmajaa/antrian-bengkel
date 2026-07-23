const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const bcrypt = require('bcryptjs');

const User = sequelize.define("User", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Nama tidak boleh kosong'
            },
        },
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
            msg: 'Email sudah digunakan'
        },
        validate: {
            isEmail: {
                msg: 'Format email tidak valid'
            }
        },
        set(value) {
            this.setDataValue('email', value.trim().toLowerCase());
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: {
                args: [6, 100],
                msg: 'Password minimal 6 karakter'
            }
        },
    },
    role: {
        type: DataTypes.ENUM('customer', 'admin'),
        allowNull: false,
        defaultValue: 'customer'
    }
},
    {
        tableName: 'users',
        timestamps: true,
        defaultScope: {
            attributes: {
                exclude: ['password']
            },
        },
        scopes: {
            withPassword: {
                attributes: { include: ['password'] },
            },
        },
        hooks: {
            beforeCreate: async (user) => {
                user.password = await bcrypt.hash(user.password, 12);
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    user.password = await bcrypt.hash(user.password, 12);
                }
            },
        }
    }
);
User.prototype.toJSON = function toJSON() {
    const values = {
        ...this.get(),
    };
    delete values.password;
    return values;
}
module.exports = User;