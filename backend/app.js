const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user.route');
const authRoutes = require('./routes/auth.routes');
const antrianRoutes = require('./routes/antrian.routes');
const notificationRoutes = require('./routes/notification.routes');
const settingRoutes = require('./routes/setting.routes');
const dateQuotaRoutes = require('./routes/dateQuota.routes');
const reviewRoutes = require('./routes/review.routes');

const app = express();
app.use(cors());

app.use(express.json());

app.get("/", (_, res) => {
    res.json({
        code: 200,
        message: "Express App Is Running!"
    })
});

const path = require('path');

app.use(authRoutes);
app.use(userRoutes);
app.use(antrianRoutes);
app.use(notificationRoutes);
app.use(settingRoutes);
app.use(dateQuotaRoutes);
app.use(reviewRoutes);

app.use(express.static(path.join(__dirname, '../dist')));

app.use((req, res, next) => {
    if (req.method === 'GET' && req.accepts('html')) {
        res.sendFile(path.join(__dirname, '../dist/index.html'));
    } else {
        next();
    }
});

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    return res.status(500).json({
        code: 500,
        message: 'Internal server error',
    });
});

module.exports = app;
