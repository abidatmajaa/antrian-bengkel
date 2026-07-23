const Review = require('../models/review.model');
const Antrian = require('../models/antrian.model');
const User = require('../models/user.model');

const createReview = async (req, res) => {
    try {
        const { antrian_id, rating, comment } = req.body;
        const user_id = req.user.id;

        if (!antrian_id || !rating) {
            return res.status(400).json({
                code: 400,
                message: 'Antrian ID dan rating wajib diisi.',
            });
        }

        if (rating < 1 || rating > 5) {
            return res.status(400).json({
                code: 400,
                message: 'Rating harus berada di antara 1 dan 5.',
            });
        }

        const antrian = await Antrian.findOne({
            where: { id: antrian_id, user_id }
        });

        if (!antrian) {
            return res.status(404).json({
                code: 404,
                message: 'Antrian tidak ditemukan atau bukan milik Anda.',
            });
        }

        if (antrian.status !== 'done') {
            return res.status(400).json({
                code: 400,
                message: 'Ulasan hanya dapat diberikan untuk servis yang telah selesai.',
            });
        }

        const existingReview = await Review.findOne({
            where: { antrian_id }
        });

        if (existingReview) {
            return res.status(400).json({
                code: 400,
                message: 'Anda sudah memberikan ulasan untuk servis ini.',
            });
        }

        const review = await Review.create({
            user_id,
            antrian_id,
            rating,
            comment,
        });

        return res.status(201).json({
            code: 201,
            message: 'Ulasan berhasil dikirim. Terima kasih atas masukan Anda!',
            data: review,
        });

    } catch (error) {
        console.error('createReview error:', error);
        return res.status(500).json({
            code: 500,
            message: 'Internal server error',
        });
    }
};


const getFeaturedReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            where: { rating: 5 },
            include: [
                {
                    model: User,
                    attributes: ['name'],
                },
                {
                    model: Antrian,
                    attributes: ['motor_brand', 'motor_type'],
                }
            ],
            order: [['createdAt', 'DESC']],
            limit: 10,
        });

        return res.status(200).json({
            code: 200,
            message: 'Ulasan pilihan berhasil diambil.',
            data: reviews,
        });

    } catch (error) {
        console.error('getFeaturedReviews error:', error);
        return res.status(500).json({
            code: 500,
            message: 'Internal server error',
        });
    }
};

const getAllReviews = async (req, res) => {
    try {
        const reviews = await Review.findAll({
            include: [
                {
                    model: User,
                    attributes: ['name', 'email'],
                },
                {
                    model: Antrian,
                    attributes: ['booking_id', 'motor_brand', 'motor_type', 'plate', 'services'],
                }
            ],
            order: [['createdAt', 'DESC']],
        });

        return res.status(200).json({
            code: 200,
            message: 'Semua ulasan berhasil diambil.',
            data: reviews,
        });

    } catch (error) {
        console.error('getAllReviews error:', error);
        return res.status(500).json({
            code: 500,
            message: 'Internal server error',
        });
    }
};

module.exports = {
    createReview,
    getFeaturedReviews,
    getAllReviews,
};
