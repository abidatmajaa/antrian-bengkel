const User = require('../models/user.model');
const { verifyToken } = require('../utils/jwt');

const authenticate = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization || !authorization.startsWith('Bearer ')) {
      return res.status(401).json({
        code: 401,
        message: 'Authentication diperlukan. Gunakan Bearer Token',
      });
    }

    const token = authorization.split(' ')[1];

    if (!token) {
      return res.status(401).json({
        code: 401,
        message: 'JWT Token tidak ditemukan',
      });
    }

    const payload = verifyToken(token);

    const user = await User.findByPk(payload.id);

    if (!user) {
      return res.status(401).json({
        code: 401,
        message: 'User pemilik token tidak ditemukan',
      });
    }
    req.user = user;
    req.auth = payload;

    next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        code: 401,
        message: 'JWT Token sudah kadaluarsa. Silahkan login kembali.',
      });
    }

    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        code: 401,
        message: 'JWT Token tidak valid.',
      });
    }

    console.error('Authentication error', error);

    return res.status(500).json({
      code: 500,
      message: 'Gagal memverifikasi authentication',
    });
  }
};

module.exports = authenticate;
