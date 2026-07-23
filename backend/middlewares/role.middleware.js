const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !req.user.role) {
      return res.status(401).json({
        code: 401,
        message: 'Akses ditolak. Informasi role tidak ditemukan.',
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        code: 403,
        message: 'Akses ditolak. Anda tidak memiliki izin untuk tindakan ini.',
      });
    }

    next();
  };
};

module.exports = authorizeRoles;
