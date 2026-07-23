const { Op } = require('sequelize');
const Antrian = require('../models/antrian.model');
const User = require('../models/user.model');
const Review = require('../models/review.model');
const Notification = require('../models/notification.model');
const { getSettingValue } = require('./setting.controller');
const { getEffectiveQuota } = require('./dateQuota.controller');


const createAntrian = async (req, res) => {
    try {
        const {
            name, phone, motorBrand, motorType, year, plate,
            services, totalPrice, bookingDate, notes,
        } = req.body;

        if (!name || !phone || !motorBrand || !motorType || !plate || !services) {
            return res.status(400).json({
                code: 400,
                message: 'Semua field wajib diisi.',
            });
        }

        if (!Array.isArray(services) || services.length === 0) {
            return res.status(400).json({
                code: 400,
                message: 'Pilih minimal satu layanan.',
            });
        }

        const d = new Date(new Date().getTime() + 7 * 3600 * 1000);
        const targetDate = bookingDate || d.toISOString().split('T')[0];
        const maxQuota = await getEffectiveQuota(targetDate);
        const todayCount = await Antrian.count({ where: { booking_date: targetDate } });
        if (maxQuota === 0) {
            return res.status(409).json({
                code: 409,
                message: `Bengkel tutup pada ${targetDate}. Tidak ada antrian yang tersedia.`,
            });
        }
        if (todayCount >= maxQuota) {
            return res.status(409).json({
                code: 409,
                message: `Antrian penuh. Kapasitas pada ${targetDate} sudah mencapai batas ${maxQuota} antrian.`,
            });
        }

        const bookingId = `MG-${Date.now().toString(36).toUpperCase().slice(-5)}`;

        const antrian = await Antrian.create({
            booking_id: bookingId,
            user_id: req.user.id,
            name,
            phone,
            motor_brand: motorBrand,
            motor_type: motorType,
            year: year || null,
            plate,
            services,
            estimated_price: totalPrice || 0,
            booking_date: bookingDate,
            notes: notes || null,
            status: 'waiting',
        });

        // Add admin notification
        const adminUsers = await User.findAll({ where: { role: 'admin' } });
        for (const admin of adminUsers) {
            await Notification.create({
                user_id: admin.id,
                title: 'Antrian Baru',
                message: `Ada antrian baru dari ${name} dengan kendaraan ${motorBrand} ${motorType} (${plate}).`,
                type: 'new_booking'
            });
        }

        return res.status(201).json({
            code: 201,
            message: 'Booking antrian berhasil dibuat.',
            data: antrian,
        });
    } catch (error) {
        console.error('createAntrian error:', error);
        return res.status(500).json({
            code: 500,
            message: 'Internal server error',
        });
    }
};

const createAntrianOffline = async (req, res) => {
    try {
        const {
            name, phone, motorBrand, motorType, year, plate,
            services, totalPrice, bookingDate, notes,
        } = req.body;

        if (!name || !phone || !motorBrand || !motorType || !plate || !services) {
            return res.status(400).json({
                code: 400,
                message: 'Semua field wajib diisi.',
            });
        }

        if (!Array.isArray(services) || services.length === 0) {
            return res.status(400).json({
                code: 400,
                message: 'Pilih minimal satu layanan.',
            });
        }

        const dOff = new Date(new Date().getTime() + 7 * 3600 * 1000);
        const offlineDate = bookingDate || dOff.toISOString().split('T')[0];
        const maxQuotaOff = await getEffectiveQuota(offlineDate);
        const offlineCount = await Antrian.count({ where: { booking_date: offlineDate } });
        if (maxQuotaOff === 0) {
            return res.status(409).json({
                code: 409,
                message: `Bengkel tutup pada ${offlineDate}. Tidak ada antrian yang tersedia.`,
            });
        }
        if (offlineCount >= maxQuotaOff) {
            return res.status(409).json({
                code: 409,
                message: `Antrian penuh. Kapasitas pada ${offlineDate} sudah mencapai batas ${maxQuotaOff} antrian.`,
            });
        }

        const bookingId = `MG-${Date.now().toString(36).toUpperCase().slice(-5)}`;

        const antrian = await Antrian.create({
            booking_id: bookingId,
            user_id: req.user.id,
            is_offline: true,
            name,
            phone,
            motor_brand: motorBrand,
            motor_type: motorType,
            year: year || null,
            plate,
            services,
            estimated_price: totalPrice || 0,
            booking_date: bookingDate,
            notes: notes || null,
            status: 'waiting',
        });

        return res.status(201).json({
            code: 201,
            message: 'Booking antrian offline berhasil dibuat.',
            data: antrian,
        });
    } catch (error) {
        console.error('createAntrianOffline error:', error);
        return res.status(500).json({
            code: 500,
            message: 'Internal server error',
        });
    }
};

const getMyAntrian = async (req, res) => {
    try {
        const antrians = await Antrian.findAll({
            where: { user_id: req.user.id },
            order: [['createdAt', 'DESC']],
        });

        return res.status(200).json({
            code: 200,
            message: 'Data antrian berhasil diambil.',
            data: antrians,
        });
    } catch (error) {
        console.error('getMyAntrian error:', error);
        return res.status(500).json({
            code: 500,
            message: 'Internal server error',
        });
    }
};

const getTodayAntrian = async (req, res) => {
    try {
        // Gunakan waktu WIB (UTC+7) agar hari ini selalu akurat
        const d = new Date(new Date().getTime() + 7 * 3600 * 1000);
        const today = d.toISOString().split('T')[0];

        const antrians = await Antrian.findAll({
            where: {
                booking_date: today,
                status: { [Op.in]: ['waiting', 'in_progress', 'done'] },
            },
            order: [['queue_number', 'ASC']],
            attributes: ['id', 'queue_number', 'name', 'phone', 'motor_brand', 'motor_type', 'plate', 'services', 'notes', 'status', 'estimated_price', 'final_items', 'final_price', 'createdAt'],
        });

        const inProgressAntrians = antrians.filter((a) => a.status === 'in_progress');
        const currentNumbers = inProgressAntrians.map((a) => a.queue_number);

        return res.status(200).json({
            code: 200,
            message: 'Data antrian hari ini berhasil diambil.',
            data: {
                currentNumbers,
                total: antrians.length,
                antrians,
            },
        });
    } catch (error) {
        console.error('getTodayAntrian error:', error);
        return res.status(500).json({
            code: 500,
            message: 'Internal server error',
        });
    }
};


const getAvailability = async (req, res) => {
    try {
        const { date, month, year } = req.query;

        if (month && year) {
            const m = parseInt(month);
            const y = parseInt(year);
            if (isNaN(m) || isNaN(y) || m < 1 || m > 12) {
                return res.status(400).json({ code: 400, message: 'Month/year tidak valid.' });
            }

            const lastDayNum = new Date(y, m, 0).getDate();
            const startDate = `${y}-${String(m).padStart(2, '0')}-01`;
            const endDate = `${y}-${String(m).padStart(2, '0')}-${String(lastDayNum).padStart(2, '0')}`;


            const antrians = await Antrian.findAll({
                where: { booking_date: { [Op.between]: [startDate, endDate] } },
                attributes: ['booking_date'],
            });

            const bookedMap = {};
            antrians.forEach(a => {
                bookedMap[a.booking_date] = (bookedMap[a.booking_date] || 0) + 1;
            });

            const DateQuota = require('../models/dateQuota.model');
            const overrides = await DateQuota.findAll({
                where: { date: { [Op.between]: [startDate, endDate] } },
            });
            const overrideMap = {};
            overrides.forEach(o => { overrideMap[o.date] = o.max_quota; });

            const defaultQuota = parseInt(await getSettingValue('max_antrian_per_hari')) || 20;

            const result = {};
            for (let d = 1; d <= lastDayNum; d++) {
                const dateStr = `${y}-${String(m).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
                const booked = bookedMap[dateStr] || 0;
                const quota = overrideMap.hasOwnProperty(dateStr) ? overrideMap[dateStr] : defaultQuota;

                let status;
                if (quota === 0) status = 'closed';
                else if (booked >= quota) status = 'full';
                else status = 'available';

                result[dateStr] = { booked, quota, status };
            }

            return res.status(200).json({ code: 200, message: 'Ketersediaan bulan berhasil diambil.', data: result });
        }

        if (!date) {
            return res.status(400).json({ code: 400, message: 'Parameter date atau month+year wajib diisi.' });
        }

        const count = await Antrian.count({ where: { booking_date: date } });
        const maxQuota = await getEffectiveQuota(date);
        const isAvailable = maxQuota > 0 && count < maxQuota;

        return res.status(200).json({
            code: 200,
            message: 'Cek ketersediaan berhasil.',
            data: { date, booked: count, maxQuota, isAvailable },
        });
    } catch (error) {
        console.error('getAvailability error:', error);
        return res.status(500).json({ code: 500, message: 'Internal server error' });
    }
};


const getAntrianById = async (req, res) => {
    try {
        const { id } = req.params;
        const whereClause = isNaN(id) ? { booking_id: id } : { id };

        const antrian = await Antrian.findOne({
            where: whereClause,
            attributes: { exclude: ['createdAt', 'updatedAt'] },
            include: [{ model: Review }]
        });

        if (!antrian) {
            return res.status(404).json({ code: 404, message: 'Antrian tidak ditemukan.' });
        }

        if (req.user && req.user.role !== 'admin' && antrian.user_id !== req.user.id) {
            return res.status(403).json({ code: 403, message: 'Akses ditolak.' });
        }

        return res.status(200).json({
            code: 200,
            message: 'Data detail antrian berhasil diambil.',
            data: antrian,
        });
    } catch (error) {
        console.error('getAntrianById error:', error);
        return res.status(500).json({ code: 500, message: 'Internal server error' });
    }
};

const updateStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const validStatuses = ['waiting', 'in_progress', 'done', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ code: 400, message: 'Status tidak valid.' });
        }

        const antrian = await Antrian.findByPk(id);
        if (!antrian) {
            return res.status(404).json({ code: 404, message: 'Antrian tidak ditemukan.' });
        }

        antrian.status = status;
        await antrian.save();

        const statusMap = {
            'waiting': 'Menunggu',
            'in_progress': 'Sedang Dikerjakan',
            'done': 'Selesai',
            'cancelled': 'Dibatalkan'
        };

        await Notification.create({
            user_id: antrian.user_id,
            title: `Status Antrian: ${statusMap[status] || status}`,
            message: `Kendaraan ${antrian.motor_brand} ${antrian.motor_type} (${antrian.plate}) Anda sekarang berstatus ${statusMap[status] || status}.`,
            type: 'status_update'
        });

        return res.status(200).json({
            code: 200,
            message: 'Status antrian berhasil diperbarui.',
            data: antrian,
        });
    } catch (error) {
        console.error('updateStatus error:', error);
        return res.status(500).json({ code: 500, message: 'Internal server error' });
    }
};

const updateTagihan = async (req, res) => {
    try {
        const { id } = req.params;
        const { final_items, final_price } = req.body;

        const antrian = await Antrian.findByPk(id);
        if (!antrian) {
            return res.status(404).json({ code: 404, message: 'Antrian tidak ditemukan.' });
        }

        if (final_items) {
            antrian.final_items = Array.isArray(final_items) ? final_items : [final_items];
        }

        if (final_price !== undefined) {
            antrian.final_price = parseInt(final_price) || 0;
        }

        await antrian.save();

        return res.status(200).json({
            code: 200,
            message: 'Tagihan berhasil diperbarui.',
            data: antrian,
        });
    } catch (error) {
        console.error('updateTagihan error:', error);
        return res.status(500).json({ code: 500, message: 'Internal server error' });
    }
};

const getReport = async (req, res) => {
    try {
        const { filter, date } = req.query;

        let dateFilter = {};

        if (filter === 'daily') {
            const startOfDay = new Date();
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            dateFilter = { updatedAt: { [Op.between]: [startOfDay, endOfDay] } };
        } else if (filter === 'weekly') {
            const now = new Date();
            const day = now.getDay() || 7; // Convert sunday to 7
            const firstDay = new Date(now);
            firstDay.setDate(now.getDate() - day + 1);
            firstDay.setHours(0, 0, 0, 0);
            
            const lastDay = new Date(firstDay);
            lastDay.setDate(firstDay.getDate() + 6);
            lastDay.setHours(23, 59, 59, 999);
            dateFilter = { updatedAt: { [Op.between]: [firstDay, lastDay] } };
        } else if (filter === 'monthly') {
            const now = new Date();
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
            const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
            dateFilter = { updatedAt: { [Op.between]: [startOfMonth, endOfMonth] } };
        } else if (filter === 'custom' && date) {
            const customDate = new Date(date);
            const startOfDay = new Date(customDate);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(customDate);
            endOfDay.setHours(23, 59, 59, 999);
            dateFilter = { updatedAt: { [Op.between]: [startOfDay, endOfDay] } };
        }

        const history = await Antrian.findAll({
            where: {
                status: 'done',
                ...dateFilter
            },
            order: [['updatedAt', 'DESC']],
        });

        const totalRevenue = history.reduce((sum, item) => sum + (Number(item.final_price) || 0), 0);
        const totalFinished = history.length;

        const avgRevenue = totalFinished > 0 ? Math.round(totalRevenue / totalFinished) : 0;

        return res.status(200).json({
            code: 200,
            message: 'Berhasil mengambil data laporan',
            data: {
                totalRevenue,
                totalFinished,
                avgRevenue,
                history,
                filter: filter || 'all'
            }
        });

    } catch (error) {
        console.error('getReport error:', error);
        return res.status(500).json({
            code: 500,
            message: 'Internal server error',
        });
    }
};

module.exports = {
    createAntrian,
    getMyAntrian,
    getTodayAntrian,
    getAvailability,
    getAntrianById,
    updateStatus,
    updateTagihan,
    getReport,
    createAntrianOffline
};
