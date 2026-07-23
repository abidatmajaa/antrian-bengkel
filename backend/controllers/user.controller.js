const { UniqueConstraintError, ValidationError } = require('sequelize');
const User = require('../models/user.model');
const Antrian = require('../models/antrian.model');

const handleError = (res, error) => {
    if (error instanceof UniqueConstraintError) {
        return res.status(409).json({ code: 409, message: 'Email sudah terdaftar.' });
    }
    if (error instanceof ValidationError) {
        return res.status(400).json({ code: 400, message: error.errors[0]?.message || 'Data tidak valid.' });
    }
    console.error('Database error:', error);
    return res.status(500).json({ code: 500, message: 'Internal server error' });
};

const getAllUser = async (req, res) => {
    try {
        const users = await User.findAll({ order: [['createdAt', 'DESC']] });
        res.status(200).json({ code: 200, message: 'Success get all users', data: users });
    } catch (error) {
        return handleError(res, error);
    }
};

const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ code: 404, message: 'User tidak ditemukan.' });

        const antrians = await Antrian.findAll({
            where: { user_id: id },
            order: [['createdAt', 'DESC']],
        });

        res.status(200).json({ code: 200, message: 'Success', data: { ...user.toJSON(), antrians } });
    } catch (error) {
        return handleError(res, error);
    }
};

const createUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name) return res.status(400).json({ code: 400, message: 'Nama wajib diisi.' });
        if (!email) return res.status(400).json({ code: 400, message: 'Email wajib diisi.' });
        if (!password || password.length < 6)
            return res.status(400).json({ code: 400, message: 'Password minimal 6 karakter.' });

        const user = await User.create({ name, email, password });
        res.status(201).json({ code: 201, message: 'User berhasil dibuat.', data: user });
    } catch (error) {
        return handleError(res, error);
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email, password } = req.body;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ code: 404, message: 'User tidak ditemukan.' });
        if (!name) return res.status(400).json({ code: 400, message: 'Nama wajib diisi.' });
        if (!email) return res.status(400).json({ code: 400, message: 'Email wajib diisi.' });
        if (password && password.length < 6)
            return res.status(400).json({ code: 400, message: 'Password minimal 6 karakter.' });

        await user.update({
            name: name.trim(),
            email: email.trim().toLowerCase(),
            ...(password ? { password } : {}),
        });
        res.status(200).json({ code: 200, message: 'User berhasil diperbarui.', data: user });
    } catch (error) {
        return handleError(res, error);
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findByPk(id);
        if (!user) return res.status(404).json({ code: 404, message: 'User tidak ditemukan.' });
        await user.destroy();
        res.status(200).json({ code: 200, message: 'User berhasil dihapus.' });
    } catch (error) {
        return handleError(res, error);
    }
};

module.exports = { getAllUser, getUserById, createUser, updateUser, deleteUser };