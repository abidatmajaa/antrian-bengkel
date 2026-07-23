const Setting = require('../models/setting.model');

const DEFAULTS = {
    max_antrian_per_hari: { value: '15', label: 'Kapasitas Antrian Per Hari', description: 'Batas maksimal jumlah antrian yang bisa masuk setiap hari.' },
};

const seedDefaults = async () => {
    for (const [key, meta] of Object.entries(DEFAULTS)) {
        await Setting.findOrCreate({
            where: { key },
            defaults: { key, value: meta.value, label: meta.label, description: meta.description },
        });
    }
};

const getAllSettings = async (req, res) => {
    try {
        await seedDefaults();
        const settings = await Setting.findAll({ order: [['key', 'ASC']] });
        return res.status(200).json({ code: 200, message: 'Berhasil mengambil pengaturan.', data: settings });
    } catch (error) {
        console.error('getAllSettings error:', error);
        return res.status(500).json({ code: 500, message: 'Internal server error' });
    }
};

const updateSetting = async (req, res) => {
    try {
        const { key } = req.params;
        const { value } = req.body;

        if (value === undefined || value === null || String(value).trim() === '') {
            return res.status(400).json({ code: 400, message: 'Value tidak boleh kosong.' });
        }

        if (key === 'max_antrian_per_hari') {
            const num = parseInt(value);
            if (isNaN(num) || num < 1 || num > 200) {
                return res.status(400).json({ code: 400, message: 'Kapasitas harus berupa angka antara 1 – 200.' });
            }
        }

        await seedDefaults();
        const [setting] = await Setting.findOrCreate({
            where: { key },
            defaults: DEFAULTS[key] || { key, value: String(value) },
        });

        setting.value = String(value).trim();
        await setting.save();

        return res.status(200).json({ code: 200, message: 'Pengaturan berhasil disimpan.', data: setting });
    } catch (error) {
        console.error('updateSetting error:', error);
        return res.status(500).json({ code: 500, message: 'Internal server error' });
    }
};

const getSettingValue = async (key) => {
    try {
        await seedDefaults();
        const setting = await Setting.findOne({ where: { key } });
        return setting ? setting.value : (DEFAULTS[key]?.value ?? null);
    } catch {
        return DEFAULTS[key]?.value ?? null;
    }
};

module.exports = { getAllSettings, updateSetting, getSettingValue };
