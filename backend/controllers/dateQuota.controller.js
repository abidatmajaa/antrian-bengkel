const { Op } = require('sequelize');
const DateQuota = require('../models/dateQuota.model');
const { getSettingValue } = require('./setting.controller');


const getMonthQuotas = async (req, res) => {
    try {
        const { month } = req.query;
        if (!month || !/^\d{4}-\d{2}$/.test(month)) {
            return res.status(400).json({ code: 400, message: 'Format bulan harus YYYY-MM.' });
        }

        const [year, mon] = month.split('-').map(Number);
        const startDate = `${month}-01`;
        const lastDay = new Date(year, mon, 0).getDate();
        const endDate = `${month}-${String(lastDay).padStart(2, '0')}`;

        const quotas = await DateQuota.findAll({
            where: { date: { [Op.between]: [startDate, endDate] } },
            order: [['date', 'ASC']],
        });

        const defaultQuota = parseInt(await getSettingValue('max_antrian_per_hari')) || 20;

        return res.status(200).json({
            code: 200,
            message: 'Berhasil.',
            data: { quotas, defaultQuota },
        });
    } catch (error) {
        console.error('getMonthQuotas error:', error);
        return res.status(500).json({ code: 500, message: 'Internal server error' });
    }
};

const setDateQuota = async (req, res) => {
    try {
        const { date } = req.params;
        const { max_quota, note } = req.body;

        if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
            return res.status(400).json({ code: 400, message: 'Format tanggal harus YYYY-MM-DD.' });
        }

        const quota = parseInt(max_quota);
        if (isNaN(quota) || quota < 0 || quota > 200) {
            return res.status(400).json({ code: 400, message: 'Kapasitas harus antara 0 – 200.' });
        }

        const [record, created] = await DateQuota.findOrCreate({
            where: { date },
            defaults: { date, max_quota: quota, note: note || null },
        });

        if (!created) {
            record.max_quota = quota;
            record.note = note || null;
            await record.save();
        }

        return res.status(200).json({ code: 200, message: 'Kapasitas tanggal berhasil disimpan.', data: record });
    } catch (error) {
        console.error('setDateQuota error:', error);
        return res.status(500).json({ code: 500, message: 'Internal server error' });
    }
};

const deleteDateQuota = async (req, res) => {
    try {
        const { date } = req.params;
        const record = await DateQuota.findOne({ where: { date } });
        if (!record) {
            return res.status(404).json({ code: 404, message: 'Override tanggal tidak ditemukan.' });
        }
        await record.destroy();
        return res.status(200).json({ code: 200, message: 'Override berhasil dihapus. Tanggal kembali ke kapasitas default.' });
    } catch (error) {
        console.error('deleteDateQuota error:', error);
        return res.status(500).json({ code: 500, message: 'Internal server error' });
    }
};

const getEffectiveQuota = async (date) => {
    try {
        const override = await DateQuota.findOne({ where: { date } });
        if (override) return override.max_quota;
        return parseInt(await getSettingValue('max_antrian_per_hari')) || 15;
    } catch {
        return parseInt(await getSettingValue('max_antrian_per_hari')) || 15;
    }
};

module.exports = { getMonthQuotas, setDateQuota, deleteDateQuota, getEffectiveQuota };
