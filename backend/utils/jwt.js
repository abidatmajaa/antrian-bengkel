const jwt = require('jsonwebtoken');

const getJWTSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT SECRET belum dikonfigurasi pada file .env');
    }
    return secret;
};

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            email: user.email,
            role: user.role
        },
        getJWTSecret(),
        {
            expiresIn: process.env.JWT_EXPIRES || '1d',
        }
    );
};

const verifyToken = (token) => {
    return jwt.verify(token, getJWTSecret());
};

module.exports = {
    getJWTSecret,
    generateToken,
    verifyToken
};