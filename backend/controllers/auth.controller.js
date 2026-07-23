const bcrypt = require('bcryptjs');

const { UniqueConstraintError, ValidationError } = require('sequelize');

const User = require('../models/user.model');
const { generateToken } = require('../utils/jwt');

const emailPattern = /^[^\s]+@[^\s]+\.[^\s]/;

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                code: 400,
                message: 'Name, email, dan password wajib diisi.',
            });
        }

        if (typeof name !== 'string') {
            return res.status(400).json({
                code: 400,
                message: 'Name harus berupa string.',
            });
        }

        if (typeof email !== 'string') {
            return res.status(400).json({
                code: 400,
                message: 'Email harus berupa string.',
            });
        }

        if (typeof password !== 'string') {
            return res.status(400).json({
                code: 400,
                message: 'Passwordharus berupa string.',
            });
        }

        if (!name.trim()) {
            return res.status(400).json({
                code: 400,
                message: 'Name tidak boleh kosong.',
            });
        }

        if (!emailPattern.test(email.trim())) {
            return res.status(400).json({
                code: 400,
                message: 'Format email tidak valid.',
            });
        }

        if (password.length < 6 || password.length > 100) {
            return res.status(400).json({
                code: 400,
                message: 'Password minimal 6 karakter.',
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            where: {
                email: normalizedEmail,
            },
        });

        if (existingUser) {
            return res.status(409).json({
                code: 409,
                message: 'Email sudah terdaftar.',
            });
        }

        const user = await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: password,
        });

        const token = generateToken(user);

        return res.status(201).json({
            code: 201,
            message: 'Register berhasil',
            data: {
                user,
                token,
            },
        });
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            return res.status(409).json({
                code: 409,
                message: 'Email sudah terdaftar.',
            });
        }

        if (error instanceof ValidationError) {
            return res.status(400).json({
                code: 400,
                message: error.errors[0]?.message || 'Data register tidak valid',
            });
        }

        console.error('Register error :', error);

        return res.status(500).json({
            code: 500,
            message: 'Internal server error',
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                code: 400,
                message: 'Email dan password wajib diisi.',
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.scope('withPassword').findOne({ where: { email: normalizedEmail } });

        if (!user) {
            return res.status(401).json({
                code: 401,
                message: 'Email atau password salah.',
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({
                code: 401,
                message: 'Email atau password salah.',
            });
        }

        const token = generateToken(user);

        return res.status(200).json({
            code: 200,
            message: 'Login berhasil',
            data: {
                user,
                token,
            },
        });
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).json({
            code: 500,
            message: 'Internal server error',
        });
    }
};

const getCurrentUser = async (req, res) => {
    try {

        return res.status(200).json({
            code: 200,
            message: 'Data user berhasil diambil',
            data: {
                user: req.user,
            },
        });
    } catch (error) {
        console.error('GetCurrentUser error:', error);
        return res.status(500).json({
            code: 500,
            message: 'Internal server error',
        });
    }
};

module.exports = { register, login, getCurrentUser };
